import Table from "@core/components/Table";
import { IProductQuantity } from "shared/mocks";
import {
  calculateDiscountPrice,
} from "../helpers";

export interface IShoppingList {
  products: IProductQuantity[];
}

export default function ShoppingList(props: IShoppingList) {
  const { products } = props;

  if (products.length <= 0) {
    return null;
  }

  const columns = [
    { name: "name", header: "Item" },
    { name: "quantity", header: "Quantity" },
    {
      name: "price",
      header: "Price",
      Cell: (cellValue: number) => <>{`$${cellValue.toFixed(2)}`}</>
    }
  ];

  const rows = products.map((product) => ({
    ...product,
    price: calculateDiscountPrice(product)
  }));

  const totalWithoutDiscount = rows.reduce((prev: number, acum) => prev + acum.cost * acum.quantity, 0);
  const totalWithDiscount = rows.reduce((prev, acum) => prev + acum.price, 0);
  const savedPrice = totalWithoutDiscount - totalWithDiscount;

  return (
    <div>
      <Table columns={columns} rows={rows} />
      <div className="mt-2">{`Total price: $${totalWithDiscount.toFixed(2)}`}</div>
      {savedPrice > 0 && <div className="mt-2"><b>{`You saved $${savedPrice.toFixed(2)} today.`}</b></div>}
    </div>
  );
}
