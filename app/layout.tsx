import type { Metadata } from "next";
import "./globals.css";

const title = "ЦУУРАЙТ НҮРГЭЭН ХХК — Барилгын инженерийн үйлчилгээ";
const description =
  "Цуурайт Нүргээн ХХК — 2010 оноос хойш барилгын дотор, гадна сантехник угсралт, төмөр хийц, нөөцийн сав, хөргөлт, салхивчийн системийн угсралт гүйцэтгэж байна.";
const siteUrl = "https://tsuurait-nurgeen.vercel.app";
const ogImage = `${siteUrl}/img/about-team.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "сантехникийн угсралт",
    "төмөр хийц",
    "барилгын инженерийн үйлчилгээ",
    "нөөцийн сав",
    "узель угсралт",
    "Цуурайт Нүргээн",
  ],
  openGraph: {
    title,
    description: "Туршлага • Чанар • Найдвартай гүйцэтгэл. 2010 оноос хойш 21 бүтээн байгуулалт.",
    siteName: "ЦУУРАЙТ НҮРГЭЭН ХХК",
    locale: "mn_MN",
    type: "website",
    url: siteUrl,
    images: [{ url: ogImage, width: 1584, height: 672, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Туршлага • Чанар • Найдвартай гүйцэтгэл. 2010 оноос хойш 21 бүтээн байгуулалт.",
    images: [ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
