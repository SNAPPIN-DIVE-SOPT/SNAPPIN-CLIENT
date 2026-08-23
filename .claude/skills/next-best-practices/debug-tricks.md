# 디버그 팁

## AI 보조 디버깅용 MCP 엔드포인트

Next.js 16+는 dev 서버에 `/_next/mcp` 내장 디버깅 인터페이스를 제공한다.

`.mcp.json`에 `next-devtools-mcp`를 추가해서 쓴다:
```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

**주요 도구**:
- `get_errors` — 빌드/런타임 에러 조회
- `get_routes` — 앱의 모든 라우트 조회
- `get_project_metadata` — 프로젝트 경로, dev 서버 URL 조회
- `get_page_metadata` — 런타임 렌더링 정보 조회
- `get_logs` — 개발 로그 파일 위치 조회

직접 엔드포인트 호출:
```bash
curl -X POST http://localhost:<port>/_next/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"get_errors","arguments":{}}}'
```

## 특정 라우트만 재빌드

전체 재빌드 대신 `--debug-build-paths`로 필요한 페이지만 컴파일한다. 파일 경로와 glob 패턴을 지원한다:

```bash
# 단일 라우트
next build --debug-build-paths="app/page.tsx"

# 라우트 그룹 포함
next build --debug-build-paths="app/(marketing)/about/page.tsx"

# glob 패턴
next build --debug-build-paths="app/**/page.tsx"
```
빌드 에러나 정적 생성 문제를 디버깅할 때 반복 속도를 크게 줄여준다.
