export function cyborgEval(pExpression, pDataContext, pAdditionalHelperVariables: Object = {}) {
  if (typeof pExpression === 'function') {
    return pExpression.call(pDataContext);
  }

  return (new Function(['$data', ...Object.keys(pAdditionalHelperVariables)], `var __cyborg_result; with($data) { __cyborg_result = ${pExpression} }; return __cyborg_result`))(
    pDataContext, ...Object.values(pAdditionalHelperVariables)
  );
}
