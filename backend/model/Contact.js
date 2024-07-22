const mongoose=require('mongoose')
const User=require('./User')

const contactModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:User,
    }
})

const Contact=mongoose.model('Contact',contactModel);

module.exports=Contact;
