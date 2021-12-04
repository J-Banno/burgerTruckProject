const app = require("../app.js");
const request = require("supertest");

describe("Test the root path list products", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/products")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Test if this response is null", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/products")
      .then((response) => {
        expect(response).not.toBeNUll;
        done();
      });
  });
});
