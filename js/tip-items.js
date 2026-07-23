window.TIP_ITEMS = {
  "warudo-basic": [
    {
      title: "Warudo 설치",
      html: `
        <ol>
          <li><a href="https://store.steampowered.com/app/2073550/Warudo/" target="_blank" rel="noopener noreferrer">Steam에서 Warudo 설치</a></li>
          <li>Warudo 실행 후 라이선스 활성화</li>
          <li>모델 불러오기 및 기본 트래킹 설정</li>
        </ol>
      `
    },
    {
      title: "기본 프로젝트 구성",
      text: "씬, 아바타, 카메라 등 기본 요소를 구성하는 방법입니다. 설명을 추가해주세요.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "모델 임포트",
      text: "Live2D / VRM 모델을 Warudo에 불러오는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "warudo-api": [
    {
      title: "API 활성화",
      html: `
        <ol>
          <li>Warudo 설정 열기</li>
          <li>API / Remote 섹션으로 이동</li>
          <li>API 서버 활성화</li>
          <li>포트 번호 및 인증 토큰 확인</li>
        </ol>
        <p>기본 API 문서: <a href="https://docs.warudo.app/" target="_blank" rel="noopener noreferrer">Warudo Docs</a></p>
      `
    },
    {
      title: "HTTP API 호출",
      text: "REST API를 통해 아바타 파라미터, 표정, 씬 전환 등을 제어하는 예시입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "WebSocket 연동",
      text: "실시간 이벤트 수신 및 양방향 통신 설정 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "warudo-obs": [
    {
      title: "OBS 캡처 설정",
      text: "Warudo 화면을 OBS에 연결하는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "Spout / NDI",
      text: "Spout 또는 NDI를 이용한 고품질 영상 전송 설정입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "방송 레이아웃",
      text: "API와 연동된 방송용 레이아웃 구성 예시입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "warudo-trigger": [
    {
      title: "트리거 기본",
      html: `
        <p>Warudo에서 트리거는 특정 조건(키 입력, API 호출, 타이머 등)에 반응하여 동작을 실행합니다.</p>
        <ul>
          <li>핫키 트리거</li>
          <li>API 트리거</li>
          <li>채팅 / 외부 이벤트 트리거</li>
        </ul>
      `
    },
    {
      title: "API 이벤트 연동",
      text: "외부 프로그램에서 API로 트리거를 실행하는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "표정 / 모션 자동화",
      text: "API와 트리거를 조합한 표정·모션 자동화 예시입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "tip-model": [
    {
      title: "캐릭터 디자인 가이드",
      text: "팬 캐릭터 제작 시 레이어 분리 및 Live2D 작업 팁입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "파라미터 설정",
      text: "Warudo에서 모델 파라미터를 매핑하는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "물리 / 액세서리",
      text: "머리카락, 옷, 액세서리 물리 연출 설정 팁입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "tip-api": [
    {
      title: "API 요청 예시",
      html: `
        <p>Warudo API를 호출하는 기본 예시입니다. 실제 엔드포인트는 Warudo 버전에 따라 다를 수 있습니다.</p>
        <div class="tip-path"><code>GET http://localhost:PORT/api/...</code></div>
      `
    },
    {
      title: "외부 스크립트 연동",
      text: "Python, Node.js 등에서 Warudo API를 호출하는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "채팅봇 / 알림 연동",
      text: "채팅 이벤트를 API로 Warudo에 전달하는 예시입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "tip-external": [
    {
      title: "OBS 연동",
      text: "OBS와 Warudo를 함께 사용하는 설정 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "Stream Deck",
      text: "Stream Deck에서 API를 호출해 Warudo를 제어하는 방법입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "기타 프로그램",
      text: "Spout, NDI, VTube Studio 등 외부 프로그램과의 연동 팁입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ],
  "tip-troubleshoot": [
    {
      title: "API 연결 안 됨",
      html: `
        <ul>
          <li>Warudo API 서버가 활성화되어 있는지 확인</li>
          <li>포트 번호가 올바른지 확인</li>
          <li>방화벽에서 해당 포트 허용</li>
          <li>인증 토큰이 요청에 포함되어 있는지 확인</li>
        </ul>
      `
    },
    {
      title: "모델 트래킹 문제",
      text: "트래킹이 불안정하거나 반응하지 않을 때 확인할 항목입니다.",
      youtubeId: "_dapV9Iy1kQ"
    },
    {
      title: "트리거 미작동",
      text: "트리거가 실행되지 않을 때 점검할 설정 목록입니다.",
      youtubeId: "_dapV9Iy1kQ"
    }
  ]
};
