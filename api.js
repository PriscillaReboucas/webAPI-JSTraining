const express = require("express");
const app = express();

let db = [
  {
    id: 1,
    name: "Marcus Dev",
    email: "marcus@salt.dev",
  },
  {
    id: 2,
    name: "Beatrice Dev",
    email: "bea@salt.dev",
  },
];

app.use(express.json());
app.use(express.static("static"));

app.get("/api/developers/", (req, res) => {
  res.json(db);
});

app.get("/api/developers/:id", (req, res) => {
  const dev = db.find((user) => user.id === req.params.id);

  return dev ? res.json(dev) : res.status(404).end();
});

app.post("/api/developers/", (req, res) => {
  const newDeveloper = {
    id: db.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  db.push(newDeveloper);

  res
    .status(201)
    .setHeader("location", `/api/developers/${newDeveloper.id}`)
    .json(newDeveloper);
});

app.delete("/api/developers/:id", (req, res) => {
  const dev = db.find((user) => user.id == req.params.id);
  if (dev === undefined) {
    res.status(404).send("Not Found");
  } else {
    db = db.filter((data) => data.id != req.params.id);
    res.status(204).send("No content");
  }
});

app.patch("/api/developers/:id", (req, res) => {
  let updateDev = db.find((user) => user.id == req.params.id);
  if (updateDev === undefined) {
    res.status(404).send("Not Found");
  } else {
    updateDev.name = req.body.name;
    updateDev.email = req.body.email;
    res.status(200).json(updateDev);
  }
});

module.exports = app;
