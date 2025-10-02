export type Product = {
  _id: string;
  title?: string;
  price?: number;
  image?: any;
  slug?: { current?: string };
  category?: string;
  description?: string;
  availability?: boolean;
};