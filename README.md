# Test TV App
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
