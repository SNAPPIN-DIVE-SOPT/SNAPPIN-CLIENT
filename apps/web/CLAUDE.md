# apps/web

스냅핑 메인 서비스. Next.js 16 (App Router) + React 19. 전역 규칙은 루트 [`CLAUDE.md`](../../CLAUDE.md) 참고.

## API 클라이언트 재생성

`src/swagger-api`는 자동 생성된 코드다. 직접 편집하지 말고, 스웨거 스펙이 바뀌면 재생성한다:
```bash
pnpm generate:api
```

## 확인이 필요한 사항

- `middleware.ts`가 아직 Next.js 16 이전 이름을 쓰고 있다. `next-best-practices`의 `file-conventions.md`에 정리된 `proxy.ts` 이름 변경과 마이그레이션 코드모드를 참고해서 전환 여부를 검토한다.
- `next.config.ts`의 `images.remotePatterns`에 이미지 CDN 도메인이 등록돼 있다 (kakaocdn, S3, CloudFront 등). 새 이미지 출처를 쓸 땐 여기부터 추가한다.
- `cacheComponents`는 아직 꺼져 있다. `'use cache'`, `cacheLife()`, `cacheTag()` 관련 코드를 쓸 이유가 없다 — 코드 리뷰 중 이런 API가 보이면 플래그부터 확인한다.
