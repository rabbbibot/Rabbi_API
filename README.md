# Rabbi API

**Warudo API · 팬 캐릭터 · 소품 커미션** 안내용 정적 웹사이트입니다.

> **저작권:** 본 프로젝트는 Rabbi의 커미션용 사이트입니다.  
> 무단 복제·재배포·템플릿 재사용을 금합니다. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

## 사이트 주소

https://rabbbibot.github.io/Rabbi_API/

## 구조

- **소개** — 프로필 및 연락처 (Discord, X)
- **주문서 작성** — API·옵션 선택, 견적 확인, 클립보드 복사 / Discord·X 보내기
- **안내사항** — 작업 범위, 세팅 방식, 원격 세팅 안내
- **가격표**
  - 팬 캐릭터 / 소품
  - API — 기본 API / 커스텀 API
- **포트폴리오** — 팬 캐릭터 / 소품 / API 연동
- **Warudo API** — 파일 세팅 방법, API 연동 (SOOP · 치지직)

## 콘텐츠 수정

| 파일 | 내용 |
|------|------|
| `js/site-config.js` | 사이트 이름, 연락처, 메뉴 |
| `js/price-items.js` | 가격표 · API 카드 · 옵션 태그 |
| `js/order-items.js` | 주문서 설정 (비공개 추가금, 플랫폼 등) |
| `js/portfolio-items.js` | 포트폴리오 영상 데이터 |
| `js/tip-items.js` | Warudo API 안내 페이지 |
| `images/price/` | API·가격표 카드용 이미지 |

## 로컬 미리보기

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

브라우저에서 http://localhost:8080 접속

## 연락

- Discord: https://discord.gg/T5TjUyMx (@im_rabbi)
- X: https://x.com/laebi545779

## 공개·배포 시 참고

- GitHub **Public** 저장소는 누구나 코드를 내려받을 수 있습니다. LICENSE는 법적 고지이며, 기술적으로 복사를 막지는 않습니다.
- 코드 유출을 줄이려면 저장소를 **Private**으로 두고, GitHub Pages는 Private 저장소에서도 배포할 수 있습니다. (GitHub 계정·플랜에 따라 다를 수 있음)
- 배포된 **웹페이지(HTML/CSS/JS)** 도 브라우저에서 소스 보기·저장이 가능합니다. 완전 차단은 어렵고, LICENSE·저작권 표기로 억지하는 방식이 일반적입니다.
