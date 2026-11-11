// Icons ported 1:1 from the prototype's generated SVG paths (24x24 viewBox, stroke 1.4).
import type { ReactNode } from 'react';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export type Service = {
  slug: string;
  title: string;
  sub: string;
  // One-line description, restating what the project history already says.
  body: { mn: string; en: string };
  // Projects whose text contains any of these words are listed as related work.
  keywords: string[];
  icon: ReactNode;
};

export const services: Service[] = [
  {
    slug: 'clean-water-tank',
    title: 'Цэвэр усны нөөцийн сав',
    body: {
      mn: 'Цэвэр усны нөөцийн сав нийлүүлэх, байранд нь угсрах. Солонгосын DOORI компанитай хамтран ажилладаг бөгөөд GRP савыг хавтангаар тээвэрлэж, байранд нь угсарна.',
      en: 'Supply and on-site assembly of clean water storage tanks. We work with South Korea’s DOORI; the GRP tank is shipped as panels and assembled in the building.',
    },
    keywords: ['нөөцийн сав'],
    sub: 'Гэрээт борлуулагч',
    icon: (
      Icon({ children: <>
        <path d="M12 3.5c3.2 3.6 5.5 6.4 5.5 9a5.5 5.5 0 0 1-11 0c0-2.6 2.3-5.4 5.5-9z" />
      </> })
    ),
  },
  {
    slug: 'plumbing',
    title: 'Сантехникийн угсралт',
    body: {
      mn: 'Барилгын дотор, гадна сантехникийн шугам сүлжээний угсралт.',
      en: 'Installation of interior and exterior plumbing lines and networks for buildings.',
    },
    keywords: ['сантехник'],
    sub: 'Дотор, гадна шугам сүлжээ',
    icon: (
      Icon({ children: <>
        <path d="M4 8h7a3 3 0 0 1 3 3v5" />
        <path d="M14 5h6v6h-6z" />
        <circle cx={6} cy={17} r={2.5} />
      </> })
    ),
  },
  {
    slug: 'steel-structures',
    title: 'Төмөр хийц',
    body: {
      mn: 'Төмөр хийцийн үйлдвэрлэл, угсралт: шатны бариул, аваарын шат, тагт, террас зэрэг.',
      en: 'Steel structure fabrication and installation: stair railings, emergency stairs, balconies, terraces and more.',
    },
    keywords: ['төмөр хийц'],
    sub: 'Үйлдвэрлэл, угсралт',
    icon: (
      Icon({ children: <>
        <path d="M5 4h14M5 20h14M12 4v16M8 4l8 16M16 4L8 20" />
      </> })
    ),
  },
  {
    slug: 'tanks-and-nodes',
    title: 'Нөөцийн сав, узель угсралт',
    body: {
      mn: 'Нөөцийн сав болон узелийн угсралт.',
      en: 'Installation of storage tanks and pipe junction (utility node) assemblies.',
    },
    keywords: ['нөөцийн сав', 'узель'],
    sub: 'Мэргэжлийн шийдэл',
    icon: (
      Icon({ children: <>
        <rect x={5} y={4} width={14} height={16} rx={3} />
        <path d="M5 9c3 1.6 11 1.6 14 0M5 15c3 1.6 11 1.6 14 0" />
      </> })
    ),
  },
  {
    slug: 'cooling',
    title: 'Хөргөлтийн систем',
    body: {
      mn: 'Хөргөлтийн системийн угсралт, тохируулга.',
      en: 'Installation and commissioning of cooling systems.',
    },
    keywords: ['хөргөлт'],
    sub: 'Угсралт, тохируулга',
    icon: (
      Icon({ children: <>
        <path d="M12 3v18M4 7.5l16 9M20 7.5l-16 9" />
        <path d="M9.5 4.6 12 6.8l2.5-2.2M9.5 19.4 12 17.2l2.5 2.2" />
      </> })
    ),
  },
  {
    slug: 'ventilation',
    title: 'Салхивч, агаар сэлгэлт',
    body: {
      mn: 'Халаалт, салхивч, агаар сэлгэлтийн системийн инженерийн угсралт.',
      en: 'Engineering installation of heating, ventilation and air exchange systems.',
    },
    keywords: ['салхивч', 'халаалт'],
    sub: 'Инженерийн угсралт',
    icon: (
      Icon({ children: <>
        <circle cx={12} cy={12} r={2} />
        <path d="M12 10c0-3.4-1-6-2.6-6C7.9 4 7 6.4 8.6 9c1 1.6 2.2 1 3.4 1z" />
        <path d="M13.7 13c2.9 1.7 5.6 2.2 6.4.8.8-1.4-.7-3.4-3.6-4.4-1.8-.6-2.3.7-2.8 1.7z" />
        <path d="M10.3 13c-2.9 1.7-4.4 3.7-3.6 5.1.8 1.4 3.5.9 6.4-.8 1.8-1 1-2.2.2-3z" />
      </> })
    ),
  },
  {
    slug: 'equipment',
    title: 'Тоног төхөөрөмж угсралт',
    body: {
      mn: 'Үүрэн холбооны антен, алсыг харагч зэрэг тоног төхөөрөмжийн угсралт.',
      en: 'Installation of equipment such as cellular antennas and surveillance masts.',
    },
    keywords: ['антен', 'харагч'],
    sub: 'Найдвартай гүйцэтгэл',
    icon: (
      Icon({ children: <>
        <circle cx={12} cy={12} r={3} />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
      </> })
    ),
  },
];
