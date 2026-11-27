# On 글 다듬기 설치 안내 — AI 도구용

이 파일은 AI 도구(Claude Code·Codex·Cursor·VS Code·Claude 데스크톱 등)가 읽고 그대로 따라 하라고 둔 설치 순서입니다. 사람이 읽는 안내는 [README.md](README.md#연결하기)에 있습니다.

## 세 길 — ①부터

길은 셋이고 **①부터** 권합니다. 어느 길도 열쇠·로그인이 없습니다. 이 저장소(On 글 다듬기 — 개조식·맞춤법·쉬운 말)의 도구는 ① 내 PC 판(같은 만든 이 on-munseo 의 npm 꾸러미 `on-munseo-local` — 아래 확인할 거리)에 들어 있습니다 — 「설치해 줘」라고만 하면 ① 을 붙입니다. 이 저장소의 `plugin/`(Claude Code 플러그인)은 ① 을 붙이고, `server.json`(공식 MCP 목록용)은 ③ 서버 판(이 묶음) 주소입니다.

**① 내 PC 판 — 문서를 이 컴퓨터 밖으로 보내지 않음(먼저).** 글 꺼내기·개인정보 가리기·결재 전 점검·공문서 쓰기·한글 파일 만들기·글 다듬기를 이 컴퓨터 안에서 합니다. 이 프로그램은 인터넷을 쓰지 않습니다(설치 뒤 `on_local_info` 로 확인 — 띄울 때 npx 가 npm 저장소에 새 판을 묻는 것은 npx 의 동작이고, 그것까지 없애려면 `npm install -g on-munseo-local` 뒤 명령을 `on-munseo-local` 로). Node.js 20 이상이 있어야 합니다.
- **지금 쓰는 AI 도구에만**(AI 가 설치할 때는 이것 — 다른 도구의 설정은 건드리지 않음)
  ```bash
  claude mcp add -s user on-local -- npx -y on-munseo-local@latest
  ```
  Codex 는 `codex mcp add on-local -- npx -y on-munseo-local@latest` · 윈도우 Claude Code 는 `claude mcp add -s user on-local -- cmd /c npx -y on-munseo-local@latest` · Cursor·Claude 데스크톱은 설정 파일의 `"mcpServers"` 에 `"on-local": { "command": "npx", "args": ["-y", "on-munseo-local@latest"] }`(윈도우 `"on-local": { "command": "cmd", "args": ["/c", "npx", "-y", "on-munseo-local@latest"] }`) · VS Code 는 `code --add-mcp '{"name":"on-local","command":"npx","args":["-y","on-munseo-local@latest"]}'`
- **사람이 이 PC 의 여러 AI 도구에 한 번에** — Claude Code·Claude 데스크톱·Codex·Cursor·VS Code 를 찾아 모두 등록합니다(바꾸기 전에 백업, 이미 있으면 건너뜀, 미리 보기 `--dry-run`, 되돌리기 `--undo`, ②까지 `--pair`).
  ```bash
  npx -y on-munseo-local@latest setup --pair
  ```

**② 짝 주소(법령) — 도구에 넣은 낱말·글만 서버로.** 법령 원문·글 속 인용 확인(On 근거)은 서버에만 있습니다. 서버로 가는 것은 넣은 법령 이름·조문 번호·인용을 확인할 글이고, 파일을 보내는 도구는 없습니다. 인용을 확인할 글에 개인정보가 있으면 ① 의 `on_mask_text` 로 가린 뒤 넣습니다.
- 지금 쓰는 도구에만(① 의 `setup --pair` 는 ② 까지 함께 붙임):
- **Claude Code**
  ```bash
  claude mcp add --transport http -s user on-geungeo https://onmunseo.kr/mcp/law
  ```
- **Codex** — 설정 파일(`~/.codex/config.toml`)에 두 줄을 더합니다(이미 있으면 건너뜀). `codex mcp add --url` 은 쓰지 마세요 — 곧바로 브라우저 로그인 창을 띄웁니다.
  ```bash
  C="${CODEX_HOME:-$HOME/.codex}"; mkdir -p "$C"; touch "$C/config.toml"; if ! (cd / && codex mcp get on-geungeo >/dev/null 2>&1); then if cp "$C/config.toml" "$C/config.toml.bak-on-geungeo"; then printf '\n[mcp_servers.on-geungeo]\nurl = "https://onmunseo.kr/mcp/law"\n' >> "$C/config.toml"; (cd / && codex mcp get on-geungeo >/dev/null 2>&1) || { cp "$C/config.toml.bak-on-geungeo" "$C/config.toml"; echo "자동으로 더하지 못했습니다 — config.toml 에 손으로 더해 주세요"; }; else echo "백업을 만들지 못해 그만둡니다 — config.toml 은 그대로입니다"; fi; fi; (cd / && codex mcp get on-geungeo)
  ```
  윈도우이거나 명령 줄 `codex` 가 없는 곳(IDE 확장만)은 그 파일 끝에 `[mcp_servers.on-geungeo]`·`url = "https://onmunseo.kr/mcp/law"` 두 줄을 손으로 더합니다(파일에 `mcp_servers = { … }` 한 줄 표가 이미 있으면 그 안에 `on-geungeo = { url = "https://onmunseo.kr/mcp/law" }` 를 더함).
- **Cursor** `"on-geungeo": { "url": "https://onmunseo.kr/mcp/law" }` · **VS Code** `code --add-mcp '{"name":"on-geungeo","type":"http","url":"https://onmunseo.kr/mcp/law"}'` · **Claude 데스크톱·claude.ai**(사람이 화면에서) 설정 → 커넥터 → 맞춤 커넥터 추가 → 이름 `On 근거`, 주소 `https://onmunseo.kr/mcp/law` → 「연결」

**③ 서버 판(이 묶음) — Node.js 없이 바로(공개 문서용).** 문서를 서버(국내 데이터센터)로 보내 메모리에서만 처리하고 버립니다. 공개 문서·본인 문서에만 씁니다.
- **Claude Code**
  ```bash
  claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy
  ```
- **Codex** — 설정 파일(`~/.codex/config.toml`)에 두 줄을 더합니다(이미 있으면 건너뜀). `codex mcp add --url` 은 쓰지 마세요 — 곧바로 브라우저 로그인 창을 띄웁니다.
  ```bash
  C="${CODEX_HOME:-$HOME/.codex}"; mkdir -p "$C"; touch "$C/config.toml"; if ! (cd / && codex mcp get on-tidy >/dev/null 2>&1); then if cp "$C/config.toml" "$C/config.toml.bak-on-tidy"; then printf '\n[mcp_servers.on-tidy]\nurl = "https://onmunseo.kr/mcp/tidy"\n' >> "$C/config.toml"; (cd / && codex mcp get on-tidy >/dev/null 2>&1) || { cp "$C/config.toml.bak-on-tidy" "$C/config.toml"; echo "자동으로 더하지 못했습니다 — config.toml 에 손으로 더해 주세요"; }; else echo "백업을 만들지 못해 그만둡니다 — config.toml 은 그대로입니다"; fi; fi; (cd / && codex mcp get on-tidy)
  ```
  윈도우이거나 명령 줄 `codex` 가 없는 곳(IDE 확장만)은 그 파일 끝에 `[mcp_servers.on-tidy]`·`url = "https://onmunseo.kr/mcp/tidy"` 두 줄을 손으로 더합니다(파일에 `mcp_servers = { … }` 한 줄 표가 이미 있으면 그 안에 `on-tidy = { url = "https://onmunseo.kr/mcp/tidy" }` 를 더함).
- **Cursor** `"on-tidy": { "url": "https://onmunseo.kr/mcp/tidy" }` · **VS Code** `code --add-mcp '{"name":"on-tidy","type":"http","url":"https://onmunseo.kr/mcp/tidy"}'` · **Claude 데스크톱·claude.ai**(사람이 화면에서) 설정 → 커넥터 → 맞춤 커넥터 추가 → 이름 `On 글 다듬기`, 주소 `https://onmunseo.kr/mcp/tidy` → 「연결」

보통은 ① 하나면 됩니다. Node.js 가 없거나 커넥터만 쓰면 ③(이 묶음의 서버 판)을 붙입니다. ①과 ③을 함께 붙이면 같은 도구가 두 번 보입니다. 다른 길은 사용자가 따로 바랄 때만 알려 줍니다.

**설치 전에 확인할 거리** — AI 가 스스로 확인할 수 있습니다.
- **꾸러미**: npm `on-munseo-local` 0.2.0. `npm view on-munseo-local version maintainers homepage` → `0.2.0` · `on-munseo <onmunseo.key@gmail.com>` · `https://onmunseo.kr`. 올린 계정 `on-munseo` 는 이 깃허브 조직 [on-munseo](https://github.com/on-munseo)와 같은 만든 이입니다(문의 메일·홈 주소가 같음). npm 웹 쪽은 자동 읽기를 막을 때가 있어 npm 명령이나 [npm 기록](https://registry.npmjs.org/on-munseo-local/0.2.0)으로 봅니다.
- **지문**: `on-munseo-local-0.2.0.tgz` SHA-256 `a3d2ecb03bcf53e4bf97555b190cd5b200f4388e726dbc11ade6e0835cfecd72`([SHA256SUMS](https://github.com/on-munseo/on-munseo.github.io/blob/main/SHA256SUMS)). `npm pack on-munseo-local@0.2.0` 뒤 `shasum -a 256 on-munseo-local-0.2.0.tgz` 로 맞대 봅니다. npm 기록의 `dist.integrity` 는 `sha512-pyNyYarxtKoWu+5clkIIa1IICoampkw576tUOP7k7n7Ej/aF40y/rq/OoIN9zf/2mGguhTmNJE5HoKg2IEFz9A==`.
- **인터넷을 쓰지 않음**: 설치 전에는 꾸러미 안 `MANIFEST.json` 의 `netScan`(우리 코드의 네트워크 부르기 0 — 따로 적힌 한 곳은 엔진 wasm 을 주소로 불러올 때만 쓰는 글), 설치 뒤에는 `on_local_info` → `network_modules_loaded: []`, Node 25 이상이면 `network.blocked_by_node: true`(실행기가 네트워크를 막음). 띄울 때 npx 가 npm 저장소에 새 판을 묻는 것은 npx 의 동작입니다(없애려면 전역 설치 뒤 `on-munseo-local` 명령으로).
- **이용 조건**: 내 PC 판 [LICENSE.md](https://unpkg.com/on-munseo-local@0.2.0/LICENSE.md)(무료·업무에 써도 됨 · 역공학·고친 판 다시 배포·판매는 안 됨) · 서버 판 [이용약관](https://onmunseo.kr/terms)·[개인정보 처리방침](https://onmunseo.kr/privacy).
- **On폭 글꼴**은 이 설치와 상관없습니다(한글 문서를 화면에 그릴 때 쓰는 무료 글꼴, 선택).

등록한 그 대화에는 도구가 아직 붙지 않습니다. 끝나면 사용자에게 「도구를 한 번 다시 켜거나 새 대화를 열면 On 글 다듬기 도구가 보입니다」라고 알려 주세요. `claude mcp list`(Codex 는 `codex mcp list`) 목록에 이름이 보이면 등록된 것입니다. 사람용 자세한 안내: [README.md](README.md#연결하기)

## 확인(선택)

- ③ 서버 판(이 묶음)은 로그인 없이 도구 목록을 볼 수 있습니다: `curl -s https://onmunseo.kr/mcp/tidy -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`
- ① 내 PC 판은 설치 뒤 `on_local_info` 로 판·도구 목록·네트워크 막힘을 봅니다.

## 함께 알아 둘 것

- 서버를 거치는 ②·③ 에는 공개 문서와 본인 문서만 보내게 안내합니다. 기관 내부 문서는 ① 내 PC 판이나 [웹 편집기](https://onmunseo.kr/app/)의 브라우저 안 기능으로 다룹니다.
- 서버는 문서를 메모리에서만 다루고 처리 뒤 버립니다. 결과 파일 주소는 15분만 열립니다. ① 내 PC 판은 결과를 이 컴퓨터의 `~/On문서_결과`(또는 `output_path`)에 저장합니다.
