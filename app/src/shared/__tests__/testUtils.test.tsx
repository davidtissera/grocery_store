import { getComponent } from "../testUtils";

describe("testUtils tests", () => {
  describe("getComponent tests", () => {
    it("should pass", () => {
      const Component = () => <div />
      const component = getComponent({ Component, defaultProps: {} });
  
      expect(component.container).toBeDefined();
    });
  })
});
