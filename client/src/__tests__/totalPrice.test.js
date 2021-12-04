import { totalPrice } from "../services/utils";

const cart = [{ total: 12 }, { total: 2 }, { total: null }];
const cartNull = [];

test("total price result is not null", () => {
  const result = totalPrice(cart);
  expect(result).not.toBeNull();
});
test("total price reuslt is number", () => {
  const result = totalPrice(cart);
  expect(result).not.toBeNaN();
});
test("total price return 0 if cart is null", () => {
  const result = totalPrice(cartNull);
  expect(result).toBe(0);
});
