<div align="center">

# On 글 다듬기 (on-tidy)

A remote MCP server that rewrites Korean prose in official bullet style (gaejo), fixes near-certain spelling and spacing errors, and replaces hard words with plain ones

[한국어](README.md) · **English**

`https://onmunseo.kr/mcp/tidy`

</div>

Rewrites prose paragraphs in the □ ○ - bullet style of Korean official documents (“~함/~임” endings, one idea per line) (`on_gaejo`), fixes only spelling and spacing errors that are almost certainly wrong (`on_spell`), and replaces translationese, double passives, redundant phrases and hard Sino-Korean words with plain ones (`on_plain`). All rule-based (no AI); after each change, numbers and names are compared with the original, and a sentence that does not match is left as it was.

This repository holds only the setup guide and configuration files (including one small plugin launcher) (there is no web page here — to use a screen, open the [On 문서 web editor](https://onmunseo.kr/app/)). The engine and server code of the service are not public. The service and its tools speak Korean.

- **Rules, not AI:** with no language model involved, the same text always gives the same result; after each change, numbers, names and quoted words are recounted sentence by sentence, and a sentence that does not match is left as it was. Nothing is made up.
- **Where documents go:** documents sent to this address are processed only in memory on the On 문서 server (a data centre in Korea) and discarded afterwards; they are not sent to any outside AI company. Send only public documents or your own to this server-side address; handle internal documents of your organisation with the browser-only features of the [web editor](https://onmunseo.kr/app/) (open, edit and save HWP/HWPX, the pre-approval check, masking personal data) — attachment text extraction, OCR and HWPX creation in the web editor still go through the server.

**Jump to:** [Why](#in-short--why-use-it) · [Install](#installation-guide-for-people-and-ai-assistants) · [Measured results](#measured-results) · [Tools](#what-it-does) · [Connect](#connect) · [Examples](#examples) · [Guest and key](#guest-and-key) · [Safety](#safety) · [Good to know](#good-to-know)

## In short — why use it

| Common pain | With On 글 다듬기 |
|---|---|
| You rewrite every sentence ending to turn prose into bullet style | `on_gaejo` changes only sentence splits, final predicates, leading connectives and joined long sentences to produce □ ○ - bullets |
| You hunt for errors like “몇일” or “할수있다” | `on_spell` fixes only near-certain errors and returns each fix with its reason |
| Phrases like “~에 있어서” or “제고하다” sound stiff | `on_plain` replaces translationese, double passives, redundant phrases and hard words |
| You worry an AI will change numbers while polishing | No fix ever changes a number; after each change, numbers and names are compared with the original and reported in `check` |

**When you do not need it:** The spell checker in Hancom Hangul, or reading it yourself, is often enough. This tool leaves ambiguous wording alone, so it does not find everything.

<!-- ai-install -->
## Installation guide (for people and AI assistants)

There are three paths; **start with ①**. None needs a key or sign-in. The tools of this repository (On 글 다듬기 — bullet style, spelling and plain language) are in ① the local edition (the npm package `on-munseo-local` by the same maker, on-munseo — see the checks below) — when simply asked to install, register ①. `plugin/` (the Claude Code plugin) in this repository adds ①, and `server.json` (for the official MCP registry) lists ③, the server edition of this bundle.

**① Local edition — documents never leave this computer (first).** Extracts text, compares two versions (old/new table), finds and masks personal data and runs pre-approval checks, and writes government-style HWPX, fills forms, makes HWPX files and tidies text, on this computer. The program does not use the internet (check with `on_local_info` after installing — npx asking the npm registry for a newer version at start-up is npx itself; to avoid even that, `npm install -g on-munseo-local` and register the command `on-munseo-local`). Needs Node.js 20+.
- **Only the AI tool in use** (what an assistant should run — other tools' settings are left alone)
  ```bash
  claude mcp add -s user on-local -- npx -y on-munseo-local@0.3.3
  ```
  Codex `codex mcp add on-local -- npx -y on-munseo-local@0.3.3` · Claude Code on Windows `claude mcp add -s user on-local -- cmd /c npx -y on-munseo-local@0.3.3` · Cursor / Claude Desktop: add `"on-local": { "command": "npx", "args": ["-y", "on-munseo-local@0.3.3"] }` to `"mcpServers"` (Windows `"on-local": { "command": "cmd", "args": ["/c", "npx", "-y", "on-munseo-local@0.3.3"] }`) · VS Code `code --add-mcp '{"name":"on-local","command":"npx","args":["-y","on-munseo-local@0.3.3"]}'`
- **For a person, all AI tools on this PC at once** — finds Claude Code, Claude Desktop, Codex, Cursor and VS Code and registers it in each (backs up first, skips what is there, preview `--dry-run`, undo `--undo`, `--pair` adds ②).
  ```bash
  npx -y on-munseo-local@0.3.3 setup --pair
  ```
- **Pinned version** — the lines above pin the version (`on-munseo-local@0.3.3`). Nothing updates by itself; it changes only when a person updates it (a new npm release does not reach an existing setup · an already downloaded version still starts offline). To update: `npx -y on-munseo-local@latest setup --update` (changes only the version in registered entries · backs up first · preview with `--dry-run`) · changes: [CHANGELOG](https://github.com/on-munseo/on-local/blob/main/CHANGELOG.md)

**② pair address (statutes) — only the words and text you give the tools go to the server; no tool sends files.**
- **Claude Code**
  ```bash
  claude mcp add --transport http -s user on-geungeo https://onmunseo.kr/mcp/law
  ```
- **Codex** — append two lines to the config file (`~/.codex/config.toml`; skipped if already there). Do not use `codex mcp add --url` — it opens a browser sign-in window right away.
  ```bash
  C="${CODEX_HOME:-$HOME/.codex}"; mkdir -p "$C"; touch "$C/config.toml"; if ! (cd / && codex mcp get on-geungeo >/dev/null 2>&1); then if cp "$C/config.toml" "$C/config.toml.bak-on-geungeo"; then printf '\n[mcp_servers.on-geungeo]\nurl = "https://onmunseo.kr/mcp/law"\n' >> "$C/config.toml"; (cd / && codex mcp get on-geungeo >/dev/null 2>&1) || { cp "$C/config.toml.bak-on-geungeo" "$C/config.toml"; echo "자동으로 더하지 못했습니다 — config.toml 에 손으로 더해 주세요"; }; else echo "백업을 만들지 못해 그만둡니다 — config.toml 은 그대로입니다"; fi; fi; (cd / && codex mcp get on-geungeo)
  ```
  On Windows, or where the `codex` command is not installed (IDE extension only), add the two lines `[mcp_servers.on-geungeo]` and `url = "https://onmunseo.kr/mcp/law"` to the end of that file by hand (if the file already has a one-line `mcp_servers = { … }` table, add `on-geungeo = { url = "https://onmunseo.kr/mcp/law" }` inside it instead).
- **Cursor** `"on-geungeo": { "url": "https://onmunseo.kr/mcp/law" }` · **VS Code** `code --add-mcp '{"name":"on-geungeo","type":"http","url":"https://onmunseo.kr/mcp/law"}'` · **Claude Desktop · claude.ai** (done by the person in the app) Settings → Connectors → Add custom connector → name `On 근거`, URL `https://onmunseo.kr/mcp/law` → Connect

**③ Server edition (this bundle) — no Node.js needed (for public documents).** Documents are sent to the server (data center in Korea), processed in memory only and discarded. Use it for public or your own documents.
- **Claude Code**
  ```bash
  claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy
  ```
- **Codex** — append two lines to the config file (`~/.codex/config.toml`; skipped if already there). Do not use `codex mcp add --url` — it opens a browser sign-in window right away.
  ```bash
  C="${CODEX_HOME:-$HOME/.codex}"; mkdir -p "$C"; touch "$C/config.toml"; if ! (cd / && codex mcp get on-tidy >/dev/null 2>&1); then if cp "$C/config.toml" "$C/config.toml.bak-on-tidy"; then printf '\n[mcp_servers.on-tidy]\nurl = "https://onmunseo.kr/mcp/tidy"\n' >> "$C/config.toml"; (cd / && codex mcp get on-tidy >/dev/null 2>&1) || { cp "$C/config.toml.bak-on-tidy" "$C/config.toml"; echo "자동으로 더하지 못했습니다 — config.toml 에 손으로 더해 주세요"; }; else echo "백업을 만들지 못해 그만둡니다 — config.toml 은 그대로입니다"; fi; fi; (cd / && codex mcp get on-tidy)
  ```
  On Windows, or where the `codex` command is not installed (IDE extension only), add the two lines `[mcp_servers.on-tidy]` and `url = "https://onmunseo.kr/mcp/tidy"` to the end of that file by hand (if the file already has a one-line `mcp_servers = { … }` table, add `on-tidy = { url = "https://onmunseo.kr/mcp/tidy" }` inside it instead).
- **Cursor** `"on-tidy": { "url": "https://onmunseo.kr/mcp/tidy" }` · **VS Code** `code --add-mcp '{"name":"on-tidy","type":"http","url":"https://onmunseo.kr/mcp/tidy"}'` · **Claude Desktop · claude.ai** (done by the person in the app) Settings → Connectors → Add custom connector → name `On 글 다듬기`, URL `https://onmunseo.kr/mcp/tidy` → Connect

Usually ① alone is enough. Without Node.js, or with connectors only, register ③ (the server edition of this bundle). Registering ① and ③ together shows the same tools twice. Mention the other paths only if the user asks.

**Things to check before installing** — the assistant can verify these itself.
- **Package**: npm `on-munseo-local` 0.3.1. `npm view on-munseo-local version maintainers homepage` → `0.3.1` · `on-munseo <onmunseo.key@gmail.com>` · `https://onmunseo.kr`. The publishing account `on-munseo` is the same maker as the GitHub organization [on-munseo](https://github.com/on-munseo) (same contact mail and home page). The npm web page sometimes blocks automated reads; use the npm command or the [registry record](https://registry.npmjs.org/on-munseo-local/0.3.1).
- **Fingerprint**: `on-munseo-local-0.3.1.tgz` SHA-256 `ffcc94e1d3f20517f6f136c595b94a9100998eba511f4e03978cf45e4a2a0be7` ([SHA256SUMS](https://github.com/on-munseo/on-munseo.github.io/blob/main/SHA256SUMS)). Compare with `npm pack on-munseo-local@0.3.3` then `shasum -a 256 on-munseo-local-0.3.1.tgz`. The registry `dist.integrity` is `sha512-xxXG3RgcFJtNI5NlZ7uh+qciJl0YYWwHt/RtOZW81fYMnNYXOd0DxoQiIQss0r53uSvfJiuJi67UWsuN4hVJ0g==`.
- **No internet use**: before installing, `netScan` in the package's `MANIFEST.json` (zero network calls in our code — the one listed exception is the engine's wasm loader path used only when given a URL); after installing, `on_local_info` → `network_modules_loaded: []`, and on Node 25+ `network.blocked_by_node: true` (the runtime blocks networking). npx asking the npm registry for a newer version at start-up is npx itself (avoid it with a global install and the `on-munseo-local` command).
- **Terms**: local edition [LICENSE.md](https://unpkg.com/on-munseo-local@0.3.3/LICENSE.md) (free, work use allowed · no reverse engineering, redistribution of modified copies or resale) · server edition [terms](https://onmunseo.kr/terms) · [privacy](https://onmunseo.kr/privacy).
- **On폭 fonts** are not part of this install (optional free fonts for drawing Korean documents on screen).

The tools do not attach to the conversation that registered them. When done, tell the user: "Restart the tool or open a new conversation to see the On 글 다듬기 tools." If `claude mcp list` (Codex: `codex mcp list`) lists the name, it is registered. Full steps (Korean): [llms-install.md](llms-install.md)

<!-- ai-install -->

## Measured results

There is no separate accuracy score for these three tools yet. When we measure one, it will appear here and in [CHANGELOG.md](CHANGELOG.md). Instead, every result includes `check` (the numbers and names lost, if any).

Weak spots: ambiguous wording is left alone, so not every problem is found. Bullet-style rewriting leaves sentences with an unclear ending unchanged.

## What it does

| Tool | What it does | Guest |
|---|---|---|
| `on_gaejo` | Prose to □ ○ - bullets (“~함/~임”); sentences whose ending is unclear are left as they are, with a note. `start` sets the first mark (○, □, -) | yes |
| `on_spell` | Fixes only near-certain spelling and spacing errors (몇일→며칠, 할수있다→할 수 있다, 율/률 …) and lists each fix with its reason | yes |
| `on_plain` | Replaces translationese (~에 있어서), double passives (되어지다), redundancy (가장 최적) and hard words (제고하다), with each change and its reason | yes |

- The 3 guest tools were checked on 2026-11-26 by calling `tools/list` on the live server as a guest.
- Text up to 20,000 characters (`on_gaejo`: up to 2,000 lines).

## Connect

Of the three paths in the [installation guide](#installation-guide-for-people-and-ai-assistants) above (① local edition · ② pair address · ③ server edition), this section details ③, the server edition of this bundle, for each tool.

**Claude Code** — one line in the terminal (`-s user` makes it available in every folder):

```bash
claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy
```

**Claude Code plugin** — adds ① the local edition (Node.js 20+; works on Windows too — the small launcher `plugin/run-local.mjs` starts npx). Installing several of these product plugins starts the local edition several times and shows the same tools more than once, so install just one. One line (Claude Code 2.1.275 or later):

```bash
claude plugin install on-tidy --marketplace on-munseo/on-tidy
```

In every app, the conversation in which you register the server does not get the tools yet. Restart the app once (Claude Code: `/exit`, then `claude`; VS Code: a new chat) or open a new conversation, and the tools are there from then on. Without a key, skip the sign-in step and use it as a guest.

> To use all document tools and the law tools (On 근거) together, add `https://onmunseo.kr/mcp` instead of this bundle (recommended — [On 문서](https://github.com/on-munseo/on-munseo.github.io)). If you add both, the same tools appear twice.

### Claude Code — more

- With a key: in Claude Code open `/mcp` → `on-tidy` → Authenticate, and the On 문서 sign-in page opens. Enter your key there.
- To pass the key as a header: `claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy --header "Authorization: Bearer <key>"`. This stores the key in `~/.claude.json`, so the sign-in page is the better way.
- Two-step plugin install (older versions): `claude plugin marketplace add on-munseo/on-tidy`, then `claude plugin install on-tidy@on-tidy`. In a Claude Code chat: `/plugin marketplace add on-munseo/on-tidy` → `/plugin install on-tidy@on-tidy`.
- Check: `claude mcp list` · remove: `claude mcp remove on-tidy`.

### claude.ai · Claude Desktop (connectors)

Settings → Connectors → “Add custom connector”: name `On 글 다듬기`, URL `https://onmunseo.kr/mcp/tidy`, then Connect. With a key, enter it on the On 문서 sign-in page that opens; without one you are a guest. Menu names differ by plan and version, and some plans may not have this menu.

To add it to Claude Desktop through the config file, use the `mcp-remote` bridge (needs Node.js). macOS `~/Library/Application Support/Claude/claude_desktop_config.json` · Windows `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "on-tidy": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://onmunseo.kr/mcp/tidy"
      ]
    }
  }
}
```

To send a key as a header, append `"--header", "Authorization:${ON_AUTH}"` to `"args"` and add `"env": { "ON_AUTH": "Bearer <key>" }` (no space after the colon, so Windows does not split the argument). Restart Claude Desktop after saving.

### ChatGPT

1. Settings → Apps & Connectors → Advanced settings: turn on Developer mode (wording may differ by version).
2. Create a custom MCP server: name `On 글 다듬기`, URL `https://onmunseo.kr/mcp/tidy`, authentication “OAuth” if you have a key, otherwise “None”.
3. Enter your key on the On 문서 sign-in page, then turn the connector on from the tools (+) menu of a chat.

- ChatGPT receives a separate pass instead of your key (same permissions and daily quota). Revoking the key blocks the pass at once.

### Codex

Without a key, add two lines to `~/.codex/config.toml`:

```toml
[mcp_servers.on-tidy]
url = "https://onmunseo.kr/mcp/tidy"
```

- `codex mcp add` opens the On 문서 sign-in window right away. With a key, enter it there; without one, close it (Ctrl-C) and use the two lines above.

### Cursor

`~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` in a project:

```json
{
  "mcpServers": {
    "on-tidy": {
      "url": "https://onmunseo.kr/mcp/tidy"
    }
  }
}
```

If your Cursor version cannot sign in to remote MCP servers (OAuth), add `"headers": { "Authorization": "Bearer <key>" }` (the key is then stored in the file).

### VS Code

`.vscode/mcp.json` in the workspace:

```json
{
  "servers": {
    "on-tidy": {
      "type": "http",
      "url": "https://onmunseo.kr/mcp/tidy"
    }
  }
}
```

To send a key as a header without writing it in the file, let VS Code ask for it on first start:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "on-key",
      "description": "On 문서 key",
      "password": true
    }
  ],
  "servers": {
    "on-tidy": {
      "type": "http",
      "url": "https://onmunseo.kr/mcp/tidy",
      "headers": {
        "Authorization": "Bearer ${input:on-key}"
      }
    }
  }
}
```

### Try it with curl

List the tools (add `-H "Authorization: Bearer <key>"` if you have a key):

```bash
curl -s https://onmunseo.kr/mcp/tidy \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Call `on_spell` — sending the request from a file keeps quotes and line breaks intact:

```bash
cat > call.json <<'EOF'
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "on_spell", "arguments": {"text": "몇일 뒤에 다시 검토할수있다."}}}
EOF
curl -s https://onmunseo.kr/mcp/tidy \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  --data-binary @call.json
```

The reply was “며칠 뒤에 다시 검토할 수 있다.” with 2 fixes (1 spelling, 1 spacing) and `check.lost: []` (2026-11-26, guest). The answer is the text in `result.content`. The server is stateless (Streamable HTTP, POST), so a single `tools/call` works without `initialize`. Opening the URL in a browser shows a short guide page.

## Examples

| If you say | This tool |
|---|---|
| “Rewrite this paragraph in bullet style” | `on_gaejo` |
| “Check only spelling and spacing” | `on_spell` |
| “Make this text plainer” | `on_plain` |

The AI decides which tool to call; these are typical cases.

## Guest and key

|  | Guest (no key) | Key |
|---|---|---|
| How to connect | Add the URL with no authentication | Enter the key on the On 문서 sign-in page (OAuth), or send `Authorization: Bearer <key>` |
| Tools at this endpoint | 3 | 3 |
| Daily quota | 100 calls a day and 12 a minute (the statute tools `law_`·`med_` have their own 200 a day and 30 a minute) per internet address (IP), counted across all On 문서 endpoints and the web editor (through a Claude app connector, requests arrive from Anthropic server addresses, so the quota is counted per connection instead). When the shared guest quota for the day runs out, guest access closes until midnight Korea time | A daily quota and concurrency limit set per key |
| Size | 20,000 characters of text (`on_gaejo`: 2,000 lines) | 20,000 characters of text (`on_gaejo`: 2,000 lines) |
| Needs a key | — | none (the key must include this bundle — first-issued keys do not) |

- To use it with a key, the key must include this bundle. First-issued keys do not, so mention it when you apply. Guests can use it right away.
- To get a key, write to `onmunseo.key [at] gmail.com` (subject “On 문서 열쇠 신청”), with what you will use it for and which bundle you need (e.g. On 글 다듬기).
- A wrong or revoked key gives **401**; a bundle that is not in your key gives **403**. Too many calls in a short time give “too many requests” (429) — wait about a minute.
- Never append the key to the URL; it would end up in chat and access logs.

## Safety

1. **Nothing is kept.** Text you send is discarded when done; the access log holds only the key alias, tool name, request size, time taken and success.
2. **Rule-based, no AI.** The same text gives the same result.
3. **Numbers are never changed.** No fix changes a number; after each change, numbers and names are compared with the original, a sentence that does not match is left as it was, and `check` lists anything lost.
4. **Send only public material or your own to this server-side address.** Handle internal documents of your organisation with the browser-only features of the [web editor](https://onmunseo.kr/app/) (open, edit and save HWP/HWPX, the pre-approval check, masking personal data).

Report security problems as described in [SECURITY.md](SECURITY.md).

## Good to know

- **This is a free trial service.** Features, quotas and URLs may change or stop. Changes are noted in [CHANGELOG.md](CHANGELOG.md).
- **Results are for reference.** Have a person check them before approval.
- Internet only — it cannot be used from closed government networks.
- Menus differ by app and version, so screens may not match the steps above. If something fails, see [SUPPORT.md](SUPPORT.md).

## Terms, privacy and notices

- Bulk collection of results and use of results to train other AI models are not allowed. Automated abuse (several keys to get around limits, non-stop calls, scraping results) leads to the key being cut off without notice. Extracting or reverse-engineering the engine, rules or code is not permitted.
- Summary: [terms in the MCP guide](https://github.com/on-munseo/on-munseo.github.io/blob/main/MCP.md#5-이용-조건약관-요약) (Korean). Full text: [terms of use](https://onmunseo.kr/terms) and [privacy policy](https://onmunseo.kr/privacy) (Korean).
- “Hangul”, “Hancom”, “HWP” and “HWPX” are trademarks or registered trademarks of Hancom Inc. On 문서 is an independent service with no affiliation, sponsorship or endorsement by Hancom Inc.
- Claude, ChatGPT, Cursor, VS Code and other names belong to their owners and are used only to explain how to connect. Full notices: [notices in the MCP guide](https://github.com/on-munseo/on-munseo.github.io/blob/main/MCP.md#고지) (Korean).

## Glossary

- **MCP** — Model Context Protocol, an open standard for AI tools to call outside tools. Add this URL as an MCP server and the AI calls these tools inside the chat.
- **Remote MCP server** — An MCP server reached over the internet; nothing to install on your computer.
- **Bundle endpoint** — A URL that carries one On 문서 feature set (`/mcp/text` and so on). Everything is at `/mcp`.
- **Key (열쇠)** — The access value issued by On 문서, with a daily quota and a set of bundles. Keep it secret.
- **Guest (손님)** — Use without a key: some tools and a small daily quota, right away.
- **OAuth (sign-in page)** — You enter the key on the On 문서 sign-in page when connecting; the app receives a separate pass instead of the key.
- **Gaejo (개조식)** — The bullet style of Korean official documents: □ ○ - marks and short “~함/~임” endings, one idea per line.
- **Translationese · double passive · redundancy** — Phrases that read like translations (“~에 있어서”), passives used twice (“되어지다”), and overlapping meanings (“가장 최적”).

## Other On 문서 bundles

| Product | Repository | Endpoint (after `https://onmunseo.kr`) |
|---|---|---|
| **On 문서 (all)** | [on-munseo.github.io](https://github.com/on-munseo/on-munseo.github.io) — web editor and every MCP tool | `/mcp` |
| On 글꺼내기 | [on-text](https://github.com/on-munseo/on-text) | `/mcp/text` |
| On 결재점검 | [on-check](https://github.com/on-munseo/on-check) | `/mcp/check` |
| On 개인정보 가리기 | [on-mask](https://github.com/on-munseo/on-mask) | `/mcp/mask` |
| On HWPX 만들기 | [on-hwpx](https://github.com/on-munseo/on-hwpx) | `/mcp/hwpx` |
| On 공문서 쓰기 | [on-gov](https://github.com/on-munseo/on-gov) | `/mcp/gov` |
| On 글 다듬기 | this repository | `/mcp/tidy` |
| On 근거 | [on-geungeo](https://github.com/on-munseo/on-geungeo) | `/mcp/law` |
| On폭 글꼴 (fonts) | [napurrin/onpok-fonts](https://github.com/napurrin/onpok-fonts) — free fonts (SIL OFL 1.1) · not needed for the MCP install (optional) | — |

## License

Text is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); configuration files (`server.json`, `.claude-plugin/`, `plugin/`) are MIT. The names “On 문서” and “On 글 다듬기” and the logo are not covered by these licenses. The engine and server code of the service are not in this repository and are not public. See [LICENSE](LICENSE).

---

Made by [napurrin](https://github.com/napurrin), who builds and maintains it while learning from Coco.
