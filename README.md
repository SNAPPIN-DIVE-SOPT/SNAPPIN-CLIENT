# Snappin’

무드 큐레이션을 통해 다양한 스냅 작가와 고객을 정교하게 매칭하여 나의 가장 소중한 순간을 가장 나답게 담아냅니다.

<img width="579" height="140" alt="Swatch" src="https://github.com/user-attachments/assets/91af11f7-70e3-4c94-8903-cbb32e797f19" />
<img width="1920" height="1080" alt="Slide 16_9 - 76" src="https://github.com/user-attachments/assets/a70b14f1-deee-4046-aa0a-11e107fcf9e1" />

### <a href="https://snappin-client.vercel.app/">View Live Demo</a>

## 핵심 UX 키워드

> #### 연결하는 : 내가 원하는 무드를 가진 작가를 찾아 매칭
>
> #### 빛나는 순간 : 인생에 가장 빛나는 순간을 포착
>
> #### 다채로운 : 다양한 무드의 스냅 사진을 모두 스냅핑에서

## Team

<div align="center">
<table>
    <tr>
        <th> 👑 <a href="https://github.com/Jeong-Ag">권동희</a></th>
        <th> <a href="https://github.com/ljh0608">장민수</a></th>
        <th> <a href="https://github.com/kojesung">양승혜</a></th>
        <th> <a href="https://github.com/heeyyeon">송민하</a></th>
    </tr>
    <tr>
      <td>
         <img width="140" height="140" alt="동희" src="https://github.com/user-attachments/assets/b0f9f89d-293b-4c2c-ade0-bb5580d00cbb" />
      </td> 
      <td>
         <img width="140" height="140" alt="민수" src="https://github.com/user-attachments/assets/b0f9f89d-293b-4c2c-ade0-bb5580d00cbb" />
      </td>
      <td>
         <img width="140" height="140" alt="승혜" src="https://github.com/user-attachments/assets/b0f9f89d-293b-4c2c-ade0-bb5580d00cbb" />
      </td>
      <td>
         <img width="140" height="140" alt="민하" src="https://github.com/user-attachments/assets/b0f9f89d-293b-4c2c-ade0-bb5580d00cbb" />
      </td>
    </tr>
    <tr>
    </tr>
    </table>
</div>

<br/>

## Tech Stack

| 역할                 | 종류                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core                 | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)                                             |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                   |
| Styling              | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white)              |
| Data Fetching        | ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)                                                                                                                             |
| Development Tools    | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white) ![swagger-typescript-api](https://img.shields.io/badge/swagger--typescript--api-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white) |
| Code Quality         | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                       |
| Package Manager      | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                                                         |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                        |

<br/>

# 📘 프로젝트 컨벤션

## 브랜치 전략

### Git Flow

<img src="https://devocean.sk.com/editorImg/2023/12/15/6c564810665399f6549ed2bffc7e763c7e39f5fab128a3442ddeb44ee6593c04" alt="Git Flow 설명 이미지" />

### 브랜치 네이밍 컨벤션

| 유형      | 형식                            | 예시                                 |
| --------- | ------------------------------- | ------------------------------------ |
| 기능 추가 | `feat/#<이슈번호>/<기능명>`     | `feat/#12/user-login-page`           |
| 버그 수정 | `fix/#<이슈번호>/<기능명>`      | `fix/#34/fix-login-redirect`         |
| 리팩토링  | `refactor/#<이슈번호>/<기능명>` | `refactor/#21/refactor-user-service` |
| 긴급 패치 | `hotfix/#<이슈번호>/<기능명>`   | `hotfix/#88/fix-navbar-crash`        |

> 🔹 기능명은 **kebab-case** 사용  
> 🔹 이슈 번호는 **GitHub Issue**와 연동

## 📝 커밋 컨벤션

> [Udacity Git Style Guide](https://udacity.github.io/git-styleguide/) 기반

#### Prefix 목록

| Prefix     | 설명                                              |
| ---------- | ------------------------------------------------- |
| `feat`     | 새로운 기능 추가                                  |
| `fix`      | 버그 수정                                         |
| `docs`     | 문서 수정 (README 등)                             |
| `design`   | UI / 스타일 변경                                  |
| `refactor` | 기능 변경 없는 코드 리팩토링                      |
| `test`     | 테스트 코드 추가 / 수정                           |
| `chore`    | 설정, 빌드, 패키지 작업 (프로덕션 코드 영향 없음) |
| `hotfix`   | 배포 후 긴급 수정                                 |

### 커밋 메시지 예시

```bash
feat: 마이페이지 UI 구현
fix: 로그인 시 토큰 누락 오류 수정
refactor: userService 코드 정리
design: 버튼 hover 효과 추가
docs: README에 브랜치 전략 설명 추가
hotfix: 배포 후 500 에러 응급 조치
```

## 💻 코드 컨벤션

### 폴더명

`kebab-case (예: /user-components)`

### 파일명

`PascalCase (예: user-profile.tsx)`

### 코드 스니펫

| 항목          | 스니펫 | 설명                                      |
| ------------- | ------ | ----------------------------------------- |
| UI 컴포넌트   | `rfc`  | 함수형 컴포넌트, Next.js 스타일 공식 사용 |
| 유틸리티 함수 | `rafc` | 화살표 함수 형태의 유틸 함수 정의         |

### 변수 및 함수

**변수 네이밍** = camelCase, Boolean 값: `is` 접두사 사용 (`isActive`)  
**상수** = 대문자 스네이크 케이스 (`API_BASE_URL`)  
**이벤트 핸들러 함수** = 화살표 함수 사용, `handle + 명사 + 동사` 네이밍 (`handleUserClick`),

### 타입 정의

**객체 타입**: `interface`  
**enum 대용, 간단한 타입**: `type`  
**타입명**: PascalCase (`UserInfo`, `ButtonVariant`)

### CSS 단위

`rem` 사용

---

# 🤝 협업 규칙

```
1. 📲 카카오톡 수시로 확인하기
2. 🧩 어려운 일이 생기면 혼자 고민하지 말고 꼭 공유하기
3. 🗣️ 서로의 의견을 존중하고 배려하는 말투로 소통하기
4. 🎉 힘들어도 재미있게, 즐기면서 프로젝트 진행하기
5. ⏰ 마감 기한을 잘 지키기 (일정이 어려울 땐 미리 말해서 조정하기)
```

## 질문 가이드

### 직접 찾아보기

> Google, ChatGPT, 공식 문서 등
> 영어 검색 권장 → 어려우면 DeepL 등 번역기 활용

### 구체적으로 이야기하기

> 현재 상황(어디서, 어떤 문제가 발생했는지)
> 내가 알고 있는 것
> 참고한 자료나 검색한 내용
> 이해되지 않는 부분
> 본인이 시도한 해결 방법

### 해결한 내용은 팀에 공유하기!

## 🔀 Pull Request (PR) 규칙

> 합숙 이전: 2명 이상 **Approve** 후 Merge
> 합숙 기간: **리드**의 Approve로 Merge 가능 (여유있는 다른 팀원들도 꼭 리뷰 달아주기! 못 달아줄 것 같으면 코드라도 한 번 봐주기)
> 리뷰 확인하면 **이모지 남기기**
> 리뷰 반영 시 작업 단위로 **커밋 나눠서**, 리뷰 댓글에 **커밋 번호** 남겨서 알려주기
> 리뷰 반영 후에는 **re-request review** 하기
> 열심히 논의하기

## 코드 리뷰 가이드

> 부드러운 어조 사용하기
> 구체적인 피드백 + 참고 링크 함께 작성하기
> 궁금한 부분도 함께 질문하기
> 다른 리뷰어가 잘 남겼다고 리뷰 안 남기지 말고 간단하게라도 코멘트랑 남기고 `approve/request change` 하기

<img width="936" height="879" alt="스크린샷 2026-01-04 오전 1 22 35" src="https://github.com/user-attachments/assets/e25a6671-0dc3-4e3d-90f2-d470ca9eee02" />
