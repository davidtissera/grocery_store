import ShoppingCart, { IShoppingCart } from "../ShoppingCart";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { products } from "shared/mocks";
import { getComponent } from "shared/testUtils";

describe("ShoppingCart", () => {
  const defaultProps: IShoppingCart = {
    productsToBuy: [],
    handleBuyProducts: jest.fn(),
  };
  it("should render without crashing", () => {
    const component = getComponent({ Component: ShoppingCart, defaultProps });

    expect(component).toBeDefined();
  });

  describe("When passing products", () => {
    const handleBuyProducts = jest.fn();
    const overrideProps: Partial<IShoppingCart> = {
      productsToBuy: products,
      handleBuyProducts,
    };
    it("should render corresponding amount of products inputs according prop", () => {
      getComponent({ Component: ShoppingCart, defaultProps, overrideProps });
  
      expect(screen.getByLabelText("Milk")).toBeDefined();
      expect(screen.getByLabelText("Bread")).toBeDefined();
      expect(screen.getByLabelText("Banana")).toBeDefined();
      expect(screen.getByLabelText("Apple")).toBeDefined();
    });
  
    it("should not call handleBuyProducts when clicking submit and form has empty values", async () => {
      getComponent({ Component: ShoppingCart, defaultProps, overrideProps });

      const submitButton = screen.getByRole("button", { name: "Click to Buy!" });
      await waitFor(() => {
        fireEvent.click(submitButton);
      });
      
      expect(submitButton).toBeDisabled();
      expect(handleBuyProducts).not.toHaveBeenCalled();
    });

    it("should change input values and call handleBuyProducts with corresponding values", async () => {
      getComponent({ Component: ShoppingCart, defaultProps, overrideProps });
      const milkInput = screen.getByLabelText("Milk");
      const breadInput = screen.getByLabelText("Bread");
      const submitButton = screen.getByRole("button", { name: "Click to Buy!" });

      fireEvent.change(milkInput, { target: { value: "20" }});
      fireEvent.change(breadInput, { target: { value: "10" }});
  
      await waitFor(() => {
        fireEvent.click(submitButton);
      });

      expect(handleBuyProducts).toHaveBeenCalledWith({
        "Apple": "0",
        "Banana": "0",
        "Bread": "10",
        "Milk": "20",
      });
    });
  });
});
