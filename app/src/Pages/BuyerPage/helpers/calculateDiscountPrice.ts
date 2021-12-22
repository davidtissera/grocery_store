import { IProductQuantity } from "shared/mocks";

export default function calculateDiscountPrice(product: IProductQuantity) {
  if (!product.amount_of_products_with_discount || !product.discount_cost) {
    const price = product.cost * product.quantity;

    return price;
  }

  const discountProportion = product.quantity / product.amount_of_products_with_discount;

  if (discountProportion % 1 !== 0) {
    const discountPrice = (product.quantity - 1) * product?.discount_cost;

    return discountPrice + product.cost;
  }

  return product.quantity * product?.discount_cost;
}
