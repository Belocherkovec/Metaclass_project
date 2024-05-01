export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}
