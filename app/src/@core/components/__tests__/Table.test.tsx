import Table, { ITable } from "@core/components/Table";
import { products as productsMock, IProduct } from "shared/mocks";
import { getComponent } from "shared/testUtils";

describe("Table", () => {
  it("should render without crashing", () => {
    const defaultProps = {
      rows: [],
      columns: []
    };
    const component = getComponent({ Component: Table, defaultProps });

    expect(component).toBeDefined();
  });

  describe("When columns || rows are empty or not defined", () => {
    it("should render empty component", () => {
      const defaultProps: ITable = {
        columns: [],
        rows: []
      };
      const component = getComponent({ Component: Table, defaultProps });

      expect(component.container).toBeEmptyDOMElement();
    });
  });

  describe("When columns & rows are not empty and have data", () => {
    const columns = [
      { name: "name", header: "Item" },
      { name: "cost", header: "Unit price" }
    ];
    const rows: IProduct[] = productsMock;
    const defaultProps = {
      rows,
      columns
    };
    it("should render all the columns headers according props", () => {
      const component = getComponent({ Component: Table, defaultProps });

      const itemHeader = component.getByRole("columnheader", { name: "Item" });
      const unitPriceHeader = component.getByRole("columnheader", {
        name: "Unit price"
      });

      expect(itemHeader).toBeInTheDocument();
      expect(unitPriceHeader).toBeInTheDocument();
    });

    it("should render all cells according props", () => {
      const component = getComponent({ Component: Table, defaultProps });
      const cells = component.getAllByRole("cell");
      const [
        milkName,
        milkCost,
        breadName,
        breadCost,
        bananaName,
        bananaCost,
        appleName,
        appleCost,
      ] = cells;

      expect(cells).toHaveLength(rows.length * columns.length);
      expect(milkName).toHaveTextContent("Milk");
      expect(milkCost).toHaveTextContent("3.97");
      expect(breadName).toHaveTextContent("Bread");
      expect(breadCost).toHaveTextContent("2.17");
      expect(bananaName).toHaveTextContent("Banana");
      expect(bananaCost).toHaveTextContent("0.99");
      expect(appleName).toHaveTextContent("Apple");
      expect(appleCost).toHaveTextContent("0.89");
    });
  });
});
