export type Locale = "en" | "ar";

export interface NavItem {
  key: string;
  href: string;
}

export interface IconCard {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface ImageCard {
  image: string;
  alt: string;
  titleKey: string;
  descriptionKey: string;
  icon?: string;
}

export interface FaqItem {
  questionKey: string;
  answerKey: string;
}

export interface TestimonialItem {
  initials: string;
  nameKey: string;
  quoteKey: string;
}

export interface ArticleItem {
  id: number | "featured";
  image: string;
  categoryKey: string;
  titleKey: string;
  excerptKey: string;
  dateKey: string;
  readTimeKey: string;
}

export interface VideoItem {
  image: string;
  titleKey: string;
  descriptionKey: string;
  duration: string;
}

export interface CertificateItem {
  image: string;
  alt: string;
  titleKey: string;
  subtitleKey: string;
  metaKey: string;
}

export interface TimelineItem {
  yearKey: string;
  titleKey: string;
  descriptionKey: string;
  current?: boolean;
}
