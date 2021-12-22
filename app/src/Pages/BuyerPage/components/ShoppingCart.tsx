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
      <div className="container">
        <div className="row justify-content-md-center">
          {productsToBuy.map((product) => {
            return (
              <div key={product.name} className="col col-lg-2 mb-3">
                <label className="form-label" htmlFor={product.name}>{product.name}</label>
                <input
                  className="form-control"
                  id={product.name}
                  name={product.name}
                  defaultValue={0}
                  type="number"
                  min={0}
                />
              </div>
            );
          })}
          <div
            className="col col-lg-2 mt-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              role="button"
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {isSubmitting ? <div className="spinner-border spinner-border-sm text-light" role="status" /> : "Buy"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
