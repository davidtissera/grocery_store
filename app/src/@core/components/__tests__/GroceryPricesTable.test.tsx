import { screen } from "@testing-library/dom";
import GroceryPricesTable, { IGroceryPricesTable } from "../GroceryPricesTable";
import { products } from "shared/mocks";
import { getComponent } from "shared/testUtils";

describe("GroceryPricesTable", () => {
  const defaultProps: IGroceryPricesTable = {
    products: [],
  };
  it("should render without crashing", () => {
    const { container } = getComponent({ Component: GroceryPricesTable, defaultProps });

    expect(container).toBeDefined();
  });

  it("should render heading title", () => {
    getComponent({ Component: GroceryPricesTable, defaultProps });

    const heading = screen.getByRole("heading", { name: "Local Grocery Store Pricing Table" });

    expect(heading).toBeInTheDocument();
  });

  describe("When products are provided", () => {
    it("should render sale price cells according 'products' prop", () => {
      const overrideProps: IGroceryPricesTable = {
        products,
      };
      getComponent({ Component: GroceryPricesTable, defaultProps, overrideProps });
      const milkSalePriceCell = screen.getByRole("cell", { name: "2 for $5.00" });
      const breadSalePriceCell = screen.getByRole("cell", { name: "3 for $6.00" });
  
      expect(milkSalePriceCell).toBeInTheDocument();
      expect(breadSalePriceCell).toBeInTheDocument();
    });
  });
});
