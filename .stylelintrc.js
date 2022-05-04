module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-list-comma-newline-after": "always-multi-line", // 콤마로 연결된 선택자 자동 개행 취소
    "selector-list-comma-space-after": "always-single-line", // 콤마로 연결된 선택자의 콤마 뒤 스페이스
    "alpha-value-notation": "number", // 퍼센트 값이 아닌 넘버값으로
    "rule-empty-line-before": "never", // 규칙 앞에 빈줄 금지
    "declaration-block-semicolon-newline-after": "always", // 속성값 선언 후 개행
    "comment-empty-line-before": null, // 주석 앞에 빈 줄 요구 취소
    "block-closing-brace-newline-before": "always-multi-line", // 블록의 닫는 중괄호 앞에 줄 바꿈
    "block-no-empty": null, // 빈 블록을 허용하지 않음
    "max-line-length": null, // 선의 길이를 제한
    "property-no-vendor-prefix": null, // vendor-prefix 허용
  },
};
