import GroceryPricesTable from "@core/components/GroceryPricesTable";
import { products } from "shared/mocks";

export default function BuyerPage() {
  return (
    <>
      <GroceryPricesTable products={products} />
    </>
  );
}
