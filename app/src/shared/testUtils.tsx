import { render, RenderResult } from "@testing-library/react";

export interface IGetComponent {
  Component: any,
  defaultProps: Record<string, any>,
  overrideProps?: Record<string, any>,
};

export const getComponent: ({
  Component,
  defaultProps,
  overrideProps,
}: IGetComponent) => RenderResult = ({
  Component,
  defaultProps,
  overrideProps,
}) => {
  return render(<Component {...defaultProps} {...overrideProps} />)
};
