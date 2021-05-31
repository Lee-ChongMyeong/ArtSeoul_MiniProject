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
|기능|Method|URL| Response|
|:---|:---:|:---:|:---:|
|로그인|POST|/user/login| token |
|회원가입|POST|/user/register| msg : "empty" & "success" & "fail" |
|마커 생성|POST|/marker| mss: "마커 저장 성공", markerId |
|마커 보기|GET|/marker/display| markerId, location |
|마커 삭제|DELETE|/marker| status : "success" & "fail" |
|마커에서 게시글 보기 | GET | /board/:markerId?lastId | status, boardsData :[{ boardId, userId, title, contents, nickname, markerId, markername, date, img, profile } .. {} |
|마커에서 게시글 쓰기 | POST | /board/:markerId | result : { date, img, _id, markerId, markername, title, contents, nickname, userId, boardId }, currentprofile |
|마커에서 게시글 수정 | PUT | /board/:boardId | status : "success" & "fail", "boardData" : [{img}] | 
|마커에서 게시글 삭제 | DELETE | /board/:boardId | status : "success" & "fail"|
|공연정보목록(뮤지컬)| GET|/artinfo/music | 공공데이터 |





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
1. 사진업로드 : 
2. axios로 공공데이터 불러오기 : 공공데이터의 형식이 xml이었기에 모든 데이터를 request로 받아온 뒤 json으로 변경했는데 이 경우 request로 받아온 것을 str 형태로 변환한 것이었기에 axios로 받아오는 방식으로 해결했다.
3. 비밀번호 암호화 : 비밀번호의 경우 bcrypt라는 모듈을 사용해 암호화를 진행하려했으나 이는 해싱에 엄청난 비용이 든다고 하기에 crypto만을 사용해 암호화를 진행했다.
4. dotenv를 사용한 보안문제 해결
5. 지도 데이터 위도경도의 소숫점 잘림 해결 : 마커 데이터의 경우 위도와 경도가 소숫점 12~13번째자리까지 가지고 있는 경우가 있는데 이를 number형식으로 저장할 시 소숫점 3~4번째 자리까지 반올림되어 저장되는 현상을 발견했다. 그래서 이를 str값으로 받아준 뒤 다시 내려줄때 number로 변환하는 식으로 로직을 변경했다.
6. 무한스크롤

개선사항
1. 토큰 시간설정 (refresh token + access token으로 분할)
2. 

## 6. 상세 설명 페이지
https://www.notion.so/ART-SEOUL-2-eb5f60496e7244de88e5620109d64629

## 7. Front-End(React) 코드 
https://github.com/leedaeho1188/hh99_smallProject

## 8. 아트서울 시연영상
https://www.youtube.com/watch?v=O4OlXNPkQ_Q
