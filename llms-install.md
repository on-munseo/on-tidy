# On 글 다듬기 설치 안내 — AI 도구용

이 파일은 AI 도구(Claude Code·Codex·Cursor·VS Code·Claude 데스크톱 등)가 읽고 그대로 따라 하라고 둔 설치 순서입니다. 사람이 읽는 안내는 [README.md](README.md#연결하기)에 있습니다.

## 먼저 요약

1. **설치할 프로그램은 없습니다.** 원격 MCP 서버 주소 `https://onmunseo.kr/mcp/tidy`(Streamable HTTP) 하나를 **사용자 범위**로 등록합니다. 저장소를 내려받거나 빌드하지 않아도 됩니다.
2. **열쇠가 없으면 로그인 단계는 건너뜁니다.** 손님으로 바로 씁니다(손님 도구 3개: `on_gaejo`·`on_spell`·`on_plain`). 열쇠를 대신 만들거나 추측하지 말고, 주소 뒤나 설정 파일에 적지 마세요.
3. **등록한 그 대화에는 도구가 아직 붙지 않습니다.** 끝나면 사용자에게 「도구를 한 번 다시 켜거나 새 대화를 열면 On 글 다듬기 도구가 보입니다」라고 알립니다.

## 도구별 순서

사용자가 쓰는 도구를 먼저 확인하고, 그 도구의 순서만 따릅니다.

### Claude Code(터미널·VS Code 확장)

1. 이미 있는지: `claude mcp list` 목록에 `on-tidy` 줄이 있으면 끝입니다.
2. 등록합니다.
   ```bash
   claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy
   ```
   `claude` 명령이 없는 곳(VS Code 확장 등)은 `~/.claude.json` 맨 위 `"mcpServers"` 에 `"on-tidy": { "type": "http", "url": "https://onmunseo.kr/mcp/tidy" }` 를 더합니다(JSON 으로 읽어 이 키만 더하고 다른 설정은 그대로).
3. 열쇠가 있는 사용자만: 다시 켠 뒤 `/mcp` → `on-tidy` → Authenticate 를 누르면 On 문서 로그인 창이 뜹니다.

### Codex

`codex mcp add --url` 은 쓰지 않습니다 — 이 주소의 로그인 정보를 보고 곧바로 브라우저 로그인 창을 띄웁니다. 설정 파일에 두 줄을 더합니다(이미 있으면 건너뜀).

```bash
C="${CODEX_HOME:-$HOME/.codex}"; mkdir -p "$C"; touch "$C/config.toml"; if ! (cd / && codex mcp get on-tidy >/dev/null 2>&1); then if cp "$C/config.toml" "$C/config.toml.bak-on-tidy"; then printf '\n[mcp_servers.on-tidy]\nurl = "https://onmunseo.kr/mcp/tidy"\n' >> "$C/config.toml"; (cd / && codex mcp get on-tidy >/dev/null 2>&1) || { cp "$C/config.toml.bak-on-tidy" "$C/config.toml"; echo "자동으로 더하지 못했습니다 — config.toml 에 손으로 더해 주세요"; }; else echo "백업을 만들지 못해 그만둡니다 — config.toml 은 그대로입니다"; fi; fi; (cd / && codex mcp get on-tidy)
```

윈도우이거나 명령 줄 `codex` 가 없는 곳(IDE 확장만)은 `~/.codex/config.toml`(윈도우 `%USERPROFILE%\.codex\config.toml`) 끝에 아래 두 줄을 손으로 더합니다(파일에 `mcp_servers = { … }` 한 줄 표가 이미 있으면 그 안에 `on-tidy = { url = "https://onmunseo.kr/mcp/tidy" }` 를 더함).

```toml
[mcp_servers.on-tidy]
url = "https://onmunseo.kr/mcp/tidy"
```

`codex mcp list` 목록에 `on-tidy` 줄이 있으면 끝입니다. 새 Codex 세션부터 씁니다. 열쇠가 있는 사용자만 그 뒤 로그인합니다: `codex mcp login on-tidy`

### Cursor

`~/.cursor/mcp.json`(모든 프로젝트) 또는 프로젝트의 `.cursor/mcp.json` 의 `"mcpServers"` 에 더합니다. 이미 있는 다른 서버는 지우지 마세요.

```json
{ "mcpServers": { "on-tidy": { "url": "https://onmunseo.kr/mcp/tidy" } } }
```

사람에게는 한 번 누르기 주소를 줄 수 있습니다: https://cursor.com/install-mcp?name=on-tidy&config=eyJ1cmwiOiJodHRwczovL29ubXVuc2VvLmtyL21jcC90aWR5In0%3D

### VS Code

사용자 프로필에 더합니다.

```bash
code --add-mcp '{"name":"on-tidy","type":"http","url":"https://onmunseo.kr/mcp/tidy"}'
```

한 번 누르기 주소: https://insiders.vscode.dev/redirect/mcp/install?name=on-tidy&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fonmunseo.kr%2Fmcp%2Ftidy%22%7D

### Claude 데스크톱 · claude.ai(웹)

설정 파일을 고치지 말고 사용자에게 안내합니다: 설정 → 커넥터 → 「맞춤 커넥터 추가」 → 이름 `On 글 다듬기`, 주소 `https://onmunseo.kr/mcp/tidy` → 「연결」. 열쇠가 없으면 손님으로 씁니다. 메뉴 이름은 요금제·판에 따라 조금 다를 수 있습니다.

### 챗GPT

설정 → 앱·커넥터 → 고급 설정에서 「개발자 모드」를 켜고 「만들기」: 이름 `On 글 다듬기`, 주소 `https://onmunseo.kr/mcp/tidy`, 인증은 열쇠가 없으면 「없음」(있으면 「OAuth」).

## 확인(선택)

로그인 없이 도구 목록을 볼 수 있습니다.

```bash
curl -s https://onmunseo.kr/mcp/tidy -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

손님에게는 `on_gaejo`·`on_spell`·`on_plain` 가 보입니다.

## 함께 알아 둘 것

- 문서 도구 전부와 법령 원문을 함께 쓰려면 이 묶음 대신 `https://onmunseo.kr/mcp` 하나를 붙입니다([On 문서](https://github.com/on-munseo/on-munseo.github.io)). 둘 다 붙이면 같은 도구가 두 번 보입니다.
- 서버를 거치는 MCP 에는 공개 문서와 본인 문서만 보내게 안내합니다. 기관 내부 문서는 [웹 편집기](https://onmunseo.kr/app/)의 브라우저 안 기능으로 다루게 안내합니다.
- 문서는 서버 메모리에서만 다루고 처리 뒤 버립니다. 결과 파일 주소는 15분만 열립니다.
