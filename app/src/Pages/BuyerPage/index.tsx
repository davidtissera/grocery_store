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
    const hasProductQuantityPredicate = (product: IProductQuantity) => product.quantity > 0;

    const productsWithQuantity = products
      .map(transformProductQuantity)
      .filter(hasProductQuantityPredicate);

    setProductsQuantity(productsWithQuantity);
  };

  return (
    <div className="container-md mt-5">
      <div className="container-md">
        <h2 className="mb-4">Current prices of Grocery Store</h2>
        <GroceryPricesTable products={products} />
      </div>
      <div className="container-md mt-5">
        <h5 className="mb-4" style={{ textAlign: "center" }}>Add your favourite products</h5>
        <ShoppingCart productsToBuy={products} handleBuyProducts={handleBuyProducts} />
      </div>
      {productsQuantity.length > 0 && (
        <div className="container-sm mt-5 mb-5">
          <h3 className="mb-4">Your shopping list</h3>
          <ShoppingList products={productsQuantity} />
        </div>
      )}
    </div>
  );
}
