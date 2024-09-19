const JWT = require("jsonwebtoken")

module.exports =async (req, res, next) => {
    try {
        const token = await req.headers["authorization"].split(" ")[1]  
        
        JWT.verify(token, "JWT_SECRET_MYVALUE", (err, decode) => {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: "Un-Authorize User"
                })
            } else {
                req.body.id = decode.id
                next()
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Please provide 'bearer token'",
            err
        })
    }
}