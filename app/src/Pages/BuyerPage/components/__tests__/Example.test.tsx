import { getComponent } from "shared/testUtils";
import Example, { IExample } from "../Example";

describe("Example", () => {
  const defaultProps: IExample = {
    name: "Mock name",
  };

  it("should render", () => {
    const component = getComponent({ Component: Example, defaultProps })

    expect(component).toBeDefined();
  });
});
