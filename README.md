<div align="center">

# On 글 다듬기

서술형 글을 공문서 개조식으로 바꾸고, 맞춤법·띄어쓰기와 어려운 말을 고치는 원격 MCP 서버

**한국어** · [English](README.en.md)

`https://onmunseo.kr/mcp/tidy`

</div>

서술형 문단을 □ ○ - 개조식(「~함」「~임」 끝맺음, 한 줄 한 생각)으로 바꾸고(`on_gaejo`), 틀린 것이 거의 확실한 맞춤법·띄어쓰기만 고치고(`on_spell`), 번역투·이중 피동·겹말·어려운 한자어를 쉬운 말로 바꿉니다(`on_plain`). AI 없이 규칙으로 하며, 바꾼 뒤 숫자·이름 같은 말을 원문과 다시 맞대어 어긋나면 그 문장은 원문 그대로 둡니다.

이 저장소에는 연결 안내와 설정 파일만 있습니다(웹 화면 없음 — 화면에서 쓰려면 [On 문서 웹 편집기](https://onmunseo.kr/app/)). 서비스의 엔진·서버 코드는 공개하지 않습니다.

**바로 가기:** [왜 쓰나](#쉽게-말하면--왜-쓰나) · [도구](#무엇을-하나) · [연결하기](#연결하기) · [쓰는 예](#쓰는-예) · [성능](#성능) · [손님과 열쇠](#손님과-열쇠) · [안전](#안전) · [알아 둘 점](#알아-둘-점)

## 쉽게 말하면 — 왜 쓰나

| 흔한 불편 | On 글 다듬기에서는 |
|---|---|
| 줄글 보고를 개조식으로 바꾸느라 끝맺음을 하나하나 고친다 | 문장 나누기·끝 서술어·문장 머리 접속어·긴 문장 이음만 바꿔 □ ○ - 개조식으로 만듭니다(`on_gaejo`) |
| 「몇일」「할수있다」 같은 맞춤법을 찾아 고친다 | 틀린 것이 거의 확실한 것만 고치고, 고친 곳과 까닭을 함께 줍니다(`on_spell`) |
| 「~에 있어서」「제고하다」 같은 말이 딱딱하다 | 번역투·이중 피동·겹말·어려운 한자어를 쉬운 말로 바꿉니다(`on_plain`) |
| AI 에게 다듬기를 맡기면 숫자가 바뀔까 걱정된다 | 숫자가 바뀌는 고침은 하지 않고, 바꾼 뒤 숫자·이름을 원문과 다시 맞대어 결과의 `check` 에 적습니다 |

**이럴 땐 없이도 됩니다:** 한컴 한글의 맞춤법 검사나 직접 읽어 보는 것으로 충분할 때가 많습니다. 이 도구는 애매한 말을 건드리지 않아 고칠 곳을 모두 찾지는 않습니다.

## 무엇을 하나

| 도구 | 이름 | 하는 일 | 손님 |
|---|---|---|---|
| `on_gaejo` | 개조식으로 | 서술형 문단을 □ ○ - 개조식(「~함」「~임」)으로. 끝맺음을 확실히 못 정한 문장은 그대로 두고 알림. `start` 로 첫 기호(○·□·-) | ○ |
| `on_spell` | 맞춤법·띄어쓰기 | 틀린 것이 거의 확실한 맞춤법·띄어쓰기(몇일→며칠, 할수있다→할 수 있다, 율/률 등)만 고친 글과 고친 곳·까닭 | ○ |
| `on_plain` | 쉬운 말로 | 번역투(~에 있어서)·이중 피동(되어지다)·겹말(가장 최적)·어려운 한자어(제고하다)를 쉬운 말로, 바꾼 곳·까닭 | ○ |

- 손님에게 보이는 도구 3개는 2026-11-26 운영 서버에 손님으로 `tools/list` 를 불러 확인했습니다.
- 글은 2만 자까지입니다(`on_gaejo` 는 2천 줄까지).

## 연결하기

**Claude Code** — 터미널에 한 줄(`-s user` 는 모든 폴더에서 쓰기):

```bash
claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy
```

**Claude Code 플러그인** — 한 줄(Claude Code 2.1.275 이상):

```bash
claude plugin install on-tidy --marketplace on-munseo/on-tidy
```

어느 앱이든 등록한 그 대화에는 도구가 아직 붙지 않습니다. 앱을 한 번 다시 켜거나(Claude Code 터미널은 `/exit` 뒤 `claude`, VS Code 는 새 대화) 새 대화를 열면 그다음부터 씁니다. 열쇠가 없으면 로그인 단계는 건너뛰고 손님으로 씁니다.

> 문서 도구 전부와 법령 원문(On 근거)을 함께 쓰려면 이 묶음 대신 `https://onmunseo.kr/mcp` 하나를 붙이세요(권장 — [On 문서](https://github.com/on-munseo/on-munseo.github.io)). 둘 다 붙이면 같은 도구가 두 번 보입니다.

### Claude Code — 더 보기

- 열쇠가 있으면 Claude Code 안에서 `/mcp` → `on-tidy` → 인증(Authenticate)을 누르면 On 문서 로그인 창이 뜹니다. 열쇠를 넣으면 끝입니다.
- 머리말로 넣으려면 `claude mcp add --transport http -s user on-tidy https://onmunseo.kr/mcp/tidy --header "Authorization: Bearer <열쇠>"` 처럼 붙입니다. 이렇게 하면 열쇠가 설정 파일(`~/.claude.json`)에 남으니 로그인 창 쪽을 권합니다.
- 플러그인을 두 줄로 붙이려면(옛 판): `claude plugin marketplace add on-munseo/on-tidy` 다음 `claude plugin install on-tidy@on-tidy`. Claude Code 대화창에서는 `/plugin marketplace add on-munseo/on-tidy` → `/plugin install on-tidy@on-tidy`.
- 확인 `claude mcp list` · 빼기 `claude mcp remove on-tidy`.

### claude.ai · Claude 데스크톱(커넥터)

설정 → 커넥터 → 「사용자 지정 커넥터 추가」(화면에 따라 「맞춤 커넥터 추가」)에서 이름 `On 글 다듬기`, 주소 `https://onmunseo.kr/mcp/tidy` 를 넣고 「연결」을 누릅니다. 열쇠가 있으면 뜨는 On 문서 로그인 창에 넣고, 없으면 손님으로 씁니다. 요금제·판에 따라 메뉴 이름이 다르거나 이 메뉴가 없을 수 있습니다.

Claude 데스크톱을 설정 파일로 붙이려면 중계 도구 `mcp-remote` 를 씁니다(Node.js 필요). 맥 `~/Library/Application Support/Claude/claude_desktop_config.json` · 윈도우 `%APPDATA%\Claude\claude_desktop_config.json`:

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

열쇠를 머리말로 넣으려면 `"args"` 끝에 `"--header", "Authorization:${ON_AUTH}"` 를 더하고 `"env": { "ON_AUTH": "Bearer <열쇠>" }` 를 둡니다(쌍점 뒤를 띄우지 않는 것은 윈도우에서 인자가 갈라지지 않게 하려는 것). 저장한 뒤 Claude 데스크톱을 다시 켭니다.

### 챗GPT

1. 설정 → 앱·커넥터 → 고급 설정에서 「개발자 모드」를 켭니다(화면 판에 따라 다를 수 있음).
2. 「만들기」(사용자 MCP 서버 추가)에서 이름 `On 글 다듬기`, 주소 `https://onmunseo.kr/mcp/tidy`, 인증은 열쇠가 있으면 「OAuth」, 없으면 「없음」을 고릅니다.
3. 연결할 때 뜨는 On 문서 로그인 창에 열쇠를 넣고, 대화 창의 도구(+) 메뉴에서 켭니다.

- 챗GPT 에는 열쇠 대신 따로 만든 출입증이 갑니다(권한·하루 몫은 열쇠와 같음). 열쇠를 끊으면 출입증도 바로 막힙니다.

### Cursor

`~/.cursor/mcp.json`(모든 프로젝트) 또는 프로젝트의 `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "on-tidy": {
      "url": "https://onmunseo.kr/mcp/tidy"
    }
  }
}
```

Cursor 가 원격 MCP 로그인(OAuth)을 하지 못하는 판이면 `"headers": { "Authorization": "Bearer <열쇠>" }` 를 더합니다(열쇠가 파일에 남습니다).

### VS Code

작업 공간의 `.vscode/mcp.json`:

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

열쇠를 머리말로 넣되 파일에 적지 않으려면, 처음 켤 때 묻게 합니다:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "on-key",
      "description": "On 문서 열쇠",
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

### 직접 불러 보기(curl)

도구 목록(열쇠가 있으면 `-H "Authorization: Bearer <열쇠>"` 를 더함):

```bash
curl -s https://onmunseo.kr/mcp/tidy \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

`on_spell` 부르기 — 글에 따옴표·줄바꿈이 많으면 이렇게 파일로 보내면 깨지지 않습니다:

```bash
cat > call.json <<'EOF'
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "on_spell", "arguments": {"text": "몇일 뒤에 다시 검토할수있다."}}}
EOF
curl -s https://onmunseo.kr/mcp/tidy \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  --data-binary @call.json
```

「며칠 뒤에 다시 검토할 수 있다.」와 고친 곳 2개(맞춤법 1 · 띄어쓰기 1), `check.lost: []` 를 받았습니다(2026-11-26, 손님). 결과 `result.content` 의 글이 답입니다. 서버는 상태를 두지 않는 방식(Streamable HTTP, POST)이라 `initialize` 없이 `tools/call` 하나로 됩니다. 브라우저로 주소를 열면 안내 쪽이 보입니다.

## 쓰는 예

| 이렇게 말하면 | 이 도구가 |
|---|---|
| 「이 문단을 개조식으로 바꿔 줘」 | `on_gaejo` |
| 「맞춤법·띄어쓰기만 봐 줘」 | `on_spell` |
| 「이 글을 쉬운 말로 다듬어 줘」 | `on_plain` |

AI 가 어느 도구를 부를지는 AI 가 정합니다. 위는 흔히 불리는 예입니다.

## 성능

이 묶음의 세 도구만 따로 잰 정확도 숫자는 아직 없습니다. 재면 이 절과 [CHANGELOG.md](CHANGELOG.md)에 적습니다. 대신 결과마다 원문과 견준 `check`(잃은 숫자·이름 목록)를 줍니다.

약한 곳: 애매한 말은 건드리지 않아 고쳐야 할 곳을 모두 찾지는 않습니다. 개조식 바꾸기는 끝맺음을 확실히 못 정한 문장을 원문 그대로 둡니다.

## 손님과 열쇠

|  | 손님(열쇠 없음) | 열쇠 |
|---|---|---|
| 붙이는 법 | 인증 없이 주소만 붙임 | 연결할 때 뜨는 On 문서 로그인 창(OAuth)에 열쇠, 또는 `Authorization: Bearer <열쇠>` 머리말 |
| 이 주소의 도구 | 3개 | 3개 |
| 하루 몫 | 같은 인터넷 주소(IP)에서 하루 50번·1분에 6번 — On 문서의 모든 주소와 웹 화면을 합쳐 셈. 손님 전체의 하루 몫이 차면 한국 시간 자정까지 닫힘 | 열쇠마다 정해진 하루 몫과 동시에 처리하는 수 |
| 크기 | 글 2만 자(`on_gaejo` 는 2천 줄까지) | 글 2만 자(`on_gaejo` 는 2천 줄까지) |
| 열쇠가 있어야 하는 것 | — | 없음(열쇠에 이 묶음이 들어 있어야 함 — 처음 받는 열쇠에는 없음) |

- 열쇠로 쓸 때는 열쇠에 이 묶음(글 다듬기)이 들어 있어야 합니다. 처음 받는 열쇠에는 없으니 신청할 때 함께 적어 주세요. 손님으로는 바로 씁니다.
- 열쇠 신청: `onmunseo.key [at] gmail.com`(제목에 「On 문서 열쇠 신청」). 쓰려는 곳(개인·업무·연구 등)과 필요한 묶음(예: On 글 다듬기)을 적어 주세요.
- 틀린 열쇠·끊긴 열쇠는 **401**, 열쇠에 없는 묶음은 **403** 입니다. 짧은 사이에 몰아 부르면 「너무 자주 요청」(429)이 나니 1분쯤 뒤 다시 부릅니다.
- 열쇠를 주소 뒤에 붙이지 마세요. 대화 기록과 접속 기록에 남습니다.

## 안전

1. **남기지 않습니다.** 보낸 글은 처리가 끝나면 버리고, 창구 기록에는 열쇠 별칭·도구 이름·보낸 크기·걸린 시간·성공 여부만 남깁니다.
2. **AI 없이 규칙으로 고칩니다.** 같은 글이면 같은 결과입니다.
3. **숫자는 바꾸지 않습니다.** 숫자가 바뀌는 고침은 하지 않고, 바꾼 뒤 숫자·이름 같은 말을 원문과 다시 맞대어 어긋난 문장은 원문 그대로 두며, 결과의 `check` 에 잃은 것을 적습니다.
4. **공개 자료와 본인 자료만 보내 주세요.** 기관 내부 문서의 글은 올리지 마세요.

보안 문제는 [SECURITY.md](SECURITY.md)에 적힌 곳으로 알려 주세요.

## 알아 둘 점

- **무료 시범 서비스입니다.** 기능·하루 몫·주소는 바뀌거나 멈출 수 있습니다. 바뀌면 [CHANGELOG.md](CHANGELOG.md)에 적습니다.
- **결과는 참고용입니다.** 결재 전에 사람이 확인해 주세요.
- 인터넷으로만 씁니다. 업무망(폐쇄망)에서는 쓸 수 없습니다.
- 앱마다 메뉴 이름과 판이 달라 화면이 위 설명과 다를 수 있습니다. 안 되면 [SUPPORT.md](SUPPORT.md)를 봐 주세요.

## 이용 조건·개인정보·고지

- 결과를 대량으로 모으거나 다른 AI 모델 학습에 쓰는 것은 금지합니다. 자동화로 남용하면(한도를 넘기려 열쇠 여러 개 쓰기, 쉬지 않고 계속 부르기, 결과 긁어 모으기 등) 미리 알리지 않고 열쇠를 끊습니다. 엔진·규칙·코드를 꺼내 가거나 거꾸로 풀어내는 것은 허락하지 않습니다.
- 요약은 [MCP 안내의 이용 조건](https://github.com/on-munseo/on-munseo.github.io/blob/main/MCP.md#5-이용-조건약관-요약), 전문은 [이용약관](https://onmunseo.kr/terms)·[개인정보 처리방침](https://onmunseo.kr/privacy)에 있습니다.
- 「한글」·「한컴」·「HWP」·「HWPX」는 주식회사 한글과컴퓨터의 상표(등록상표 포함)이며, On 문서는 한글과컴퓨터와 제휴·후원·승인 관계가 없는 독립 서비스입니다.
- Claude·ChatGPT·Cursor·VS Code 등 이름은 각 권리자의 것이며 연결 방법을 알리려고만 씁니다. 고지 전문은 [MCP 안내의 고지](https://github.com/on-munseo/on-munseo.github.io/blob/main/MCP.md#고지)에 있습니다.

## 말 풀이

- **MCP** — AI 도구가 바깥 도구를 부르는 공개 규약(Model Context Protocol). 이 주소를 MCP 서버로 붙이면 AI 가 대화 안에서 이 도구들을 부릅니다.
- **원격 MCP 서버** — 내 컴퓨터에 깔지 않고 인터넷 주소로 붙는 MCP 서버. 설치할 프로그램이 없습니다.
- **묶음 주소** — On 문서의 기능 하나만 담은 주소(`/mcp/text` 등). 전부는 `/mcp` 입니다.
- **열쇠** — On 문서가 주는 사용 권한 값. 하루 몫과 쓸 수 있는 묶음이 정해져 있습니다. 남에게 보이면 안 됩니다.
- **손님** — 열쇠 없이 쓰는 것. 도구 일부와 작은 하루 몫으로 바로 씁니다.
- **OAuth(로그인 창)** — 연결할 때 뜨는 On 문서 로그인 창에 열쇠를 넣는 방식. 앱에는 열쇠 대신 따로 만든 출입증이 갑니다.
- **개조식** — □ ○ - 기호와 「~함」「~임」 끝맺음으로 한 줄에 한 생각씩 적는 공문서 문체.
- **번역투 · 이중 피동 · 겹말** — 「~에 있어서」처럼 외국어를 옮긴 듯한 말 · 「되어지다」처럼 피동을 두 번 쓴 말 · 「가장 최적」처럼 뜻이 겹친 말.

## On 문서의 다른 묶음

| 제품 | 저장소 | 주소(앞에 `https://onmunseo.kr`) |
|---|---|---|
| **On 문서(전부)** | [on-munseo.github.io](https://github.com/on-munseo/on-munseo.github.io) — 웹 편집기와 MCP 전부 | `/mcp` |
| On 글꺼내기 | [on-text](https://github.com/on-munseo/on-text) | `/mcp/text` |
| On 결재점검 | [on-check](https://github.com/on-munseo/on-check) | `/mcp/check` |
| On 개인정보 가리기 | [on-mask](https://github.com/on-munseo/on-mask) | `/mcp/mask` |
| On HWPX 만들기 | [on-hwpx](https://github.com/on-munseo/on-hwpx) | `/mcp/hwpx` |
| On 공문서 쓰기 | [on-gov](https://github.com/on-munseo/on-gov) | `/mcp/gov` |
| On 글 다듬기 | 이 저장소 | `/mcp/tidy` |
| On 근거 | [on-geungeo](https://github.com/on-munseo/on-geungeo) | `/mcp/law` |
| On폭 글꼴 | [napurrin/onpok-fonts](https://github.com/napurrin/onpok-fonts) — 무료 글꼴(SIL OFL 1.1) | — |

## 라이선스

글은 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ko), 설정 파일(`server.json`·`.claude-plugin/`·`plugin/`)은 MIT 입니다. 「On 문서」·「On 글 다듬기」 이름과 로고는 이 허락에 들어가지 않습니다. 서비스의 엔진·서버 코드는 이 저장소에 없고 공개하지 않습니다. 전문은 [LICENSE](LICENSE)에 있습니다.

---

만든 사람: [napurrin](https://github.com/napurrin) — 코코에게 배우면서 만들고 고칩니다.
