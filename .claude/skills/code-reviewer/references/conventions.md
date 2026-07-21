# 팀 컨벤션

이 문서는 이 프로젝트(snappin-client)의 코드/Git 컨벤션을 담은 문서입니다.

## 네이밍

- 상수: 영문 대문자 스네이크(예: `API_KEY`)
- 컴포넌트: PascalCase (함수형 컴포넌트, 예: `MainHeader`)
- 변수는 `var` 사용 금지, `const` 우선 / 불가피할 때만 `let`
- 변수/함수명은 의미를 명확히 (줄임말 지양, `arr1` 같은 이름 금지)
- 이름이 길어지더라도 어떤 값인지 정확하게 작성

## 코드 스타일

- 기본적으로 화살표 함수 사용
- early return(암시적 반환)으로 분기 단순화 권장
- `for` 지양, `forEach`/`map` 사용
- 조건 분기는 기본적으로 삼항 연산자 사용 (단, 가독성이 떨어지거나 중첩이 심하면 early return을 우선)
- `map` 렌더링 시 `key`는 index 지양, 유일한 값 사용
- 문자열 조합은 무조건 템플릿 리터럴 사용 (`+` 연결 금지)
  - X: `var1 + " " + var2`
  - O: `` `${var1} ${var2}` ``
- axios 사용 시 `.then/.catch`, `async/await` 사용 시 `try/catch`로 에러 처리
- `switch-case`: `break` 필수, case 문 사이는 가독성을 위해 한 줄 띄우기
- 주석은 대상 바로 위에 작성. 대상 아래에 쓰는 것은 금지
- `button` 태그에는 `type` 반드시 명시 (예: `<button type="button">`)
- common component(버튼/헤더 등)는 `children` 적극 활용

## 함수 네이밍

- 기본적으로 화살표 함수 사용
- 함수명은 하는 일을 명확히 드러내야 함
  - `get`: 값을 얻어오는 함수
  - `create`: 기존 변수를 조합해 새 값/변수를 만드는 함수
  - `check`: 내부 로직을 검증하는 함수
  - 그 외에도 기능이 분명히 드러나는 이름 사용
- 이벤트 핸들러는 `handle`로 시작 (예: `handleOnClick`, `handleSubmit`)
- 유틸 함수는 반환값 기준으로 네이밍
  - boolean 반환 시 `has` + 명사 (예: `hasEmail` — email 존재 여부 반환)
- 중복되는 함수는 `utils` 폴더로 모아 재사용. 프로젝트 전역에서 쓰인다면 `shared/utils`

## 폴더 & 파일

- 파일 내 단일 요소만 export한다면 `default export`
  ```tsx
  export default function Component1() {}
  ```
- 2개 이상 export한다면 named export
  ```tsx
  export const Component2 = () => {};
  export const Component3 = () => {};
  ```
- 폴더명: kebab-case
- 파일명: 상수/타입 등은 camelCase, 컴포넌트는 PascalCase

## 타입

- 컴포넌트가 받는 props 타입은 컴포넌트 선언부 바로 위에 `type`으로 선언
- 네이밍 규칙: `컴포넌트명 + Props` (예: `PageHeaderProps`)

  ```tsx
  type PageHeaderProps = {
    title: string;
    description: string;
  };

  export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    );
  }
  ```

## Git 컨벤션

### 브랜치명

`<type>/#<이슈번호>/<작업내용>`

예: `feat/#13/input-develop`

### 커밋 메시지

`<type>(<변경범위>): <설명>`

예: `feat(input): input 개발`

### PR / 이슈 제목

`<이모지> <Type>(<변경범위>): #<이슈번호> <설명>`

예: `🎀 Feat(input): #13 어쩌구저쩌구`

### 타입 ↔ 이모지 매핑

| 이모지 | 타입     | 용도                                |
| ------ | -------- | ----------------------------------- |
| 🐾     | Init     | 프로젝트/기능 초기 세팅             |
| 🔨     | Fix      | 버그 수정                           |
| 🎨     | Style    | 스타일/포맷팅 변경 (로직 변화 없음) |
| 🎀     | Feat     | 새 기능 추가                        |
| 🔧     | Refactor | 리팩토링                            |
| 🔖     | Docs     | 문서 변경                           |

브랜치명·커밋 메시지의 `<type>`은 소문자(`feat`, `fix`, `style`, `refactor`, `docs`, `init`)를 쓰고, PR/이슈 제목의 `<Type>`은 첫 글자를 대문자로 씁니다 (예: `Feat`, `Fix`).
