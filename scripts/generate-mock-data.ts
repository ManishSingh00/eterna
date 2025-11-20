/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import seedrandom from "seedrandom";
import type { Token, TokenCategory } from "@/lib/types";

const rng = seedrandom("axiom-pulse-seed");

const CHAINS = ["Ethereum", "Base", "Solana", "Arbitrum", "Polygon"];
const SYMBOL_BANK = [
  "AXM",
  "DRM",
  "QNT",
  "ORC",
  "VLT",
  "SYN",
  "CRW",
  "NXT",
  "PRL",
  "ARC",
  "LUM",
  "BLD",
  "VXR",
  "FLX",
  "ELM",
  "KAI",
  "ZYN",
  "MIR",
  "HLD",
  "GEM",
  "XPO",
  "RSE",
  "GRD",
  "PLS",
  "RPL",
  "NVM",
  "GLX",
  "FYN",
  "NVX",
  "HZN",
];

const CATEGORIES: TokenCategory[] = ["new_pairs", "final_stretch", "migrated"];

const randomBetween = (min: number, max: number) =>
  Math.round((rng() * (max - min) + min) * 10000) / 10000;

const pick =
  <T>(items: T[]) =>
  () =>
    items[Math.floor(rng() * items.length)];

const pickChain = pick(CHAINS);
const pickCategory = pick(CATEGORIES);

const buildHistory = (anchor: number) => {
  const points = 36;
  const history: number[] = [];
  let current = anchor * randomBetween(0.92, 1.08);

  for (let i = 0; i < points; i += 1) {
    const delta = randomBetween(-0.04, 0.04) * current;
    current = Math.max(0.0001, current + delta);
    history.push(Number(current.toFixed(4)));
  }

  return history;
};

const buildToken = (index: number): Token => {
  const symbol = SYMBOL_BANK[index % SYMBOL_BANK.length] + (index + 1);
  const price = randomBetween(0.02, 1500);
  const change = randomBetween(-25, 42);
  const liquidity = randomBetween(50_000, 25_000_000);
  const ageDays = Math.max(1, Math.floor(randomBetween(1, 180)));
  const category = pickCategory();
  const indicators = {
    trending: rng() > 0.55,
    hot: rng() > 0.7,
    risk: rng() > 0.7 ? "high" : rng() > 0.4 ? "medium" : "low",
  } as Token["indicators"];

  return {
    id: `token-${index}`,
    name: `Axiom ${symbol}`,
    symbol,
    pair: `${symbol}/USDT`,
    price,
    priceChange24h: change,
    liquidityUSD: liquidity,
    ageDays,
    category,
    logoUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${symbol}`,
    chain: pickChain(),
    indicators,
    history: buildHistory(price),
  };
};

const createDataset = (count = 72) =>
  Array.from({ length: count }, (_, index) => buildToken(index));

const writeDataset = (tokens: Token[]) => {
  const outPath = path.join(process.cwd(), "src", "data", "tokens.json");
  fs.writeFileSync(outPath, JSON.stringify(tokens, null, 2));
  console.log(`Mock dataset updated: ${tokens.length} tokens -> ${outPath}`);
};

writeDataset(createDataset(72));
