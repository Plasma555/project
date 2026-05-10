import express from 'express'
import { HandleHRSignup, HandleHRLogin, HandleHRCheck, HandleHRLogout, HandleHRForgotPassword, HandleHRResetPassword } from '../controllers/HRAuth.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/signup", HandleHRSignup)

router.post("/login", HandleHRLogin)

router.get("/check-login", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleHRCheck)

router.post("/logout", HandleHRLogout)

router.post("/forgot-password", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleHRForgotPassword)

router.post("/reset-password/:token", HandleHRResetPassword)


export default router