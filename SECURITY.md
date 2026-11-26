# 보안 문제 알리기 · Security

[한국어](#한국어) · [English](#english)

## 한국어

### 알리는 곳

보안 문제는 공개 이슈에 자세히 쓰지 말고 `onmunseo.key [at] gmail.com` 으로 보내 주세요(제목에 「On 문서 보안」). 재현에 필요한 최소한만, 지어낸 자료로 적어 주세요. 열쇠·실제 문서·개인정보는 보내지 마세요. 고장·질문은 [이슈](https://github.com/on-munseo/on-munseo.github.io/issues)에 남깁니다.

### 무엇이 보안 문제인가

- 열쇠 없이 열쇠 전용 도구나 기능을 쓸 수 있음, 남의 열쇠·출입증으로 쓸 수 있음
- 보낸 문서·글·결과가 서버에 남거나 다른 사람에게 보임
- 결과 파일 주소가 15분이 지나도 열림
- 보안 등급 표시(대외비 등)가 글로 적힌 문서가 허용 없는 열쇠나 손님에게 처리됨
- 하루 몫·크기 한도를 넘어 쓸 수 있음
- 결과에 공개 자료 밖의 내용(서버 설정·다른 사람의 자료 등)이 나옴

### 시험할 때 지켜 주세요

- 서버를 멈추게 할 만큼 많이 부르거나 압축 폭탄 같은 파일을 보내지 마세요. 한도는 안전 장치이며 풀지 않습니다.
- 남의 문서·개인정보로 시험하지 마세요.

### 받는 판

운영 서버는 하나(`https://onmunseo.kr`)입니다. 고치면 [CHANGELOG.md](CHANGELOG.md)에 적습니다(자세한 내용은 고친 뒤에).

## English

### Where to report

Please do not post details of a security problem in a public issue. E-mail `onmunseo.key [at] gmail.com` with the subject “On 문서 보안”. Include only what is needed to reproduce it, with made-up data; never send keys, real documents or personal data. Ordinary bugs and questions go to the [issues](https://github.com/on-munseo/on-munseo.github.io/issues).

### What counts

- Using key-only tools or features without a key, or with someone else’s key or pass
- Documents, text or results being kept on the server or shown to others
- A result link that still opens after 15 minutes
- A document with a written security marking (such as “대외비”) being processed for a guest or a key without that permission
- Getting around the daily quota or size limits
- Results that contain anything beyond public data (server settings, other users’ data)

### When testing

- Do not send enough calls to stop the server, or files such as zip bombs. The limits are safety measures and will not be lifted.
- Do not test with other people’s documents or personal data.

### Supported version

There is one live server (`https://onmunseo.kr`). Fixes are noted in [CHANGELOG.md](CHANGELOG.md) (details after the fix).
