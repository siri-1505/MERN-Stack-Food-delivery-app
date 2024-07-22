const Contact=require('../model/Contact')

const ContactController=async(req,res)=>{
    const{name,email,description}=req.body;
    try{
        const complain=await Contact.create({
            name,
            email,
            description
        });
        const data=await complain.save();
        return res.status(200).json({
            message:'success',
            data,
        })
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports={ContactController}