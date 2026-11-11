import type { Metadata } from 'next';
import ServicesPageView from '@/components/site/ServicesPageView';

export const metadata: Metadata = {
  title: 'Үйл ажиллагааны чиглэл — ЦУУРАЙТ НҮРГЭЭН ХХК',
  description:
    'Барилгын инженерийн системийн угсралтыг зураг төслөөс ашиглалтад хүлээлгэн өгөх хүртэл гүйцэтгэнэ: сантехник, төмөр хийц, нөөцийн сав, хөргөлт, салхивч.',
};

export default function ServicesPage() {
  return <ServicesPageView />;
}
