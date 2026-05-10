import express from 'express'
import { HandleEmplyoeeSignup, HandleEmplyoeeLogout, HandleEmplyoeeLogin, HandleEmplyoeeForgotPassword, HandleEmplyoeeSetPassword, HandleEmployeeCheck } from '../controllers/EmplyoeeAuth.controller.js'
import { VerifyEmployeeToken } from '../middlewares/Auth.middleware.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/signup", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleEmplyoeeSignup)

router.post("/login", HandleEmplyoeeLogin)

router.get("/check-login", VerifyEmployeeToken, HandleEmployeeCheck)

router.post("/logout", HandleEmplyoeeLogout)

router.post("/forgot-password", VerifyEmployeeToken, HandleEmplyoeeForgotPassword)

router.post("/reset-password/:token", HandleEmplyoeeSetPassword)


export default router