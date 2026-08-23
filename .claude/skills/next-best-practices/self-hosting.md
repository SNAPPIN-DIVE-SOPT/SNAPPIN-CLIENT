# 셀프 호스팅

> 현재 이 프로젝트에는 Dockerfile이 없어 해당 사항이 없다. 셀프 호스팅을 검토하게 되면 아래를 참고한다.

## Docker용 standalone 출력

```js
// next.config.ts
module.exports = {
  output: 'standalone',
}
```
프로덕션 의존성만 담긴 최소 패키지를 만들어서 어디서든 가볍게 배포할 수 있다.

## 다중 인스턴스 ISR은 공유 캐시가 필요

핵심 문제: 인스턴스 A가 페이지를 재생성해서 로컬 디스크에 저장해도, 인스턴스 B는 그 캐시를 모르고 오래된 페이지를 계속 서빙한다. 공유 캐시 핸들러 없이는 서버마다 다른 콘텐츠가 보일 수 있다.

Redis, S3 등 공유 스토어를 가리키는 캐시 핸들러를 구현한다:
```js
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0,
}
```

## 기능별 호환성

| 기능 | 단일 인스턴스 | 다중 인스턴스 | 필요 조건 |
|---|---|---|---|
| SSR, SSG, Middleware | ✓ | ✓ | 없음 |
| ISR | ✓ | ✗ | 커스텀 캐시 핸들러 |
| `revalidatePath`/`revalidateTag` | ✓ | ✗ | 공유 캐시 |
| 이미지 최적화 | ✓ | ✓ | 규모가 커지면 CDN 고려 |

## 배포 전 체크

`npm run build`로 로컬에서 먼저 테스트하고, standalone 출력이 독립적으로 실행되는지 확인하고, 캐시 전략을 설정하고, 모든 인스턴스에서 ISR 재검증이 제대로 동작하는지 프로덕션 전에 검증한다. Docker 설정 시 standalone 출력과 public 자산을 함께 복사하고, 컨테이너 네트워킹을 위해 `HOSTNAME="0.0.0.0"`을 설정하고, 로드밸런서용 헬스체크 엔드포인트를 둔다.
