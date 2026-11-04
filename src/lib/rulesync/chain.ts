import { createServerFn } from "@tanstack/react-start";

export type ChainStatus = {
  walrus: boolean;
  tatum: boolean;
  accountId: string | null;
  memories: number;
  suiAddress: string | null;
};

export type SuiTransfer = { digest: string; at: string; amount: number };

const HOUSE_ID = /^[a-z0-9]{10}$/;

function houseOnly(input?: { houseId?: string | null } | null): { houseId: string | null } {
  const houseId = input?.houseId ?? null;
  if (houseId !== null && !HOUSE_ID.test(houseId)) throw new Error("That is not a house id");
  return { houseId };
}

export const getChainStatus = createServerFn({ method: "POST" })
  .inputValidator(houseOnly)
  .handler(async ({ data }): Promise<ChainStatus> => {
    const { chainStatus } = await import("./chain.server");
    return chainStatus(data.houseId);
  });

export const rememberLines = createServerFn({ method: "POST" })
  .inputValidator((input: { texts: string[]; houseId?: string | null }) => {
    if (!input || !Array.isArray(input.texts) || input.texts.length === 0 || input.texts.length > 20) {
      throw new Error("Send 1 to 20 memories");
    }
    if (
      input.texts.some(
        (t) => typeof t !== "string" || t.length === 0 || t.length > 2000 || !t.startsWith("RuleSync "),
      )
    ) {
      throw new Error("Only RuleSync records can be written");
    }
    const houseId = input.houseId ?? null;
    if (houseId !== null && !HOUSE_ID.test(houseId)) throw new Error("That is not a house id");
    return { texts: input.texts, houseId };
  })
  .handler(async ({ data }) => {
    const { rememberLines: write } = await import("./chain.server");
    return write(data.texts, data.houseId);
  });

export const recallHouse = createServerFn({ method: "POST" })
  .inputValidator(houseOnly)
  .handler(async ({ data }) => {
    const { recallLines } = await import("./chain.server");
    return recallLines(data.houseId);
  });

export const listMemories = createServerFn({ method: "POST" })
  .inputValidator(houseOnly)
  .handler(async ({ data }) => {
    const { listMemories: list } = await import("./chain.server");
    return list(data.houseId);
  });

export const readSui = createServerFn({ method: "POST" })
  .inputValidator((input: { address: string }) => {
    const address = input?.address?.trim() ?? "";
    if (!/^0x[a-fA-F0-9]{64}$/.test(address)) throw new Error("That is not a Sui address");
    return { address };
  })
  .handler(async ({ data }) => {
    const { readSuiAddress } = await import("./chain.server");
    return readSuiAddress(data.address);
  });
