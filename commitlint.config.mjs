// 타입·scope 목록의 기준 문서는 docs/git-conventions.md — 바꿀 때 함께 갱신한다.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'web',
        'ad',
        'design-system',
        'shared',
        'eslint-config',
        'tailwind-config',
        'typescript-config',
      ],
    ],
    // 한국어 본문은 줄 길이 기준이 맞지 않아 제한하지 않는다.
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
