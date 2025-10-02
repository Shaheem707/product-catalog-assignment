// export type Product = {
//   _id: string;
//   title?: string;
//   price?: number;
//   image?: any;
//   slug?: { current?: string };
//   category?: string;
//   description?: string;
//   availability?: boolean;
// };

export type Product = {
  _id: string;
  title?: string;
  price?: number;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  slug?: { current?: string };
  category?: string;
  description?: string;
  availability?: boolean;
};