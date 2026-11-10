import type { Project } from '@/lib/data/projects';

export type TimelineItem = Project & {
  op: number;
  ty: string;
  iy: string;
  sc: number;
  pe: 'auto' | 'none';
};

export type Tick = { y: string; color: string };

export type NewsItem = {
  date: string;
  img: string;
  title: string;
  body: string;
};
