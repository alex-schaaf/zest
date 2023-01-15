import userService from "./UserService";

test("userService.find() does not return passwordHash", async () => {
  const user = await userService.find({ id: 4 });
  expect(user.passwordHash).toBeUndefined();
});
