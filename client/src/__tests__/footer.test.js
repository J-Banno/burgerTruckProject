import Footer from "../components/Layout/Footer/footer";
import { render } from "@testing-library/react";
import React from "react";

test("mon footer ", function () {
  render(<Footer></Footer>);
  const demo = document.querySelector(".footerContainer");
  expect(demo).not.toBeNull();
});

test("titre undefined ", function () {
  render(<Footer></Footer>);
  const demo = document.querySelector(".titleFooter").textContent;
  expect(demo).not.toBe("", null, undefined);
});

test("titre exact", function () {
  render(<Footer></Footer>);
  const demo = document.querySelector(".titleFooter").textContent;
  expect(demo).toBe("NOUS SUIVRE");
});
