import prisma from "../modules/db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);

    res.json({ token });
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
};

export const signin = async (req, res) => {
  //find the user with username
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ msg: "Unauthorized" });
    return;
  }

  const token = createJWT(user);
  res.cookie("auth-", token, {
    maxAge: 3600000,
  });
  res.json({ token });
};
