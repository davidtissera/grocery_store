import GroceryPricesTable from "@core/components/GroceryPricesTable";
import { useState } from "react";
import { IProduct, IProductQuantity, products } from "shared/mocks";
import { simulatePromiseDelay } from "shared/utils";
import ShoppingList from "./components/ShoppingList";
import ShoppingCart from "./components/ShoppingCart";

export default function BuyerPage() {
  const [productsQuantity, setProductsQuantity] = useState<IProductQuantity[]>([]);

  const handleBuyProducts = async (formValues: Record<IProduct["name"], number>) => {
    await simulatePromiseDelay(false, 2000);
    const transformProductQuantity = (product: IProduct) => ({
      ...product,
      quantity: formValues[product.name],
    });

    setProductsQuantity(products.map(transformProductQuantity));
  };

  return (
    <>
      <GroceryPricesTable products={products} />
      <ShoppingCart productsToBuy={products} handleBuyProducts={handleBuyProducts} />
      <ShoppingList products={productsQuantity} />
    </>
  );
}
