/**
 * 주문서 설정
 */
window.ORDER_CONFIG = {
  privateFee: 20000,
  privateLabel: "비공개 (+20,000원)",
  contacts: {
    discord: { label: "Discord (@im_rabbi)", href: "index.html" },
    twitter: { label: "트위터 DM", href: "https://x.com/laebi545779", external: true }
  },
  platforms: [
    { id: "soop", label: "SOOP(숲)" },
    { id: "chzzk", label: "치지직" },
    { id: "toonation", label: "투네이션" },
    { id: "other", label: "기타 / 없음" }
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
