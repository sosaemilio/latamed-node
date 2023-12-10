import { body, param, validationResult } from 'express-validator'
import { type NextFunction, type Request, type Response } from 'express'

export const getValidationRules = (): any[] => {
  // el id debe ser un ObjectId y está en la url
  return [
    param('id').isMongoId()
  ]
}

export const validateGet = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next(); return
  }

  const extractedErrors: Array<Record<string, string>> = errors.array().map(err => ({ [err.path]: err.msg }))

  res.status(422).json({
    errors: extractedErrors
  })
}

export const postValidationRules = (): any[] => {
  return [
    body('firstName').isString().isLength({ min: 2 }),
    body('lastName').isString().isLength({ min: 2 }),
    body('email').isEmail(),
    body('phone').isString().isLength({ min: 8 }),
    body('birthDate').isISO8601().toDate(),
    body('address').isString().isLength({ min: 2 }),
    body('city').isString().isLength({ min: 2 })
  ]
}

export const validatePost = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next(); return
  }

  const extractedErrors: Array<Record<string, string>> = errors.array().map(err => ({ [err.path]: err.msg }))

  res.status(422).json({
    errors: extractedErrors
  })
}

export const deleteValidationRules = (): any[] => {
  return [
    param('id').isMongoId()
  ]
}

export const validateDelete = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  }
}

// const oauthValidationRules = (req: Request, res: Response, next: NextFunction): void => {
//   if (req.isAuthenticated === true) {
//     next(); return
//   }

//   res.status(401).json({ message: 'Unauthorized' })
// }

export default {
  getValidationRules,
  validateGet,
  postValidationRules,
  validatePost,
  deleteValidationRules,
  validateDelete
}
