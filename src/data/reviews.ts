export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  verified: boolean;
  avatar?: string;
};

export const reviews: Review[] = [
  {
    id: 'abu-saleh',
    name: 'ابو صالح القحطاني',
    text: 'حجمه صغير مره، داخل الجيب وما يبين أبداً. الشحن سريع ويقضي الغرض يوم كامل.',
    rating: 5,
    verified: true,
    avatar: undefined,
  },
  {
    id: 'hamad',
    name: 'حمد',
    text: 'استخدمته مع الجوال ومع يد البلايستيشن، ما فيه أي إعاقة ولا فوضى أسلاك. ممتاز',
    rating: 4,
    verified: true,
    avatar: undefined,
  },
  {
    id: 'reem',
    name: 'ريم العتيبي',
    text: 'كنت متردده بسبب الحجم، لكن صراحة فاجأني. عملي جداً في الطلعات',
    rating: 5,
    verified: true,
    avatar: undefined,
  },
  {
    id: 'mohammed',
    name: 'محمد السهلي',
    text: 'عملي جداً وحجمه ممتاز، يشحن بسرعة ويدخل الجيب بسهولة. كنت أتمنى السعة تكون أكبر شوي. غير كذا ممتاز للاستخدام اليومي',
    rating: 4,
    verified: true,
    avatar: undefined,
  },
  {
    id: 'rakan',
    name: 'راكان',
    text: 'المنتج عملي كنت اتمنى لو فيه منه اللون الأسود',
    rating: 4,
    verified: true,
    avatar: undefined,
  },
];