# Rabbi API

Warudo API 연동 및 팬 캐릭터 제작 작업물을 정리하는 정적 웹사이트입니다.

## 사이트 주소

배포 후: https://rabbbibot.github.io/Rabbi_API/

## 구조

- **소개** — 프로필 및 연락처
- **안내사항** — 작업 범위 및 이용 안내
- **포트폴리오** — 팬 캐릭터, API 연동, 기타 작업물
- **Warudo API** — 기본 설정, API 연동, OBS, 트리거 가이드
- **팁** — 모델 셋팅, API 활용, 외부 프로그램, 문제 해결

## 콘텐츠 수정

| 파일 | 내용 |
|------|------|
| `js/site-config.js` | 사이트 이름, 연락처, 메뉴 |
| `js/portfolio-items.js` | 포트폴리오 영상 데이터 |
| `js/tip-items.js` | Warudo API / 팁 페이지 내용 |

## 로컬 미리보기

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

브라우저에서 http://localhost:8080 접속
