export type Certificate = {
  img: string;
  title: string;
  issuer: string;
  detail: string;
};

export const certificates: Certificate[] = [
  {
    img: '/img/certs/sls-test-certificate.png',
    title: 'Туршилтын гэрчилгээ',
    issuer: 'SLS — Singapore Laboratory Services',
    detail: 'GRP усны сав, SS 245:2014, SS 375:2015(2024)+A1:2024, AS/NZS 4020:2018, BS EN-13280-2:2014',
  },
  {
    img: '/img/certs/nsf-international-certificate.png',
    title: 'NSF International тохирлын гэрчилгээ',
    issuer: 'NSF International',
    detail: 'NSF/ANSI/CAN 61, 372 стандартын шаардлагад нийцсэн',
  },
  {
    img: '/img/certs/iso-45001-certificate.png',
    title: 'ISO 45001:2018',
    issuer: 'ICR — International Certification Registrar',
    detail: 'Хөдөлмөрийн эрүүл мэнд, аюулгүй байдлын удирдлагын тогтолцоо',
  },
];
