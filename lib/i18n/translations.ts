// Static UI copy only (nav, headings, labels, buttons, form text).
// Real business content — project history (lib/data/projects.ts) and news posts
// (lib/data/news.ts) — is sourced verbatim from the company and stays Mongolian-only;
// it is NOT auto-translated here to avoid inventing wording for real content.
export type Lang = 'mn' | 'en';

export const translations = {
  mn: {
    companyName: 'ЦУУРАЙТ НҮРГЭЭН ХХК',
    contactNav: 'Холбоо барих',
    heroEyebrow: '2010 оноос хойш · Барилга угсралт',
    heroTitleLine1: 'ЦУУРАЙТ',
    heroTitleLine2: 'НҮРГЭЭН',
    heroSubtitle: 'Барилгын инженерийн үйлчилгээ',
    heroTag1: 'Туршлага',
    heroTag2: 'Чанар',
    heroTag3: 'Найдвартай гүйцэтгэл',
    heroIntro:
      'Манай компани нь анх 2010 оноос төмөр хийцийн туслан гүйцэтгэх бригадаар үүсгэн байгуулагдсан ба тус оноос эхлэн барилгын дотор, гадна сантехник угсралт, төмөр хийцийн чиглэлээр үйл ажиллагаа явуулан 2018 онд албан ёсоор ЦУУРАЙТ НҮРГЭЭН ХХК болон үйл ажиллагаа явуулж байна.',
    aboutLabel: 'Бидний тухай',
    aboutFounded: 'Үүсгэн байгуулагдсан',
    aboutRegistered: 'ХХК бүртгэгдсэн',
    aboutTeam: 'Хамт олон',
    teamBarLabel: 'Хамт олон',
    aboutBannerCaption: 'Манай баг — туршлагатай инженер, мэргэжилтнүүд. Улаанбаатар хот.',

    servicesEyebrow: 'Юу хийдэг вэ',
    servicesHeading: 'Үйл ажиллагааны чиглэл',
    servicesLead: 'Барилгын инженерийн системийн угсралтыг зураг төслөөс ашиглалтад хүлээлгэн өгөх хүртэл гүйцэтгэнэ.',

    partnersEyebrow: 'Хамтын ажиллагаа',
    partnersHeading: 'Хамтрагч байгууллага',
    partnersNote: 'Цэвэр усны нөөцийн савны чиглэлээр Солонгосын DOORI компанитай хамтран ажилладаг.',
    partnersFoot: 'Утсаараа уншуулж нээнэ үү',

    certsEyebrow: 'Чанарын баталгаа',
    certsHeading: 'Гэрчилгээ, стандарт',

    timelineEyebrow: 'Хийж гүйцэтгэсэн ажлууд',
    timelineHeadingPrefix: 'Бүтээн байгуулалт',
    timelineYearSuffix: 'он',
    timelineScrollHint: 'Гүйлгэж үзэх ↓',

    worksHeading: 'Талбай дээрх ажил',
    worksSubheading: 'Сантехник · Узель · Дулааны шугам',

    newsHeading: 'Мэдээ',
    newsSubheading: 'Компанийн шинэ мэдээлэл',

    footerContactLabel: 'Холбоо барих',
    footerHeadingLine1: 'Хамтран',
    footerHeadingLine2: 'ажиллацгаая.',
    footerTeamNote: 'Инженер · Гагнуурчин · Сантехникч · 27 бүрэлдэхүүн',
    footerCta: 'Санал хүсэлт илгээх',
    footerCopyright: '© 2026 ЦУУРАЙТ НҮРГЭЭН ХХК. Зохиогчийн эрх хуулиар хамгаалагдсан.',
    footerAdmin: 'Админ',
    footerLocation: 'Улаанбаатар, Монгол улс',

    modalEyebrow: 'Хамтран ажиллах',
    modalTitle: 'Санал хүсэлт',
    modalNameLabel: 'Нэр',
    modalNamePlaceholder: 'Таны нэр',
    modalContactLabel: 'Утас эсвэл и-мэйл',
    modalContactPlaceholder: '9901 5896 / mail@gmail.com',
    modalMessageLabel: 'Санал хүсэлт',
    modalMessagePlaceholder: 'Хамтран ажиллах саналаа бичнэ үү',
    modalSent: 'Таны хүсэлт хүлээн авлаа. Бид тун удахгүй холбогдоно.',
    modalError: 'Алдаа гарлаа. Дахин оролдоно уу.',
    modalSubmit: 'Илгээх',
    modalSubmitting: 'Илгээж байна…',
  },
  en: {
    companyName: 'TSUURAIT NURGEEN LLC',
    contactNav: 'Contact Us',
    heroEyebrow: 'Since 2010 · Construction & Installation',
    heroTitleLine1: 'TSUURAIT',
    heroTitleLine2: 'NURGEEN',
    heroSubtitle: 'Building Engineering Services',
    heroTag1: 'Experience',
    heroTag2: 'Quality',
    heroTag3: 'Reliable Delivery',
    heroIntro:
      'Our company began in 2010 as a subcontracting crew for steel structure work, and since then has operated in interior and exterior plumbing and steel structure installation within construction. In 2018 we were officially registered as Tsuurait Nurgeen LLC and continue operating under that name.',
    aboutLabel: 'About Us',
    aboutFounded: 'Founded',
    aboutRegistered: 'LLC registered',
    aboutTeam: 'Team size',
    teamBarLabel: 'Our Team',
    aboutBannerCaption: 'Our team — experienced engineers and specialists. Ulaanbaatar, Mongolia.',

    servicesEyebrow: 'What We Do',
    servicesHeading: 'Areas of Work',
    servicesLead: 'We carry out building engineering system installations from design through to handover for operation.',

    partnersEyebrow: 'Partnership',
    partnersHeading: 'Partner Organization',
    partnersNote: 'We work with South Korea’s DOORI company in the field of clean water reserve tanks.',
    partnersFoot: 'Scan with your phone to open',

    certsEyebrow: 'Quality Assurance',
    certsHeading: 'Certificates & Standards',

    timelineEyebrow: 'Completed Projects',
    timelineHeadingPrefix: 'Projects Built',
    timelineYearSuffix: '',
    timelineScrollHint: 'Scroll to view ↓',

    worksHeading: 'Work on Site',
    worksSubheading: 'Plumbing · Assembly · Heating Lines',

    newsHeading: 'News',
    newsSubheading: 'Latest company updates',

    footerContactLabel: 'Contact',
    footerHeadingLine1: 'Let’s work',
    footerHeadingLine2: 'together.',
    footerTeamNote: 'Engineers · Welders · Plumbers · 27 team members',
    footerCta: 'Send an Inquiry',
    footerCopyright: '© 2026 Tsuurait Nurgeen LLC. All rights reserved.',
    footerAdmin: 'Admin',
    footerLocation: 'Ulaanbaatar, Mongolia',

    modalEyebrow: 'Let’s Collaborate',
    modalTitle: 'Inquiry',
    modalNameLabel: 'Name',
    modalNamePlaceholder: 'Your name',
    modalContactLabel: 'Phone or email',
    modalContactPlaceholder: '9901 5896 / mail@gmail.com',
    modalMessageLabel: 'Message',
    modalMessagePlaceholder: 'Tell us how we can help',
    modalSent: 'Your request has been received. We’ll be in touch shortly.',
    modalError: 'Something went wrong. Please try again.',
    modalSubmit: 'Send',
    modalSubmitting: 'Sending…',
  },
} as const;

export type TranslationKey = keyof typeof translations.mn;
