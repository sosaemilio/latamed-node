/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger-output.json'

const router = Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

export default router
