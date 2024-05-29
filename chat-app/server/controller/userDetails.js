const getuserdetailsfromtoken = require("../helpers/getuserdetailsfromtoken")

async function userDetails(req,res){
    try {
        const token = req.cookies.token || ""

        const user = await getuserdetailsfromtoken(token)

        return res.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            message : error.maessage || error,
            error : true
        })
    }
}

module.exports = userDetails