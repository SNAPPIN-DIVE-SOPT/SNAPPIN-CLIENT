팀 컨벤션(전역, 최우선)

- 상수: 영문 대문자 스네이크(API_KEY)
- 컴포넌트: PascalCase(MainHeader)
- var 금지, const 우선 / 불가피할 때만 let
- 변수/함수명은 의미를 명확히(줄임말 지양, arr1 같은 이름 금지)
- map 렌더링 시 key는 index 지양, 유일한 값 사용
- 기본적으로 화살표 함수 사용
- early return(암시적 반환)으로 분기 단순화 권장
- 문자열 조합은 템플릿 리터럴만 사용(`${a} ${b}`)
- for 지양, forEach/map 사용
- switch-case는 break 강제 + case 사이 한 줄 띄움
- 조건 분기는 기본적으로 삼항 연산자 사용(단, 가독성/중첩 심하면 early return을 우선)
- 주석은 대상 바로 위(또는 한 줄이면 끝에) / 아래에 쓰는 주석 금지
- button 태그에는 type 반드시 명시
- axios then/catch 사용 시 then&catch 짝 맞추기, async/await 사용 시 try/catch 사용
- props는 구조분해로 받기: Component({ a, b })
- 컴포넌트 props 타입은 컴포넌트명+Props, 컴포넌트 상단에 선언
- 단일 export면 default export, 2개 이상이면 named export
- common component(버튼/헤더 등)는 children 적극 활용
