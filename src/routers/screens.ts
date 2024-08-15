import express from 'express'
import * as screensController from '../controllers/screens'

const router = express.Router()

router.post('/', screensController.createScreen)

export default router
