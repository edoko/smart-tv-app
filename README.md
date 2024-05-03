# Smart TV App
TODO

## Requirements
1. node 18.x >
2. pnpm
3. Intel VT-x/HAXM 지원
3-1. AMD의 가상화는 tizen에서 지원하지 않음. 리눅스에서 구동해야 함.
4. webOS SDK / Simulator
5. tizen studio/sdk
6. tizen certificate (빌드 시 인증서 필요)


## webOS
1. webOS cli 설치
```
npm install -g @webos-tools/cli
```
2. Simulator 앱 설치
3. 빌드 시 `/appinfo.json` 파일 필요
3. Simulator 앱 테스트
```
pnpm run run:webos
```
4. 앱 빌드
```
pnpm run build:webos
```

## Tizen
1. SDK/Simulator 설치
2. 빌드 시 필요한 인증서 발급
3. 빌드 시 `/config.xml` 파일 필요
4. 앱 빌드
```
pnpm run build:tizen
```

## References
- webOS keycodes: https://webostv.developer.lge.com/develop/guides/magic-remote
- tizen Smart TV keycodes: https://developer.samsung.com/smarttv/develop/guides/user-interaction/remote-control.html
- keycode(MDN): https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#non-printable_keys_function_keys

주요 버튼들은 뒤로가기 제외하고는 keycode가 동일함

### For tizen
- tizen의 경우 2016년 모델 이후는 앱 실행 속도를 위해 `registerKeyBatch()`를 사용해야 함
```
// 앱 열자마자 tizen인지 판단하고 아래를 먼저 실행하면 될듯
tizen.tvinputdevice.registerKeyBatch(['MediaPlay', 'MediaPause', ...])
```
- 위 메서드를 실행하려면 `config.xml`에서 미리 권한 추가 필요함
```
<tizen:privilege name='http://tizen.org/privilege/tv.inputdevice'>
</tizen:privilege>
```

|       | webOS | tizen |
| ------------ | ----- | ----- |
| Left                     | 37         | 37         |
| Up                       | 38         | 38         |
| Right                    | 39         | 39         |
| Down                     | 40         | 40         |
| OK/Enter                 | 13         | 13         |
| Back                     | 461        | 10009      |
| Play                     | 415        | 415        |
| Pause                    | 19         | 19         |
| Stop                     | 413        | 413        |
| Fast-forward             | 417        | 417        |
| Rewind                   | 412        | 412        |


## TO-DO
- [x] 방향키 동작
  - [x] webOS
  - [ ] tizen 
  - [x] browser
- [ ] 확인/뒤로가기 동작
  - [ ] webOS
  - [ ] tizen 
  - [x] browser
- [x] 사이드바
  - [x] 사이드바 이동 시 우측 화면 표시
  - [x] 열림/닫힘 기본 동작
  - [ ] 열림/닫힘을 명확히 구분 짓기
- [x] 페이지 이동
  - [x] 진입
  - [x] 뒤로가기
- 백버튼으로 앱 종료
  - [ ] webOS
  - [ ] tizen
- [x] 페이지 구조는 HashRouter 이용 (빠른 동작. 그리고 URL 구조는 보이는게 아니니 대충)
  - [x] 홈 화면: `/main/home`
  - [x] 프로그램 목록 화면: `/main/programs`
  - [x] 프로그램 상세 화면: `/detail/:programId`
- [ ] 영상
  - [ ] 플레이어 구현
  - [ ] 영상 재생
  - [ ] 진행 프로그레스바 표시
  - [ ] 영상: 재생/일시정지/앞으로가기/뒤로가기 버튼 및 동작 구현
    - [ ] webOS
    - [ ] tizen 
    - [ ] browser
  - [ ] 백버튼 시 영상 종료 후 이전 화면 이동(또는 오버레이여서 닫기)
- [ ] Coverr API 최소한으로 연동
  - [x] 최초 진입 스플래시 화면 구현
    - [x] 진입할 때 발급받은 API 토큰을 로컬 스토리지에 저장
  - [ ] 홈 화면
    - [ ] 몰?루
  - [ ] 프로그램 목록 화면 (추천 동영상 목록)
    - [ ] 목록 보여줄 UI 구현 (카테고리별 가로로 나열 or 걍 임의로 가로로 한두줄만 나열)
    - [ ] 프로그램 목록 API 연동
  - [ ] 프로그램 상세 화면
    - [ ] 프로그램 상세 API 연동
    - [ ] 기본적인 정보만 표시 (이름, 설명, 썸네일 이미지 정도?)
    - [ ] 영상 목록 표시
    - [ ] 누르면 플레이어로 표시 (오버레이?)
- [ ] 알 수 없는 에러일 때 페이지? 가 필요한가, 아니면 모달로 대체
- [ ] 스타일링
- [ ] 리팩토링

<!-- - [ ] 세션 체크 - 쿠키 or 로컬 스토리지
  - [ ] 성공: 홈 화면 이동
  - [ ] 실패: 로그인 화면 이동
- [ ] 로그인 화면 구현
- [ ] 계정 정보 미리 입력해두고 버튼 누르면 바로 로그인하는 형태로 구현 (화면에 버튼 하나만)
- [ ] 로그인 성공하면 홈 화면 이동
- [ ] 로그인 실패하면 에러 모달? 표시 -->