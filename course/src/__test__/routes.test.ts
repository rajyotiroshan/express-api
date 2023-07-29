import { request } from "http";
import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should send some data", async () => {
    const res = await supertest(app).get("/");

    expect(res.body.msg).toBe("hello");
  });
});
