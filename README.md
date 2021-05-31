# Art Seoul
# 웹사이트 주소
### 서버가 꺼져 있을 시에는 맨 밑의 시연영상을 참조해주세요 !
http://artseoul.shop/

![image](https://user-images.githubusercontent.com/79817676/115675644-bf48d300-a389-11eb-813d-384927d19e06.png)
![image](https://user-images.githubusercontent.com/79817676/115675771-de476500-a389-11eb-90c5-bd65735c1ad4.png)



## 프로젝트 소개
 ART Seoul은 서울안에 자신이 관람한 공연이나 전시 후기를 다른사람과 공유하는 사이트입니다. 후기를 남기실 때는 지도안에있는 마커를 클릭해서 남기실 수 있습니다. 자신이 다녀온 곳에 이미 마커가 찍혀있다면 해당 마커를 사용하시면되고, 마커가 찍혀있지 않으면 직접 마커를 만드셔서 사용하시면 됩니다. 지도에서 원하는 장소를 찾으실 때는 직접 지도를 사용하시거나 해당 주소를 입력을 해서 찾으실 수 있습니다! 공연정보 페이지에 들어가면 현재 서울에서 관람할 수 있는 공연 정보들을 카테고리별로 나눠서 제공하고있습니다.

## 프로젝트 기간
2021년 4월 9일 ~ 2021년 4월 22일

## 1. 작업자
  - 이총명 (backend-developer)
  - 원가연 (backend-developer)

  - 이대호 (front-end-developer)
  - 권규현 (front-end-developer) 
  

## 2. 기술스텍

Front | Back
---|---:
React | Node.js
Redux | Express 
Axios | MongoDB  

공통|
---|
Javascript , JWT , Rest API


## 3. API설명 
|기능|Method|URL| Request Params / Body|
|:---|:---:|:---:|:---:|
|구글 로그인|GET|/auth/google||
|데일리 질문 받기(3개)|GET|/card/daily|cardId, topic, contents, createdUser, available, profileImg, answerCount, otherProfileImg|
|답변쓰기|POST|/card| questionId, contents, isOpen |



## 4. 사용 라이브러리

라이브러리 | 설명
---|:---:
sendgrid/mail | 회원가입 이메일 전송
axios | HTTP 통신
bcrypt | 비밀번호 암호화 
cors | 교차 리소스 공유
dotenv | 포트번호, DB비밀번호 등 암호화
express | 서버
jsonwebtoken | 회원가입 작동 방식
moment | 날짜 포맷 설정
moment-timezone,| 날짜 포맷 설정
mongoose | 몽고DB
morgan | console 원활한 확인
multer | 이미지 데이터
nodemon | 서버 재실행
xml-js | XML > JSON 형식변환



## 5. 코드 리뷰 및 개선사항
1. 사진업로드
2. axios로 공공데이터 불러오기
3. 비밀번호 암호화
4. dotenv를 사용한 보안문제 해결

개선사항
1. 토큰 시간설정 (refresh token + access token으로 분할)
2. 

## 6. 상세 설명 페이지
https://www.notion.so/ART-SEOUL-2-eb5f60496e7244de88e5620109d64629

## 7. Front-End(React) 코드 
https://github.com/leedaeho1188/hh99_smallProject

## 8. 아트서울 시연영상
https://www.youtube.com/watch?v=O4OlXNPkQ_Q
