# 이미지 최적화

## 핵심 원칙

네이티브 `<img>` 대신 항상 `next/image`를 쓴다.

## 다섯 가지 규칙

1. **명시적 크기**: 로컬 이미지는 import만으로 크기가 자동 추론된다. 원격 이미지는 `width`/`height`를 명시하거나, 유동적인 레이아웃이면 `fill` + `sizes`를 쓴다.

2. **원격 이미지 설정**: `next.config.ts`의 `remotePatterns`로 허용할 출처를 등록한다 (deprecated된 `domains` 대신). 이 프로젝트는 `apps/web/next.config.ts`에 이미 여러 CDN 도메인(kakaocdn, s3, cloudfront 등)이 등록돼 있다 — 새 이미지 출처를 쓸 땐 여기에 추가부터 확인한다.
   ```ts
   images: {
     remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
   }
   ```

3. **반응형 sizes**: `sizes`로 뷰포트별로 받아올 해상도를 지정한다.
   ```tsx
   <Image src="/card.png" alt="Card" fill sizes="(max-width: 768px) 100vw, 33vw" />
   ```
   `fill`을 쓰면서 `sizes`를 빼먹으면 브라우저가 가장 큰 이미지를 받아와서 최적화가 무력화된다.

4. **Blur placeholder**: `placeholder="blur"`로 로딩 중 화면이 덜컹거리는 걸 막는다. 로컬 이미지는 자동 블러 해시, 원격 이미지는 `blurDataURL`을 직접 넘긴다.

5. **Priority 로딩**: 뷰포트 진입 시 바로 보이는 이미지(LCP 후보)에는 `priority`를 준다. 그 외는 기본 lazy loading에 맡긴다.
