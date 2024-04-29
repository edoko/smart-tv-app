# Smart TV App
TODO

## Requirements
1. node 18.x >
2. pnpm
3. webOS SDK / Simulator
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
