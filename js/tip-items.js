window.TIP_ITEMS = {
  "warudo-basic": [
    {
      title: "블루프린트란?",
      html: `
        <p>블루프린트는 Warudo에서 <strong>「어떤 일이 일어나면, 무엇을 할지」</strong>를 정하는 연출 설정입니다.</p>
        <p>예를 들어 키를 누르면 표정이 바뀌거나, API 호출 시 소품이 날아오는 동작 등을 블루프린트로 만들 수 있습니다. 제가 전달드린 설정 파일도 블루프린트 형태로 불러와 사용합니다.</p>
      `
    },
    {
      title: "블루프린트 불러오기 (파일)",
      html: `
        <ol>
          <li>Warudo 에디터를 실행합니다.</li>
          <li>왼쪽 탭에서 <strong>블루프린트(σ 아이콘)</strong> 탭을 엽니다.</li>
          <li>상단 도구 모음에서 <strong>Import Blueprint From File</strong> 버튼을 클릭합니다.</li>
          <li>전달받은 <strong>.json</strong> 블루프린트 파일을 선택합니다.</li>
          <li>목록에 블루프린트 이름이 추가되면 불러오기가 완료된 것입니다.</li>
        </ol>
        <p class="notice-inline-note">같은 방법으로 여러 블루프린트 파일을 계속 추가할 수 있습니다.</p>
      `
    },
    {
      title: "블루프린트 불러오기 (클립보드)",
      html: `
        <ol>
          <li>블루프린트 코드(JSON)를 복사합니다.</li>
          <li>블루프린트 탭 상단에서 <strong>Import Blueprint From Clipboard</strong>를 클릭합니다.</li>
          <li>클립보드 내용이 블루프린트로 등록됩니다.</li>
        </ol>
        <p class="notice-inline-note">Discord 등으로 코드만 받은 경우 이 방법을 사용하면 됩니다.</p>
      `
    },
    {
      title: "블루프린트 적용하기",
      html: `
        <ol>
          <li>블루프린트 목록에서 불러온 항목을 클릭해 선택합니다.</li>
          <li>이름 옆 <strong>눈(eye) 아이콘</strong>이 켜져 있는지 확인합니다. 눈에 빗금이 그어져 있으면 비활성 상태이므로 클릭해 켜주세요.</li>
          <li>노드 에디터에서 단축키, API 조건, 연결된 소품 등 설정값을 확인·수정합니다.</li>
          <li>씬으로 돌아가 단축키나 API 동작을 테스트해 정상 작동하는지 확인합니다.</li>
        </ol>
        <p>블루프린트는 씬마다 따로 저장됩니다. 다른 씬에서도 쓰려면 같은 파일을 다시 불러오거나, <strong>Export Blueprint To File</strong>로 내보낸 뒤 복사해 사용하세요.</p>
      `
    }
  ],
  "warudo-api": [
    {
      title: "SOOP · 치지직 API 연동",
      html: `
        <p>사용하는 플랫폼 플러그인을 구독해 주세요.</p>
        <div class="tip-platform-grid">
          <section class="tip-platform-card tip-platform-card--soop">
            <h4 class="tip-platform-title">SOOP(숲)</h4>
            <a class="tip-platform-link" href="https://steamcommunity.com/workshop/browse/?appid=2079120&searchtext=SOOP" target="_blank" rel="noopener noreferrer">창작마당</a>
          </section>
          <section class="tip-platform-card tip-platform-card--chzzk">
            <h4 class="tip-platform-title">치지직</h4>
            <a class="tip-platform-link" href="https://steamcommunity.com/workshop/browse/?appid=2079120&searchtext=Chzzk" target="_blank" rel="noopener noreferrer">창작마당</a>
          </section>
        </div>
      `
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
