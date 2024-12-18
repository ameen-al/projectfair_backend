const users =require('../Models/userSchema')
const jwt =require('jsonwebtoken')

//register logic
 exports.registerApi =async(req,res)=>
 {
    console.log("Inside the register Api");
   const{username,email,password}=req.body
   const existingUser =await users.findOne({email})
   if(existingUser){
      res.status(402).json({message:"User already existing..."})
   }
   else{
      const newUser= new users({
         username:username,
         email:email,
         password:password,
         github:"",
         linkedin:"",
         profilePic:""

      })
      await newUser.save()
      res.status(200).json("Register Successfully")
   }
 }
 //login logic
 exports.loginApi=async(req,res)=>{
   console.log("Inside the login Api");
   const{email,password}=req.body
   try{
      const existingUser =await users.findOne({email,password})
   if(existingUser){
      const token =jwt.sign({userId:existingUser._id},process.env.jwtkey)
      console.log(token);
      res.status(200).json({currentUser:existingUser,token})

   }
   else{
      res.status(404).json("Incorrect email or Password")
   }
   }
   catch(err){
      res.status(401).json(err)
   }
   
 }
