"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyborgEval = void 0;
function cyborgEval(pExpression, pDataContext, pAdditionalHelperVariables) {
    var additionalHelperVariables = pAdditionalHelperVariables || {};
    if (typeof pExpression === 'function') {
        return pExpression.call(pDataContext);
    }
    return new (Function.bind.apply(Function, __spreadArrays([void 0], Object.keys(additionalHelperVariables), ["var __cyborg_result; with($data) { __cyborg_result = " + pExpression + " }; return __cyborg_result"])))().apply(void 0, __spreadArrays([pDataContext], Object.values(additionalHelperVariables)));
}
exports.cyborgEval = cyborgEval;
//# sourceMappingURL=cyborgEval.js.map