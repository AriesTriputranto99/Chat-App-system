// const jwt = require('jsonwebtoken')
// const UserModel = require('../models/UserModels')

// const getuserdetailsfromtoken = async(token) => {
//     if(!token){
//         return {
//             message : "session out",
//             logout : true ,
//         }
//     }

//     const decode = await jwt.verify(token,process.env.JWT_SECREAT_KEY)

//     const user = await UserModel.findById(decode.id).select('-password')

//     return user
// }

// module.exports = getuserdetailsfromtoken

// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/UserModels');

// const getuserdetailsfromtoken = async (token) => {
//     if (!token) {
//         return {
//             message: "Session expired",
//             logout: true,
//         };
//     }

//     try {
//         const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//         const user = await UserModel.findById(decode.id).select('-password');
        
//         if (!user) {
//             return {
//                 message: "User not found",
//                 logout: true,
//             };
//         }

//         return user;
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             return {
//                 message: "Token expired",
//                 logout: true,
//             };
//         }
//         if (error.name === 'JsonWebTokenError') {
//             return {
//                 message: "Invalid token",
//                 logout: true,
//             };
//         }
//         throw error;  // For other unexpected errors
//     }
// };

// module.exports = getuserdetailsfromtoken;

// getuserdetailsfromtoken.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModels');

const getuserdetailsfromtoken = async (token) => {
    try {
        if (!token) {
            console.log('No token provided');
        }

        const decode = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        const user = await UserModel.findById(decode.id).select('-password');
        console.log('user',user)
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        return {
            message: error.message || 'Invalid token',
            logout: true,
        };
    }
};

module.exports = getuserdetailsfromtoken;
