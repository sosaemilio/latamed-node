"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDelete = exports.deleteValidationRules = exports.validatePost = exports.postValidationRules = exports.validateGet = exports.getValidationRules = void 0;
const express_validator_1 = require("express-validator");
const getValidationRules = () => {
    // el id debe ser un ObjectId y está en la url
    return [
        (0, express_validator_1.param)('id').isMongoId()
    ];
};
exports.getValidationRules = getValidationRules;
const validateGet = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
    res.status(422).json({
        errors: extractedErrors
    });
};
exports.validateGet = validateGet;
const postValidationRules = () => {
    return [
        (0, express_validator_1.body)('firstName').isString().isLength({ min: 2 }),
        (0, express_validator_1.body)('lastName').isString().isLength({ min: 2 }),
        (0, express_validator_1.body)('email').isEmail(),
        (0, express_validator_1.body)('phone').isString().isLength({ min: 8 }),
        (0, express_validator_1.body)('birthDate').isISO8601().toDate(),
        (0, express_validator_1.body)('address').isString().isLength({ min: 2 }),
        (0, express_validator_1.body)('city').isString().isLength({ min: 2 })
    ];
};
exports.postValidationRules = postValidationRules;
const validatePost = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
    res.status(422).json({
        errors: extractedErrors
    });
};
exports.validatePost = validatePost;
const deleteValidationRules = () => {
    return [
        (0, express_validator_1.param)('id').isMongoId()
    ];
};
exports.deleteValidationRules = deleteValidationRules;
const validateDelete = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
    }
};
exports.validateDelete = validateDelete;
// const oauthValidationRules = (req: Request, res: Response, next: NextFunction): void => {
//   if (req.isAuthenticated === true) {
//     next(); return
//   }
//   res.status(401).json({ message: 'Unauthorized' })
// }
exports.default = {
    getValidationRules: exports.getValidationRules,
    validateGet: exports.validateGet,
    postValidationRules: exports.postValidationRules,
    validatePost: exports.validatePost,
    deleteValidationRules: exports.deleteValidationRules,
    validateDelete: exports.validateDelete
};
//# sourceMappingURL=patientsValidator.js.map