const projects = require('../Models/projectSchema')
exports.addProjectApi =async(req,res)=>{
    console.log("Inside add ProjectApi");

    const{title,language,github,website,overview}=req.body
    const projectImg=req.file.filename
    const userId= req.payload

    try{
        const project =await projects.findOne({github})
        if(project){
            res.status(401).json("Project already existing")
    }
    else{
        const newProject = new projects({
            title,language,github,website,overview,projectImg,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }
    
}
catch(err){
    res.status(406).json(err)
}
}
exports.getHomeProjectAPI=async(req,res)=>{
    try{
        const allproject =await projects.find().limit(3)
        res.status(200).json(allproject)
        // console.log(allproject);

    }
    catch(err){
        res.status(406).json(err)
    }

}
exports.getAlluserProjectAPI=async(req,res)=>{
    const search =req.query.search
    console.log(search);

    const query={
        title:{
            $regex:search,
            $options:"i"
        }
    }


    try{
        const allproject =await projects.find(query)
        res.status(200).json(allproject)
        // console.log(allproject);

    }
    catch(err){
        res.status(406).json(err)
    }



}
exports.getUserProjectAPI=async(req,res)=>{
    const userId = req.payload
    try{
        const project= await projects.find({userId})
        res.status(200).json(project)



    }
    catch(err){
        res.status(406).json(err)
    }
}
exports.editProjectApi =async(req,res)=>{
    console.log("Inside Edit ProjectApi");

    const{title,language,github,website,overview,projectImg}=req.body

    const updateImg=req.file? req.file.filename:projectImg
    const userId= req.payload
    const {projectId}=req.params
    console.log(title,language,github,website,overview,userId);

    try{
      console.log("Inside Try");
      const project= await projects.findByIdAndUpdate(
        {_id:projectId},
        {
            title:title,
            language:language,
            github:github,
            website:website,
            overview:overview,
            projectImg:updateImg

        }

      )
      await project.save()
      res.status(200).json(project)
    
}
catch(err){
    res.status(406).json(err)
}
}
exports.deleteProjectAPI=async(req,res)=>{
    console.log("Inside the delete API");
    const {projectId}=req.params
    console.log(projectId);

    try{
        const project= await projects.findByIdAndDelete({_id:projectId})
        res.status(200).json(project)

    }
    catch(err){
        res.status(406).json(err)
    }
}
