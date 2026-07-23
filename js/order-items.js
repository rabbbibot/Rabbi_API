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
    { id: "toonation", label: "투네이션" }
  ],
  platformOtherPlaceholder: "없음 · 기타 플랫폼 직접 입력",
  warudoVersions: [
    { id: "standard", label: "와루도 일반", default: true },
    { id: "pro", label: "Warudo PRO" }
  ],
  setupMethods: [
    { id: "remote", label: "원격 세팅 (초보자)" },
    { id: "file", label: "파일 전달 (숙련자)" }
  ],
  categories: [
    { key: "api-basic", label: "기본 API" },
    { key: "api-custom", label: "커스텀 API" }
  ],
  propPurchase: {
    title: "소품 (PROP)",
    unitPrice: 5000,
    unitLabel: "자체제작 PROP 구매 (API 구매시 무료 제공)"
  }
};

window.ORDER_PAGE = {
  docTitle: "Rabbi API · 주문서 작성",
  heading: "주문서 작성",
  descHtml:
    '항목을 선택한 뒤 <strong>주문서 복사</strong> 버튼을 누르시고, 내용을 ' +
    '<a class="page-desc-link" href="https://discord.gg/T5TjUyMx" target="_blank" rel="noopener noreferrer">Discord (@im_rabbi)</a> 또는 ' +
    '<a class="page-desc-link" href="https://x.com/laebi545779" target="_blank" rel="noopener noreferrer">트위터 DM</a>으로 보내 주세요.',
  estimateTitle: "예상 견적",
  estimateNote: "기본 API는 고정 가격입니다. 커스텀 API·비공개 옵션은 금액이 달라질 수 있습니다.",
  previewTitle: "주문 내용",
  copyLabel: "주문서 복사",
  copyDoneLabel: "복사 완료!",
  sendLabel: "보내기",
  sendXAriaLabel: "X로 보내기",
  sendDiscordAriaLabel: "Discord로 보내기",
  sendXIcon:
    '<svg class="order-action-btn__icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' +
    "</svg>",
  sendDiscordIcon:
    '<svg class="order-action-btn__icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>' +
    "</svg>"
};
