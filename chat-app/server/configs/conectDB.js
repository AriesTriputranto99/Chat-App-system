const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection

        connection.on('connected' , () => {
            console.log('connect to db')
        })

        connection.on('error',(error)=>{
            console.log('somrthing is wrong in mongodb',error )
        })


    }  catch (error) {
        console.log('somrthing is wrong' , error)
    }
}

module.exports= connectDB