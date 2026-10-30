import { createServerFn } from "@tanstack/react-start";

export type ChainStatus = {
  walrus: boolean;
  tatum: boolean;
  accountId: string | null;
  memories: number;
};

export type SuiTransfer = { digest: string; at: string; amount: number };

export const getChainStatus = createServerFn({ method: "POST" }).handler(async (): Promise<ChainStatus> => {
  const { chainStatus } = await import("./chain.server");
  return chainStatus();
});

export const rememberLines = createServerFn({ method: "POST" })
  .inputValidator((input: { texts: string[] }) => {
    if (!input || !Array.isArray(input.texts) || input.texts.length === 0 || input.texts.length > 20) {
      throw new Error("Send 1 to 20 memories");
    }
    if (input.texts.some((t) => typeof t !== "string" || t.length === 0 || t.length > 2000)) {
      throw new Error("Memory text is too long");
    }
    return { texts: input.texts };
  })
  .handler(async ({ data }) => {
    const { rememberLines: write } = await import("./chain.server");
    return write(data.texts);
  });

export const recallHouse = createServerFn({ method: "POST" }).handler(async () => {
  const { recallLines } = await import("./chain.server");
  return recallLines();
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
