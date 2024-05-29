// const getuserdetailsfromtoken =require("../helpers/getuserdetailsfromtoken")
// const UserModel = require("../models/UserModels")

// async function updateuserdetail(req,res){
//   try {
//     const token = req.cookies.token || ""

//         const user = await getuserdetailsfromtoken(token)

//         const { name, profile_pic } = req.body

//         const updateUser = await UserModel.updateOne({ _id : user._id},{
//             name,
//             profile_pic
//         })

//         const userinfomation = await UserModel.findById(user._id)

//         return res.json({
//             message : "user update succesfully",
//             data  : userinfomation,
//             success : true
//         })



//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//     });
//   }
// }

// module.exports = updateuserdetail

const getuserdetailsfromtoken = require("../helpers/getuserdetailsfromtoken");
const UserModel = require("../models/UserModels");

async function updateuserdetail(req, res) {
    try {
        const token = req.cookies.token || "";

        const userResponse = await getuserdetailsfromtoken(token);

        if (userResponse.logout) {
            return res.status(401).json({
                message: userResponse.message,
                error: true,
            });
        }

        const { name, profile_pic } = req.body;

        await UserModel.updateOne({ _id: userResponse._id }, { name, profile_pic });

        const userinfomation = await UserModel.findById(userResponse._id).select('-password');

        return res.json({
            message: "User updated successfully",
            data: userinfomation,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error',
            error: true,
        });
    }
}

module.exports = updateuserdetail;
