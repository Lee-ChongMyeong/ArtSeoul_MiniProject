# Art Seoul
![image](https://user-images.githubusercontent.com/79817676/115675644-bf48d300-a389-11eb-813d-384927d19e06.png)
![image](https://user-images.githubusercontent.com/79817676/115675771-de476500-a389-11eb-90c5-bd65735c1ad4.png)



## 프로젝트 소개
 ART Seoul은 서울안에 자신이 관람한 공연이나 전시 후기를 다른사람과 공유하는 사이트입니다. 후기를 남기실 때는 지도안에있는 마커를 클릭해서 남기실 수 있습니다. 자신이 다녀온 곳에 이미 마커가 찍혀있다면 해당 마커를 사용하시면되고, 마커가 찍혀있지 않으면 직접 마커를 만드셔서 사용하시면 됩니다. 지도에서 원하는 장소를 찾으실 때는 직접 지도를 사용하시거나 해당 주소를 입력을 해서 찾으실 수 있습니다! 공연정보 페이지에 들어가면 현재 서울에서 관람할 수 있는 공연 정보들을 카테고리별로 나눠서 제공하고있습니다.

## 프로젝트 기간
2021년 4월 9일 ~ 2021년 4월 22일

## 1. 작업자
  - 이총명 (backend-developer)
<img width="300" src="https://item.kakaocdn.net/do/7d4fa4371a4ed97bebc7d1e052bcba359f17e489affba0627eb1eb39695f93dd">

  - 원가연 (backend-developer)
<img width="300" src="https://lh3.googleusercontent.com/proxy/WGrO-2vTK1FlHLxamzZZKj1ijIYMMp4CRaPe8Yfwl1_hpit3atdzTCAHAeJweH5Omgh8WPeuCEEz96P70RHR63ptb8gUXV7jvRro-wX8KUB018l7sDzSxnBXqwpV8IIJ5QGHElt9u4qSHcbDSb9neg___h7xsKBdBEzA9xjUMXcdE4UyS1iyJGXOyV_4FhT4v6CFzHBGAKhYgsURD5IICtc1DTqQA3v2tjnAz3i2OJFukxiD5W58IXBOgCp4AkwBsKwCf0_lyrJ1AljiYrcCF4kMUtCpDNIbOIxwIv6rfAM">

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

자세한 설계도는 NOTION에서 확인 가능합니다!
<a href="https://www.notion.so/ART-SEOUL-2-4821f7a5fc644af7a37e44a8f610dc4d" target="_blank">NOTION 링크</a>

<details>
<summary>로그인 및 회원가입</summary>
<div markdown="1">       

API기능 |
---|
로그인
회원가입
비밀번호변경
<br>
</div>
</details>

<details>
<summary>마이페이지</summary>
<div markdown="1">       

API기능 |
---|
다른사람 게시글 목록 조회
내 게시글
내정보조회
프로필 추가 및 수정
<br>
</div>
</details>

<details>
<summary>댓글작성</summary>
<div markdown="1">       

API기능 |
---|
게시글 댓글 목록
게시글 댓글 추가
게시글 댓글 삭제
<br>
</div>
</details>

<details>
<summary> 카카오맵 마커 API</summary>
<div markdown="1">       

API기능|
---|
마커 생성
마커 보기
마커 삭제
핫플레이스 마커 표시
<br>
</div>
</details>

<details>
<summary> 게시글 API </summary>
<div markdown="1">       

API기능 |
---|
마커에서 게시글 보기
마커에서 게시글 쓰기
마커에서 게시글 수정
마커에서 게시글 삭제
<br>
</div>
</details>

<details>
<summary>공연정보 API </summary>
<div markdown="1">       

API기능 |
---|
공연 정보 목록(뮤지컬)
공연 정보 목록(연극)
공연 정보 목록(클래식)
공연 정보 목록(국악)
공연 정보 목록(무용)
<br>
</div>
</details>

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



## 5. 배포방식
AWS EC2

## 6. 상세 설명 페이지
https://www.notion.so/ART-SEOUL-2-4821f7a5fc644af7a37e44a8f610dc4d

## 7. Front-End(React) 코드 
https://github.com/leedaeho1188/hh99_smallProject
