import config from '@snappin/eslint-config/next';

// Public API 패턴: ui는 하나의 패키지처럼 취급하고, 루트 '@/ui'의 공개 API를 통해서만
// 노출한다. 하위 폴더(도메인 루트 포함) 경로로의 직접 import는 전부 금지해,
// ui 내부 구조를 자유롭게 리팩터링해도 바깥 코드와의 계약은 '@/ui' 하나로 고정된다.
export default [
  ...config,
  {
    ignores: ['storybook-static/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/ui/**'],
              message:
                "'@/ui'의 공개 API를 통해 import하세요 (하위 경로 직접 접근 금지).",
            },
          ],
        },
      ],
    },
  },
];
