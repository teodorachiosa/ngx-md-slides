export type View = 'web' | 'slide';

export type State = {
  view?: View;
  maxWidth?: number;
  isDarkMode?: boolean;
  isFullscreen?: boolean;
  currentSlide?: number;
};
