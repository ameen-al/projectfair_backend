const express =require('express')

const userController =require('../Controllers/userController')
const projectController =require('../Controllers/projectController')

const jwtMiddlewares = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')
const router=express.Router()
router.post('/api/register',userController.registerApi)
router.post('/api/login',userController.loginApi)

router.post('/api/addProject',jwtMiddlewares,multerMiddleware.single('projectImg'),projectController.addProjectApi)
 
router.get('/api/getalluserProject',jwtMiddlewares,projectController.getAlluserProjectAPI)
router.get('/api/gethomeProject',projectController.getHomeProjectAPI)
router.get('/api/getuserProject',jwtMiddlewares,projectController.getUserProjectAPI)

router.put('/api/editProject/:projectId',jwtMiddlewares,multerMiddleware.single('projectImg'),projectController.editProjectApi)
router.delete('/api/deleteProject/:projectId',jwtMiddlewares,projectController.deleteProjectAPI)


module.exports=router