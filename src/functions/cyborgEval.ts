export function cyborgEval(pExpression: any, pDataContext: Record<string, any>, pAdditionalHelperVariables?: Record<string, any>): void{
    const additionalHelperVariables: Record<string, any> = pAdditionalHelperVariables || {};
    if (typeof pExpression === 'function') {
        return pExpression.call(pDataContext);
    }

    return (new Function(...Object.keys(additionalHelperVariables), `var __cyborg_result; with($data) { __cyborg_result = ${pExpression} }; return __cyborg_result`))(
        pDataContext, ...Object.values(additionalHelperVariables)
    );
}
