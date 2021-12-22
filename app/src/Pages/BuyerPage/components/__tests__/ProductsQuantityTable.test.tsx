import { screen } from "@testing-library/dom";
import { getComponent } from "shared/testUtils";
import { productsQuantity } from "shared/mocks";
import ProductsQuantityTable, { IProductsQuantityTable } from "../ProductsQuantityTable";

describe("ProductsQuantityTable", () => {
  const defaultProps: IProductsQuantityTable = {
    products: [],
  };

  it("should render without crashing", () => {
    getComponent({ Component: ProductsQuantityTable, defaultProps });
  });

  describe("When passing products with quantity", () => {
    const overrideProps: IProductsQuantityTable = {
      products: productsQuantity,
    };

    it("should show all column headers", () => {
      getComponent({ Component: ProductsQuantityTable, defaultProps, overrideProps });
      const [itemColumn, quantityColumn, priceColumn] = screen.getAllByRole("columnheader");

      expect(itemColumn).toHaveTextContent("Item");
      expect(quantityColumn).toHaveTextContent("Quantity");
      expect(priceColumn).toHaveTextContent("Price");
    });

    it("should have price cells with corresponding format", () => {
      getComponent({ Component: ProductsQuantityTable, defaultProps, overrideProps });
      const milkSalePriceCell = screen.getByRole("cell", { name: "$8.97" });
      const breadPriceCell = screen.getByRole("cell", { name: "$8.17" });
      const applePriceCell = screen.getByRole("cell", { name: "$0.89" });
      const bananaPriceCell = screen.getByRole("cell", { name: "$0.99" });

      expect(milkSalePriceCell).toBeDefined();
      expect(breadPriceCell).toBeDefined();
      expect(applePriceCell).toBeDefined();
      expect(bananaPriceCell).toBeDefined();
    });

    it("should show total price and saved money with corresponding amount", () => {
      const { container } = getComponent({ Component: ProductsQuantityTable, defaultProps, overrideProps });

      expect(container).toHaveTextContent("Total price: $19.02");
      expect(container).toHaveTextContent("You saved $3.45 today.");
    });
  });
});
