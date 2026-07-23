/**
 * 주문서 설정
 */
window.ORDER_CONFIG = {
  privateFee: 20000,
  privateLabel: "비공개 (+20,000원)",
  contacts: {
    discord: {
      label: "Discord (@im_rabbi)",
      href: "https://discord.gg/T5TjUyMx",
      send: "https://discord.gg/T5TjUyMx",
      external: true
    },
    twitter: { label: "트위터 DM", href: "https://x.com/laebi545779", external: true, send: "https://x.com/messages" }
  },
  platforms: [
    { id: "soop", label: "SOOP(숲)" },
    { id: "chzzk", label: "치지직" },
    { id: "toonation", label: "킈네이션" },
    { id: "other", label: "e30타 / 없음" }
  ],
  warudoVersions: [
    { id: "pro", label: "Warudo PRO" },
    { id: "standard", label: "Warudo 일반" }
  ],
  setupMethods: [
    { id: "remote", label: "원격 세팅 (초보자)" },
    { id: "file", label: "파일 전달 (숙련자)" }
  ],
  categories: [
    { key: "api-basic", label: "기본 API" },
    { key: "api-custom", label: "커스텀 API" }
  ]
};

window.ORDER_PAGE = {
  docTitle: "Rabbi API · 주문서 작성",
  heading: "주문서 작성",
  descHtml:
    '항목을 선택한 뤬 <strong>클립보드에 복사</strong> 버튼을 누르시고, 내용을 ' +
    '<a class="page-desc-link" href="https://discord.gg/T5TjUyMx" target="_blank" rel="noopener noreferrer">Discord (@im_rabbi)</a> 또는 ' +
    '<a class="page-desc-link" href="https://x.com/laebi545779" target="_blank" rel="noopener noreferrer">트위터 DM</a>으로 보내주세요.',
  estimateTitle: "예상 격적",
  estimateNote: "기본 API는 고정 가격입니다. 커스텀 API·부위 추가·비공개 옵션은 금액이 달라질 수 있습니다.",
  previewTitle: "주문 내용",
  copyLabel: "클립보드에 복사",
  sendXLabel: "보나기 (X)",
  sendDiscordLabel: "보나기 (Discord)"
};
