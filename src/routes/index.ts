import { Router } from 'express'
import { requiresAuth } from 'express-openid-connect'
import patientsRouter from './patients'
import historyRouter from './history'
import appointmentsRouter from './appointments'
import doctorsRouter from './doctors'
import swaggerRouter from './swagger'

const router = Router()

router.use('/patients', requiresAuth(), patientsRouter)
router.use('/history', requiresAuth(), historyRouter)
router.use('/appointments', requiresAuth(), appointmentsRouter)
router.use('/doctors', requiresAuth(), doctorsRouter)
router.use('/api-docs', swaggerRouter)

export default router
