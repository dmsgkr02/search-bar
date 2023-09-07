# 원티드 프리온보딩 3주차 기업과제 - 개인

## 프로젝트 설명
검색창 구현 + 검색어 추천 기능 구현

## 프로젝트 실행 방법

```
# 프로젝트 clone
$ git clone https://github.com/dmsgkr02/search-bar.git

# npm 설치
$ npm install

# 프로젝트 실행
npm start

```

## 배포 링크
https://search-bar-khaki.vercel.app/

## 과제 목표
- API 호출별로 로컬 캐싱 구현
  - cacheStorage API 사용
  - cacheStroage에서 불러올 때 만기 시간을 확인하고 경과 시 새로운 요청 보냄
  - 다시 받아온 응답을 cacheStorage에 저장

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  - useDebounce 커스텀 훅을 사용함
  - setTimeout 과 useEffect를 사용하여서 useEffect 의존성이 변하면 setTimeout 함수를 호출
  - useEffect 리턴에 기존 setTimeout 함수를 clear 함
    
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
  - input에 keyDown 이벤트 핸들러에 함수 등록