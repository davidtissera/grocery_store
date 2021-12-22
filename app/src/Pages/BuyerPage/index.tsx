import GroceryPricesTable from "@core/components/GroceryPricesTable";
import { useState } from "react";
import { IProduct, products } from "shared/mocks";
import { simulatePromiseDelay } from "shared/utils";
import ShoppingCart from "./components/ShoppingCart";

export default function BuyerPage() {
  const [productsQuantity, setProductsQuantity] = useState<IProduct[]>([]);

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
    </>
  );
}
