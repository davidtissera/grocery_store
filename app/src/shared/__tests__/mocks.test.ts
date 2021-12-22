import { products, productsQuantity } from "../mocks";

describe("mocks tests", () => {
  describe("products mock", () => {
    it("should match snapshot", () => {
      expect(products).toMatchSnapshot();
    });
  });

  describe("productsQuantity mock", () => {
    it("should match snapshot", () => {
      expect(productsQuantity).toMatchSnapshot();
    });
  });
});
