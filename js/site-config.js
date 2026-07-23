window.SITE = {
  name: "Rabbi",
  title: "Rabbi API",
  tagline: "Warudo API · 팬 캐릭터 제작",
  icon: "icon.webp",
  links: [
    {
      label: "GitHub",
      desc: "github.com/rabbbibot",
      href: "https://github.com/rabbbibot",
      external: true
    },
    {
      label: "Discord",
      desc: "@im_rabbi",
      href: "#"
    },
    {
      label: "X (Twitter)",
      desc: "x.com/laebi545779",
      href: "https://x.com/laebi545779",
      external: true
    },
    {
      label: "Email",
      desc: "이메일을 입력해주세요",
      href: "mailto:"
    }
  ]
};

window.NAV = [
  { id: "intro", label: "소개", href: "index.html" },
  { id: "notice", label: "안내사항", href: "notice.html" },
  {
    id: "portfolio",
    label: "포트폴리오",
    children: [
      { id: "portfolio-fan", label: "팬 캐릭터", href: "portfolio-fan.html" },
      { id: "portfolio-api", label: "API 연동", href: "portfolio-api.html" }
    ]
  },
  {
    id: "warudo",
    label: "Warudo API",
    children: [
      { id: "warudo-basic", label: "기본 설정", href: "warudo-basic.html" },
      { id: "warudo-api", label: "API 연동", href: "warudo-api.html" }
    ]
  }
];
