import { products } from "../mocks";

describe("mocks tests", () => {
  describe("products mock", () => {
    it("should match snapshot", () => {
      expect(products).toMatchSnapshot();
    });
  });
});
