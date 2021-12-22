import Table from "@core/components/Table";
import { IProduct } from "shared/mocks";

export interface IGroceryPricesTable {
  products: IProduct[];
}

export default function GroceryPricesTable(props: IGroceryPricesTable) {
  const { products } = props;

  const columns = [
    { name: "name", header: "Item" },
    { name: "cost", header: "Unit price" },
    { name: "sale_price", header: "Sale price" }
  ];

  const transformSalePriceProduct = (product: IProduct) => {
    const {
      amount_of_products_with_discount: amount,
      discount_cost: discount,
    } = product;

    if (!discount || !amount) {
      return product;
    }

    return {
      ...product,
      sale_price: `${amount} for $${(discount * amount).toFixed(2)}`
    };
  };

  const rows = products.map(transformSalePriceProduct);

  return (
    <>
      <h1>Local Grocery Store Pricing Table</h1>
      <Table columns={columns} rows={rows} />
    </>
  );
}
