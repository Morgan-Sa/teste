import cors from "cors";
import { db } from "./db.js";
import express from "express";
import { PORT } from "./env.js";
import { BloodCenter } from "./bloodCenter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/bloodCenters", async (req, res) => {
  const centers = await BloodCenter.findAll();
  res.json(centers);
});

app.post("/bloodCenters", async (req, res) => {
  const { lat, lng } = req.body;
  if (!lat) {
    return res.status(400).send("missing lat attribute on request body");
  }
  if (!lng) {
    return res.status(400).send("missing lng attribute on request body");
  }
  let center = new BloodCenter({
    ...req.body,
    point: {
      type: "Point",
      coordinates: [lat, lng],
    },
  });

  try {
    await center.validate();
  } catch (details) {
    return res.status(400).json(details);
  }
  await center.save();
  res.status(201).json(center);
});

app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).send("internal server error");
  }
  next();
});

async function run() {
  db.authenticate();
  db.sync();
  app.listen(PORT, () => {
    console.log("server running on http://localhost:" + PORT);
  });
}
// console.log(typeof bloodCenters);

run();
