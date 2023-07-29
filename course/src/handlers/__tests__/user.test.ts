import * as user from "../user";
describe("user handler", () => {
  it("should create a user", async () => {
    const req = {
      body: {
        username: "vivek",
        password: "vivek@123!",
      },
    };

    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
