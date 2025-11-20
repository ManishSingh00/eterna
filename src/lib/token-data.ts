import dataset from "@/data/tokens.json";
import type { Token } from "./types";

const tokens = dataset as Token[];

export const getTokens = () => Promise.resolve(tokens);

export const getTokenById = (id: string) =>
  Promise.resolve(tokens.find((token) => token.id === id));
