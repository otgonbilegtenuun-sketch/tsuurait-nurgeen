import { getSupabaseAdmin } from '@/lib/supabase/server';

const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const contact = typeof body?.contact === 'string' ? body.contact.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !contact || !message) {
      return Response.json({ error: 'Бүх талбарыг бөглөнө үү.' }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: 'Зурвас хэт урт байна.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      // Expected in early dev: env vars not configured yet. Don't break the public form.
      console.warn('[contact] Supabase not configured, message not persisted:', { name, contact });
      return Response.json({ ok: true });
    }

    const { error } = await supabase
      .from('messages')
      .insert({ name, contact, message, read: false });

    if (error) {
      console.error('[contact] Supabase insert failed:', error.message);
      return Response.json({ error: 'Алдаа гарлаа.' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return Response.json({ error: 'Алдаа гарлаа.' }, { status: 500 });
  }
}
