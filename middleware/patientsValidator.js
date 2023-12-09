const { body, param, validationResult } = require('express-validator')

const getValidationRules = () => {
  // el id debe ser un ObjectId y está en la url
  return [
    param('id').isMongoId()
  ]
}

const validateGet = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

const postValidationRules = () => {
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

const validatePost = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

const deleteValidationRules = () => {
  return [
    param('id').isMongoId()
  ]
}

const validateDelete = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
}

const oauthValidationRules = (req, res, next) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated) {
    return next()
  }

  return res.status(401).json({ message: 'Unauthorized' })
}

module.exports = {
  getValidationRules,
  validateGet,
  postValidationRules,
  validatePost,
  deleteValidationRules,
  validateDelete,
  oauthValidationRules
}
