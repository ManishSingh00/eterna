#!/usr/bin/env node
/**
 * Mock WebSocket broadcaster for price updates.
 */
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const WebSocket = require("ws");

const PORT = Number(process.env.WS_PORT ?? 4000);
const dataset = JSON.parse(
  readFileSync(resolve(__dirname, "../src/data/tokens.json"), "utf-8"),
);

const server = new WebSocket.Server({ port: PORT }, () => {
  console.log(`[mock-ws] Listening on ws://localhost:${PORT}`);
});

const pickToken = () => dataset[Math.floor(Math.random() * dataset.length)];

const broadcast = (payload) => {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
};

const tick = () => {
  const token = pickToken();
  const drift = (Math.random() - 0.5) * 0.04 * token.price;
  const nextPrice = Math.max(0.0001, token.price + drift);
  const payload = {
    type: "price_update",
    symbol: token.pair,
    price: Number(nextPrice.toFixed(4)),
    delta: Number(((nextPrice - token.price) / token.price) * 100),
    ts: Date.now(),
  };
  token.price = payload.price;
  broadcast(payload);

  const delay = 250 + Math.random() * 1750;
  setTimeout(tick, delay);
};

tick();

server.on("connection", () => {
  console.log("[mock-ws] Client connected");
});

server.on("close", () => {
  console.log("[mock-ws] shutdown");
});
