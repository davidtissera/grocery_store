export const simulatePromiseDelay = async (
  willPromiseFail: boolean,
  delay: number
) => {
  return new Promise((resolve, reject) => {
    setTimeout(willPromiseFail ? reject : resolve, delay);
  });
};
