"use strict";
//require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();

let karts = [
  {
    id: 1,
    product: "Mario",
    price: 23,
    quantity: 1,
  },
  {
    id: 2,
    product: "Peach",
    price: 33,
    quantity: 1,
  },
  {
    id: 3,
    product: "Luigi",
    price: 22,
    quantity: 1,
  },
  {
    id: 4,
    product: "Toad",
    price: 15,
    quantity: 1,
  },
  {
    id: 5,
    product: "Bowser",
    price: 50,
    quantity: 1,
  },
];

let nextKartId = 6;

routes.get("/kart-items", (req, res) => {
  let prefix = req.query.prefix;
  let maxPrice = req.query.maxPrice;
  let pageSize = req.query.pageSize;
  let filteredKarts = karts;
  if (prefix) {
    filteredKarts = filteredKarts.filter((item) => {
      return item.product
        .toString()
        .toLowerCase()
        .startsWith(prefix.toLowerCase().trim());
    });
  }
  if (maxPrice) {
    filteredKarts = filteredKarts.filter((item) => {
      return item.price <= parseInt(maxPrice);
    });
  }
  if (pageSize) {
    filteredKarts = filteredKarts.slice(0, pageSize);
  }

  res.status(200);
  res.json(filteredKarts);
});

routes.get("/kart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundKart = karts.find((item) => {
    return item.id === id;
  });
  if (foundKart) {
    res.status(200);
    res.json(foundKart);
  } else {
    res.status(404);
    res.send(`ID ${id} Not Found`);
  }
});

routes.post("/kart-items", (req, res) => {
  let kart = req.body;
  kart.id = nextKartId++;
  karts.push(kart);
  res.status(201);
  res.json(kart);
});

routes.put("/kart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updatedKart = req.body;
  updatedKart.id = id;
  let index = karts.findIndex((item) => {
    return item.id === id;
  });
  if (id != -1) {
    karts[index] = updatedKart;
    res.json(updatedKart);
  } else {
    res.status(404);
    res.send(`No kart found with id: ${id}`);
  }
});

routes.delete("/kart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = karts.findIndex((item) => {
    return item.id === id;
  });
  if (id != -1) {
    karts.splice(index, 1);
    res.status(204);
    console.log("Finished Delete");
    res.send();
  } else {
    res.status(404);
    res.send(`No movie found with id: ${id}`);
  }
});

module.exports = routes;
