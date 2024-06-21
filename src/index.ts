import { PrismaClient } from "@prisma/client";
import express from "express";

// configure environment variable
// require("dotenv").config();

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", (req, res) => {
  res.json({
    message: "Healthy server",
  });
});

app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);

  const user = await client.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(user);
});

app.post("/", async (req, res) => {
  await client.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: "Done signing up!",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
