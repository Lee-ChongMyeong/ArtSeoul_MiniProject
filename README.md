# Art Seoul
## 웹사이트 주소

http://artseoul.shop/
#### 서버가 꺼져 있을 시에는 맨 밑의 시연영상을 참조해주세요 !

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
1. #### 사진업로드 
- 사용자가 게시글을 업로드 할 때, multer 라이브러리를 사용해서 이미지를 업로드 및 폼데이터를 처리하였습니다. 폼데이터를 통해 업로드한 이미지를 올리면 req.file로 정보가 들어오고 destination(경로) 속성에 지정해둔 경로로 이미지를 저장하게 했습니다. 이때, 파일명이 중복될수 있는 문제에 대해서 파일명을 date.now와 Math.random 을 활용해서 중복되지 않게 해결했습니다.
![image](https://user-images.githubusercontent.com/57881683/120218663-0bceda80-c275-11eb-9b63-dcfb88bbec57.png)


2. #### axios로 공공데이터 불러오기
- 공공데이터의 경우 클라이언트 서버에서 바로 불러온다면 CORS 보안문제로 인해 불러와지지 않는 경우가 있습니다. 그래서 백엔드 서버에서 공공데이터를 불러온 뒤 프론트측으로 내려주는 방법으로 진행했습니다. 이때 공공데이터의 형식이 xml이었기에 모든 데이터를 request로 받아온 뒤 json으로 변경했습니다. 이 경우 request로 받아온 것을 str 형태로 변환한 것이었기에 코드가 복잡해져 한번에 axios로 받아오는 방식으로 해결했습니다.

![image](https://user-images.githubusercontent.com/57881683/120218748-299c3f80-c275-11eb-9232-fa4209ab1516.png)


3. #### 비밀번호 암호화
- crypto 모듈을 사용해 암호화를 진행했습니다.
![image](https://user-images.githubusercontent.com/57881683/120218813-3e78d300-c275-11eb-8fa4-c8f648109ae2.png)


4. #### dotenv를 사용한 보안문제 해결
- .env파일을 만든 후 보안을 강화하기 위해 환경변수들을 깃허브에 업로드 시 제외하였습니다.

![image](https://user-images.githubusercontent.com/57881683/120218984-7c75f700-c275-11eb-9a9d-1f6dc7ff0ed8.png)

5. #### 지도 데이터 위도경도의 소숫점 잘림 해결
- 마커 데이터의 경우 위도와 경도가 소숫점 12번째자리까지 가지고 있는 경우가 있습니다. 이를 number형식으로 저장할 시 소숫점 3번째 자리까지 반올림되어 저장되는 현상을 발견했습니다. 그래서 이를 str값으로 받아준 뒤 다시 내려줄때 number로 변환하여 문제를 해결하였습니다

![image](https://user-images.githubusercontent.com/57881683/120221066-b5fc3180-c278-11eb-9a4b-2b1f7eeab568.png)


6. #### 무한스크롤
- 게시글을 조회할때 모든 데이터를 한꺼번에 불러오면 렌더링하는데 속도가 느려져 사용자들이 불편함이 있었습니다. 그래서 게시글의 마지막ID를 쿼리스트링으로 처리한 후, 그 해당하는 쿼리스트링에 마지막ID까지 데이터를 보여주었습니다. 그럼으로써 불필요하게 모든 데이터를 불러올 필요가 없어짐으로써 서버에서 받은 데이터를 웹에서 렌더링 하는 속도가 빨라졌습니다.

![image](https://user-images.githubusercontent.com/57881683/120219380-205fa280-c276-11eb-8bff-7fcc71180e1d.png)


## 6. 상세 설명 페이지
https://www.notion.so/ART-SEOUL-2-eb5f60496e7244de88e5620109d64629

## 7. Front-End(React) 코드 
https://github.com/leedaeho1188/hh99_smallProject

## 8. 아트서울 시연영상
https://www.youtube.com/watch?v=O4OlXNPkQ_Q
