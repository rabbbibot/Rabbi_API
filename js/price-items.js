/**
 * 가격표 상단 안내 (lead · note · price)
 */
window.PRICE_INTRO = {
  fan: {
    lead: "와루도에서 사용할 수 있는 기본 팬 캐릭터를 제작해 드립니다.",
    note: "캐릭터의 복잡도에 따라 금액이 달라질 수 있습니다.",
    price: "50,000~"
  },
  prop: {
    lead: "와루도에서 사용할 수 있는 기본 소품을 제작해 드립니다.",
    note: "소품의 복잡도에 따라 금액이 달라질 수 있습니다.",
    price: "30,000~"
  },
  "api-basic": {
    lead: "와루도에서 사용할 수 있는 기본 API를 제작해 드립니다.",
    note: "API의 복잡도에 따라 금액이 달라질 수 있습니다.",
    price: "10,000~"
  },
  "api-custom": {
    lead: "와루도에서 사용할 수 있는 커스텀 API를 제작해 드립니다.",
    note: "요청하신 연출에 따라 금액이 달라질 수 있습니다.",
    price: "50,000~"
  }
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
      price: "10,000~",
      images: [
        "images/price/api-throw-single.png",
        "images/price/api-throw-multi.png",
        "images/price/api-throw-water.png",
        "images/price/api-throw-fly.png"
      ],
      options: ["물건 교체", "속도/표정 변경", "파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    },
    {
      title: "자동 잠자기",
      desc: "자리를 비우면 캐릭터가 잠드는 모션을 취합니다.",
      price: "20,000~",
      image: "images/price/api-auto-sleep.png",
      options: [
        { label: "Zzz 효과", order: false },
        "잠드는 속도 변경",
        "파티클 제거 / 변경 가능",
        "PROP 제거 / 변경 가능",
        "상호작용 속도 변경 가능"
      ]
    },
    {
      title: "붙이기",
      desc: "원하는 물건이 날아와 캐릭터의 몸에 달라붙습니다.",
      price: "20,000~",
      image: "images/price/api-attach.png",
      options: ["물건 교체", "날아오는 속도 변경", "파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    },
    {
      title: "머리쾅",
      desc: "직접 제작한 소품이 캐릭터의 머리를 강타합니다.",
      price: "20,000~",
      image: "images/price/api-head-bonk.png",
      options: ["물건 교체", "표정 변경", "파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    },
    {
      title: "와르르",
      desc: "물건이 쏟아지거나 캐릭터가 파묻히는 연출입니다.",
      price: "20,000~",
      images: [
        "images/price/api-pile-bury.png",
        "images/price/api-pile-pour.png"
      ],
      options: ["물건 교체", "속도 변경", "파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    },
    {
      title: "윙크",
      desc: "캐릭터가 윙크하는 연출입니다.",
      price: "20,000~",
      image: "images/price/api-wink.png",
      options: ["파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    }
  ],
  "api-custom": [
    {
      title: "API 제작",
      desc: "원하시는 연출에 맞춰 커스텀 API를 새로 제작합니다.",
      price: "50,000~",
      image: "images/price/api-custom.png",
      options: ["파티클 제거 / 변경 가능", "PROP 제거 / 변경 가능", "상호작용 속도 변경 가능"]
    },
    {
      title: "팬 캐릭터 뽀뽀",
      desc: "팬 캐릭터가 다가가 캐릭터의 몸 한 부위에 입술자국을 남깁니다.",
      price: "50,000~",
      image: "images/price/api-kiss.png",
      options: [
        { label: "부위 추가", price: "+10,000~", quantity: true },
        "파티클 제거 / 변경 가능",
        "PROP 제거 / 변경 가능",
        "상호작용 속도 변경 가능"
      ]
    }
  ]
};

window.PRICE_NOTE =
  "필요한 옵션만 골라 Discord(@im_rabbi) 또는 트위터 DM으로 문의해 주세요. 견적 확인 후 주문 · 원격 세팅 기본 제공.";

window.PRICE_SLIDER_INTERVAL = 5000;
