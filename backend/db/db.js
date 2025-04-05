const mongoose = require('mongoose')

const db = async()=>{
    try{
   await mongoose.connect(process.env.Mongo_Uri)
   console.log("connected successfully"
   )
    }
    catch(e){
        console.log(e)
        process.exit(1)
    }
}
module.exports = db