import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IProduct } from "shared/mocks";

export interface IShoppingCart {
  productsToBuy: IProduct[];
  handleBuyProducts: (formValues: Record<IProduct["name"], number>) => void;
}

export default function ShoppingCart(props: IShoppingCart) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { productsToBuy, handleBuyProducts } = props;

  const form = useForm({
    mode: "onChange",
  });
  const watcher = useWatch({
    control: form.control,
  });
  const formHasEmptyValues = Object.values(watcher).every((inputValue) => inputValue == 0);

  const handleSubmit = async (formValues: Record<IProduct["name"], number>) => {
    setSubmitting(true);
    try {
      await handleBuyProducts(formValues);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };


  return (
    <form name="shopping-cart-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="container">
        <div className="row justify-content-md-center">
          {productsToBuy.map((product) => {
            return (
              <div key={product.name} className="col col-lg-2 mb-3">
                <label className="form-label" htmlFor={product.name}>{product.name}</label>
                <input
                  {...form.register(product.name)}
                  className="form-control"
                  id={product.name}
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
              disabled={formHasEmptyValues}
              className="btn btn-primary"
              style={{ width: "200px" }}
            >
              {isSubmitting ? <div className="spinner-border spinner-border-sm text-light" role="status" /> : "Click to Buy!"}
            </button>
          </div>
        </div>
        {formHasEmptyValues && (
          <div className="alert alert-primary" role="alert">
            You must pick at least one item
          </div>
        )}
      </div>
    </form>
  );
}
