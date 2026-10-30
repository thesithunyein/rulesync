# Security

RuleSync keeps money rules on the device and, when configured, on Walrus Mainnet. The keys that talk to Walrus and Tatum stay on the server.

## Reporting

Open a private GitHub security advisory on [thesithunyein/rulesync](https://github.com/thesithunyein/rulesync), or email the maintainer. Do not file a public issue for a live key, a working exploit, or a memory that contains someone else's spend data.

## What stays secret

| Name | Where it lives |
|---|---|
| `MEMWAL_PRIVATE_KEY` | Server environment only. This is a delegate key. It can read and write the account. |
| `TATUM_API_KEY` | Server environment only. |
| `MEMWAL_ACCOUNT_ID` | Not a secret. It is the public account object. |
| `SUI_ADDRESS` | Not a secret. It is a public address. |
| House spends | On the device under `rulesync-v2`, and on Mainnet only after a write. |

Never commit `.env`. [.gitignore](.gitignore) ignores it. [.env.example](.env.example) lists the names and nothing else.

The browser calls TanStack server functions. Those functions read the environment on the server and return balances, memory text, and status. They do not return the keys.

## Out of scope

- Spends you typed into your own browser. That data is yours.
- The public Walrus account id and the public Sui address.
- A missing key. The app then keeps memory on the device and hides the Mainnet controls.

## Practice

Rotate the delegate key at [memory.walrus.xyz](https://memory.walrus.xyz) if it has been pasted into a chat, a screenshot, or a commit. A rotated key stops future writes. Memories already stored stay on the account until the owner removes them.
