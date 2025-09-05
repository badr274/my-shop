export interface IInput {
  name:
    | "email"
    | "name"
    | "password"
    | "rePassword"
    | "phone"
    | "forgotEmail"
    | "resetEmail"
    | "resetPassword"
    | "currentPassword"
    | "city";
  placeholder: string;
  type: string;
  label: string;
}

export interface IProduct {
  id: string;
  _id: string;
  count?: number;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: IProduct[];
}

// ---- Cart Product Types ----
export interface ICartProduct {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface ICartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}
