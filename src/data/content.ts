// Non-translatable structural / asset data only.
// All visible strings live in src/locales/*.json (see I18nProvider).

export const stepAssets = [
  // Keep the approved first image; replace steps 02–04 with the supplied assets.
  { n: '01', image: '/assets/friesCTA.png' },
  { n: '02', image: '/assets/how-step-02.webp' },
  { n: '03', image: '/assets/how-step-03.webp' },
  { n: '04', image: '/assets/how-step-04.webp' },
];

export const menuAssets = [
  { image: '/assets/how-step-03.webp', price: '99 ر.س' },
  { image: '/assets/how-step-02.webp', price: '168 ر.س' },
  { image: '/assets/fries-process-bg.png', price: '230 ر.س' },
  { image: '/assets/how-step-04.webp', price: '99 ر.س' },
];


export const makersAssets = {
  badge: '+10K',
  image: '/assets/fries-section-bg.png',
};
