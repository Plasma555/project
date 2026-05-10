export const VerifyEmployeeToken = (req, res, next) => {
    const EMid = req.cookies.EMid
    const EMrole = req.cookies.EMrole
    const ORGID = req.cookies.ORGID
    if (!EMid || !ORGID) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }

    req.EMid = EMid
    req.EMrole = EMrole
    req.ORGID = ORGID
    next()
}

export const VerifyhHRToken = (req, res, next) => {
    const HRid = req.cookies.HRid
    const HRrole = req.cookies.HRrole
    const ORGID = req.cookies.ORGID
    if (!HRid || !ORGID) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin: true })
    }

    req.HRid = HRid
    req.ORGID = ORGID
    req.Role = HRrole
    next()
}