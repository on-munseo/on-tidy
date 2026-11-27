#!/usr/bin/env node
// On 문서 내 PC 판(npm on-munseo-local)을 띄우는 작은 띄우개 — 이 플러그인의 on-local 서버가 부름
// 윈도우는 npx 가 npx.cmd 라서 바로 띄우지 못할 때가 있어(cmd /c 몫), node 로 한 번 거쳐 띄운다. 맥·리눅스는 npx 를 그대로 띄운다.
// 표준 입출력은 그대로 이어 주고(stdio: inherit), 띄운 것이 끝나면 같은 끝 코드로 끝난다. 네트워크는 npx 가 꾸러미를 받을 때만 쓴다.
import { spawn } from 'node:child_process';

const win = process.platform === 'win32';
// 판 고정(11-27) — 띄울 판을 적어 둔다. @latest 로 띄우면 npm 에 새 판이 오르는 대로(문제 있는 판이라도) 다음 실행에 그대로 뜬다.
// 이 플러그인의 판(plugin.json version)을 올릴 때만 함께 바뀐다(플러그인 판 = 띄우는 내 PC 판의 판)
const SPEC = 'on-munseo-local@0.2.1';
// 이 플러그인은 내 PC 판 도구 가운데 글 다듬기 도구만 켠다(ONDOC_LOCAL_TOOLS=tidy — 제품 플러그인을 여럿 깔아도 도구가 겹치지 않게, on-munseo-local 0.2.1 부터). 쓰는 사람이 이미 정해 두었으면 그것을 따른다
const env = { ...process.env, ONDOC_LOCAL_TOOLS: process.env.ONDOC_LOCAL_TOOLS || 'tidy' };
const child = spawn(win ? 'npx.cmd' : 'npx', ['-y', SPEC], { stdio: 'inherit', shell: win, env });
child.on('error', (e) => { process.stderr.write(`on-munseo-local 을 띄우지 못했습니다(Node.js 20 이상이 있어야 함): ${e.message}\n`); process.exit(1); });
child.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => { try { child.kill(s); } catch {} });
