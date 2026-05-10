export const GenerateJwtTokenAndSetCookiesEmployee = (res, EMid, EMrole, ORGID) => {
    res.cookie("EMid", EMid, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.cookie("EMrole", EMrole, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.cookie("ORGID", ORGID, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
}

export const GenerateJwtTokenAndSetCookiesHR = (res, HRid, HRrole, ORGID) => {
    res.cookie("HRid", HRid, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.cookie("HRrole", HRrole, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.cookie("ORGID", ORGID, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
}