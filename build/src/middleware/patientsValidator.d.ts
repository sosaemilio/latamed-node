/// <reference types="qs" />
import { type NextFunction, type Request, type Response } from 'express';
export declare const getValidationRules: () => any[];
export declare const validateGet: (req: Request, res: Response, next: NextFunction) => void;
export declare const postValidationRules: () => any[];
export declare const validatePost: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteValidationRules: () => any[];
export declare const validateDelete: (req: Request, res: Response, next: NextFunction) => void;
declare const _default: {
    getValidationRules: () => any[];
    validateGet: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
    postValidationRules: () => any[];
    validatePost: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
    deleteValidationRules: () => any[];
    validateDelete: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
};
export default _default;
