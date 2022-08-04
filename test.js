const assert = require("assert");
const request = require("supertest");

const api = require("./api.js");

describe("developer API should have endpoints to", () => {
  it("get all developers", function (done) {
    request(api)
      .get("/api/developers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.length, 2);
      })
      .expect(200, done);
  });

  it("add a new developer", function (done) {
    request(api)
      .post("/api/developers/")
      .set("Accept", "application/json")
      .send({ name: "John", email: "john@salt.dev" })
      .expect("Content-Type", /json/)
      .expect("location", /\/api\/developers\//)
      .expect((res) => {
        assert.strictEqual(res.body.name, "John");
      })
      .expect(201, done);
  });

  it("delete the second developer", function (done) {
    request(api).del("/api/developers/2").expect(204, done);
  });

  it("update the first developer", function (done) {
    request(api)
      .patch("/api/developers/1")
      .set("Accept", "application/json")
      .send({ name: "Priscilla" })
      .expect(200, done)
      .expect((res) => {
        assert.strictEqual(res.body.name, "Priscilla");
      });
  });
});
