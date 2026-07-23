/**
 * 가격표 상단 안내 (lead · note · price)
 */
window.PRICE_INTRO = {
  fan: {
    lead: "Warudo에서 사용할 수 있는 기본 팬 캐릭터를 제작해 드립니다.",
    note: "캐릭터의 복잡도에 따라 금액이 달라질 수 있습니다.",
    price: "50,000~"
  },
  prop: {
    lead: "Warudo에서 사용할 수 있는 기본 소품을 제작해 드립니다.",
    note: "소품의 복잡도에 따라 금액이 달라질 수 있습니다.",
    price: "30,000~"
  },
  "api-basic": {
    lead: "Warudo에서 사용할 수 있는 기본 API를 제작해 드립니다.",
    note: "아래 금액은 기본 API 고정 가격입니다.",
    price: "10,000"
  },
  "api-custom": {
    lead: "Warudo에서 사용할 수 있는 커스텀 API를 제작해 드립니다.",
    note: "요청하신 연출에 따라 금액이 달라질 수 있습니다.",
    price: "50,000~"
  }
};

window.PRICE_PAGE = {
  fan: { title: "팬 캐릭터", docTitle: "Rabbi API · 팬 캐릭터" },
  prop: { title: "소품", docTitle: "Rabbi API · 소품" },
  "api-basic": { title: "기본 API", docTitle: "Rabbi API · 기본 API" },
  "api-custom": { title: "커스텀 API", docTitle: "Rabbi API · 커스텀 API" }
};

/**
 * 가격표 데이터
 * image · youtubeId → 카드 상단 미디어 (API) 또는 슬라이더 (fan · prop)
 */
window.PRICE_ITEMS = {
  fan: [
    {
      title: "오리지널 팬 캐릭터",
      desc: "직접 제작한 오리지널 팬 캐릭터입니다.",
      price: "50,000~",
      image: "images/price/original-fan-character.png"
    },
    {
      title: "커미션 팬 캐릭터",
      desc: "커미션으로 제작한 팬 캐릭터입니다.",
      price: "50,000~",
      image: "images/price/commission-fan-character.png"
    }
  ],
  prop: [
    {
      title: "오리지널 망치",
      desc: "커미션을 받아 제작한 망치 소품입니다.",
      price: "30,000~",
      image: "images/price/original-hammer.png"
    },
    {
      title: "악마 망치",
      desc: "직접 제작한 악마 테마 망치 소품입니다.",
      price: "30,000~",
      image: "images/price/devil-hammer.png"
    }
  ],
  "api-basic": [
    {
      title: "던지기",
      desc: "캐릭터에게 물건을 던지거나 물을 쏠 수 있습니다.",
      price: "10,000",
      images: [
        "images/price/api-throw-single.png",
        "images/price/api-throw-multi.png",
        "images/price/api-throw-water.png",
        "images/price/api-throw-fly.png"
      ],
      options: ["표정 변경 O", "파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O"]
    },
    {
      title: "자동 잠자기",
      desc: "자리를 비우면 캐릭터가 잠드는 모션을 취합니다.",
      price: "20,000",
      image: "images/price/api-auto-sleep.png",
      options: [
        "파티클 제거 / 변경 O"
      ]
    },
    {
      title: "붙이기",
      desc: "원하는 물건이 날아와 캐릭터의 몸에 달라붙습니다.",
      price: "20,000",
      image: "images/price/api-attach.png",
      options: ["파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O"]
    },
    {
      title: "머리쾅",
      desc: "직접 제작한 소품이 캐릭터의 머리를 강타합니다.",
      price: "20,000",
      image: "images/price/api-head-bonk.png",
      options: ["표정 변경 O", "파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O"]
    },
    {
      title: "와르르",
      desc: "물건이 쏟아지거나 캐릭터가 파묻히는 연출입니다.",
      price: "20,000",
      images: [
        "images/price/api-pile-bury.png",
        "images/price/api-pile-pour.png"
      ],
      options: ["파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O"]
    },
    {
      title: "윙크",
      desc: "캐릭터가 윙크하는 연출입니다.",
      price: "20,000",
      image: "images/price/api-wink.png",
      options: ["파티클 제거 / 변경 O"]
    }
  ],
  "api-custom": [
    {
      title: "API 제작",
      desc: "요청하신 방향으로 연출을 커스텀해 드립니다.",
      price: "50,000~",
      image: "images/price/api-custom.png",
      options: ["파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O"]
    },
    {
      title: "팬 캐릭터 뽀뽀",
      desc: "팬 캐릭터가 다가가 캐릭터의 몸 한 부위에 입술자국을 남깁니다.",
      price: "50,000~",
      image: "images/price/api-kiss.png",
      options: [
        { label: "부위 추가", price: "+10,000~", quantity: true },
        "파티클 제거 / 변경 O",
        "PROP 변경 O",
        "상호작용 속도 변경 O"
      ]
    }
  ]
};

window.PRICE_SLIDER_INTERVAL = 5000;
