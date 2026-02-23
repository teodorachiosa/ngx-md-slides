export type TranslatedSlideSet = {
  title?: string;
  slides?: TranslatedSlide[];
};

export type TranslatedSlide = {
  backgroundColor?: string;
  content: string;
};
