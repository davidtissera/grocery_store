import React, { useState } from "react";
import { IProduct } from "shared/mocks";

export interface IShoppingCart {
  productsToBuy: IProduct[];
  handleBuyProducts: (formValues: Record<IProduct["name"], number>) => void;
}

export default function ShoppingCart(props: IShoppingCart) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { productsToBuy, handleBuyProducts } = props;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    setSubmitting(true);
    const elements = ((event as unknown) as any).target.elements;
    event.preventDefault();

    const formValues: Record<IProduct["name"], number> =
      Object.assign({}, ...productsToBuy.map((product) => ({
        [product.name]: +elements[product.name].value
      })));

    try {
      await handleBuyProducts(formValues);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <form name="shopping-cart-form" onSubmit={handleSubmit}>
      {productsToBuy.map((product) => {
        return (
          <div key={product.name}>
            <div style={{ margin: "5px 0" }}>
              <label htmlFor={product.name}>{product.name}</label>
            </div>
            <div>
              <input
                id={product.name}
                name={product.name}
                defaultValue={0}
                type="number"
                min={0}
              />
            </div>
          </div>
        );
      })}
      <button role="button" type="submit" style={{ margin: "10px 0px" }}>
        {isSubmitting ? "Your order is being processed..." : "Buy"}
      </button>
    </form>
  );
}
