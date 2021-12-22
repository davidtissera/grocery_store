// Define mocks here
export type IProduct = {
  name: "Milk" | "Bread" | "Banana" | "Apple";
  cost: number;
  amount_of_products_with_discount?: number;
  discount_cost?: number;
};

export const products: IProduct[] = [
  {
    name: "Milk",
    cost: 3.97,
    discount_cost: 2.5,
    amount_of_products_with_discount: 2
  },
  {
    name: "Bread",
    cost: 2.17,
    discount_cost: 2.0,
    amount_of_products_with_discount: 3
  },
  { name: "Banana", cost: 0.99 },
  { name: "Apple", cost: 0.89 }
];

export type IProductQuantity = IProduct & {
  quantity: number;
};

export const productsQuantity: IProductQuantity[] = [
  {
    ...products[0],
    quantity: 3,
  },
  {
    ...products[1],
    quantity: 4,
  },
  {
    ...products[2],
    quantity: 1,
  },
  {
    ...products[3],
    quantity: 1,
  },
];
