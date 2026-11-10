// Design tokens — light theme (white primary, navy ink text, blue accents).
// Switched from the original dark-blue prototype per explicit request: white becomes
// the primary surface, the old background blue becomes the accent/ink color instead.

export const colors = {
  bg: '#FFFFFF',

  // Text
  ink: '#0F4C81',                    // primary text (was white text on dark bg)
  inkSoft: 'rgba(15,76,129,.78)',    // secondary/body text
  inkFaint: 'rgba(15,76,129,.55)',   // tertiary text
  label: '#1F6FC4',                  // uppercase eyebrow/label text (needs more contrast than secondary on white)

  // Accent (structural — cards, icon tiles, borders, dividers; ~30% of the 60/30/10 mix)
  accent: '#2E86DE',
  accentHover: '#1F6FC4',            // darker on hover (light-surface appropriate, was lighter #4FA3F0 on dark)
  secondary: '#A9C9EC',              // decorative fills/dividers/gradient stops only — NOT for small text

  // Brand red, sampled from the logo mark — reserved for calls-to-action and the
  // diamond accent dots that echo the logo shape (~10% of the 60/30/10 mix).
  red: '#E51C24',
  redHover: '#C01420',

  white: '#fff',                     // text/icons sitting on solid accent backgrounds; chip backgrounds

  // Glass surfaces (light frosted panels)
  glassBg: 'rgba(46,134,222,.06)',
  glassBgStrong: 'rgba(46,134,222,.12)',
  glassBorder: '1px solid rgba(46,134,222,.18)',
  chipBorder: '1px solid rgba(15,76,129,.08)', // thin definition line for white chips on white bg

  // Overlays / modal
  overlayScrim: 'rgba(15,76,129,.45)',
  modalBg: 'rgba(255,255,255,.92)',
} as const;

export const radii = {
  sm: '16px',
  md: '18px',
  lg: '20px',
  xl: '22px',
  xxl: '26px',
  xxxl: '32px',
  pill: '999px',
} as const;

export const shadows = {
  card: '0 20px 45px -28px rgba(15,76,129,.28)',
  hero: '0 40px 90px -45px rgba(15,76,129,.35)',
} as const;

export const sectionPaddingX = 'clamp(20px, 5vw, 72px)';

export const contact = {
  email: 'tsuurait.nurgeen@gmail.com',
  phone1: '+976 7210 7667',
  phone1Tel: '+97672107667',
  phone2: '+976 9901 5896',
  phone2Tel: '+97699015896',
} as const;

export const partner = {
  name: 'DOORI',
  logo: '/img/doori-logo.webp',
  websiteUrl: 'http://www.multank.co.kr/en/',
  websiteLabel: 'DOORI-ийн вэб хуудас',
  websiteHint: 'multank.co.kr',
  websiteQr: '/img/qr-doori-home.webp',
  catalogUrl: 'https://www.canvaqr.com/RGHAiv2UOj',
  catalogLabel: 'Э-каталог',
  catalogHint: 'Бүтээгдэхүүний танилцуулга',
  catalogQr: '/img/qr-doori-catalog.webp',
} as const;
