/**
 * 가격표 상단 안내 (lead · price)
 */
window.PRICE_INTRO = {
  fan: {
    lead: "Warudo에서 사용할 수 있는 기본 팬 캐릭터를 제작해 드립니다.",
    price: "50,000~"
  },
  prop: {
    lead: "Warudo에서 사용할 수 있는 기본 소품을 제작해 드립니다.",
    price: "30,000~"
  },
  "api-basic": {
    lead: "Warudo에서 사용할 수 있는 기본 API를 제작해 드립니다.",
    price: "10,000"
  },
  "api-custom": {
    lead: "Warudo에서 사용할 수 있는 커스텀 API를 제작해 드립니다.",
    price: "50,000~"
  },
  "api-prop": {
    lead: [
      "자체적으로 제작한 PROP 목록입니다. API 구매시 무료로 제공되며.",
      "API 세팅없이 PROP만 별도 구매도 가능합니다."
    ],
    price: "5,000"
  },
  "api-warudo": {
    lead: [
      "다른 플랫폼·파일 형식의 모델·소품을 Warudo에서 사용할 수 있도록 변환해 드립니다.",
      "와루도 일반에서 쓰던 소품을 와루도 PRO에서 사용할 수 있도록 변환합니다."
    ],
    price: "가격 문의"
  }
};

window.PRICE_PAGE = {
  fan: { title: "팬 캐릭터", docTitle: "Rabbi API · 팬 캐릭터" },
  prop: { title: "소품", docTitle: "Rabbi API · 소품" },
  "api-basic": { title: "기본 API", docTitle: "Rabbi API · 기본 API" },
  "api-custom": { title: "커스텀 API", docTitle: "Rabbi API · 커스텀 API" },
  "api-prop": { title: "소품(PROP)", docTitle: "Rabbi API · 소품(PROP)" },
  "api-warudo": { title: "와루도 변환", docTitle: "Rabbi API · 와루도 변환" }
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
      image: "images/price/devil-hammer.jpg"
    }
  ],
  "api-basic": [
    {
      title: "던지기",
      desc: "캐릭터에게 물건을 던지거나 물을 쏠 수 있습니다.",
      price: "10,000",
      variants: [
        {
          label: "한 개 던지기",
          desc: "캐릭터에게 물건을 한 개 던질 수 있습니다.",
          image: "images/price/api-throw-single.png"
        },
        {
          label: "여러 개 던지기",
          desc: "캐릭터에게 물건을 여러 개 던질 수 있습니다.",
          image: "images/price/api-throw-multi.png"
        },
        {
          label: "물 쏘기",
          desc: "캐릭터에게 물을 쏠 수 있습니다.",
          image: "images/price/api-throw-water.png"
        },
        {
          label: "날아가기",
          desc: "캐릭터가 물건을 맞고 멀리 날아갑니다.",
          image: "images/price/api-throw-fly.png"
        }
      ],
      options: ["표정 변경 O", "파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O", "사운드 추가 O"]
    },
    {
      title: "붙이기",
      desc: "원하는 물건이 날아와 캐릭터의 몸에 달라붙습니다.",
      price: "20,000",
      image: "images/price/api-attach.png",
      options: ["파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O", "사운드 추가 O"]
    },
    {
      title: "머리쾅",
      desc: "직접 제작한 PROP이 캐릭터의 머리를 강타합니다.",
      price: "20,000",
      variants: [
        {
          label: "",
          desc: "직접 제작한 PROP이 캐릭터의 머리를 강타합니다.",
          image: "images/price/api-head-bonk.png"
        },
        {
          label: "",
          desc: "망치로 캐릭터의 머리를 강타합니다.",
          image: "images/price/api-head-bonk-devil.png"
        }
      ],
      options: ["표정 변경 O", "파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O", "사운드 추가 O"]
    },
    {
      title: "와르르",
      desc: "물건이 쏟아지거나 캐릭터가 파묻히는 연출입니다.",
      price: "20,000",
      variants: [
        {
          label: "파묻히기",
          desc: "쏟아지는 물건들에 캐릭터가 파묻힙니다.",
          image: "images/price/api-pile-bury.png"
        },
        {
          label: "쏟아지기",
          desc: "캐릭터에게 물건들이 쏟아집니다.",
          image: "images/price/api-pile-pour.png"
        }
      ],
      options: ["파티클 제거 / 변경 O", "PROP 변경 O", "상호작용 속도 변경 O", "사운드 추가 O"]
    },
    {
      title: "윙크",
      desc: "캐릭터가 눈을 감을 경우, 자동으로 눈가에 윙크 파티클이 출력됩니다.",
      price: "20,000",
      image: "images/price/api-wink.png",
      options: ["파티클 제거 / 변경 O", "사운드 추가 O"]
    },
    {
      title: "자동 잠자기",
      desc: "자리를 비우면 캐릭터가 잠드는 모션을 취합니다.",
      price: "20,000",
      image: "images/price/api-auto-sleep.png",
      options: [
        "파티클 제거 / 변경 O",
        "사운드 추가 O"
      ]
    }
  ],
  "api-custom": [
    {
      title: "API 제작",
      desc: "요청하신 방향으로 연출을 커스텀해 드립니다.",
      price: "가격 문의",
      image: "images/price/api-custom.png"
    },
    {
      title: "팬 캐릭터 뽀뽀",
      desc: "팬 캐릭터가 다가가 캐릭터의 몸 한 부위에 입술자국을 남깁니다.",
      price: "50,000~",
      image: "images/price/api-kiss.png",
      options: [
        "부위 추가 O",
        "파티클 제거 / 변경 O",
        "PROP 변경 O",
        "상호작용 속도 변경 O",
        "사운드 추가 O"
      ]
    }
  ],
  "api-prop": [],
  "api-warudo": [
    {
      title: "와루도 변환",
      desc: "모델·소품·블루프린트 등을 Warudo에서 사용 가능한 형식으로 변환합니다.",
      price: "가격 문의"
    }
  ]
};

window.PROP_CATALOG = [
  {
    category: "망치",
    items: [
      {
        title: "오리지널 망치",
        image: "images/price/original-hammer.png"
      },
      {
        title: "악마 망치",
        image: "images/price/devil-hammer.jpg"
      }
    ]
  },
  {
    category: "소품",
    items: [
      {
        title: "100T 무게추",
        image: "images/price/prop-100t-weight.jpg"
      },
      {
        title: "치지직 이모티콘",
        image: "images/price/prop-chzzk-emote.png"
      }
    ]
  }
];

window.PRICE_SLIDER_INTERVAL = 5000;
