const UserModel = require("../models/UserModels")
const bcryptjs = require ('bcryptjs')
const jwt = require("jsonwebtoken")

async function checkPassword(req,res){
    try {
        const { password , userId } = req.body

        const user = await UserModel.findById(userId)

        const verifyPasword = await bcryptjs.compare(password,user.password)
        

        if(!verifyPasword){
            return res.status(400).json({
                message : "wrong password",
                error : true
            })
        }

        const tokendata = {
            id : user._id,
            email : user.email
        }
        const token = await jwt.sign(tokendata,process.env.JWT_SECREAT_KEY,{expiresIn: '1d'})

        const cookieOption = {
            http : true,
            secure : true
        }
        return res.cookie('token',token,cookieOption).status(200).json({
            message : "Login successfuly",
           token : token , 
            success : true

        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error :true
        })
    }
}

module.exports = checkPassword