window.SITE = {
  name: "Rabbi",
  title: "Rabbi API",
  tagline: "Warudo API · 팬 캐릭터 제작",
  links: [
    {
      label: "Discord",
      desc: "@im_rabbi",
      href: "https://discord.gg/T5TjUyMx",
      external: true
    },
    {
      label: "Rabbi",
      desc: "x.com/laebi545779",
      href: "https://x.com/laebi545779",
      external: true
    }
  ]
};

window.NAV = [
  { id: "intro", label: "소개", href: "index.html" },
  { id: "order", label: "주문서 작성", href: "order.html" },
  { id: "notice", label: "안내사항", href: "notice.html" },
  {
    id: "price",
    label: "가격표",
    children: [
      { id: "price-fan", label: "팬 캐릭터", href: "price-fan.html" },
      { id: "price-prop", label: "소품", href: "price-prop.html" },
      {
        id: "price-api",
        label: "API",
        children: [
          { id: "price-api-basic", label: "기본 API", href: "price-api-basic.html" },
          { id: "price-api-custom", label: "커스텀 API", href: "price-api-custom.html" }
        ]
      }
    ]
  },
  {
    id: "portfolio",
    label: "포트폴리오",
    children: [
      { id: "portfolio-fan", label: "팬 캐릭터", href: "portfolio-fan.html" },
      { id: "portfolio-prop", label: "소품", href: "portfolio-prop.html" },
      { id: "portfolio-api", label: "API 연동", href: "portfolio-api.html" }
    ]
  },
  {
    id: "warudo",
    label: "Warudo API",
    children: [
      { id: "warudo-basic", label: "파일 세팅 방법", href: "warudo-basic.html" },
      { id: "warudo-api", label: "API 연동", href: "warudo-api.html" }
    ]
  }
];
