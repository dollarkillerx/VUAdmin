const express = require("express")
const router = express.Router();
const passport = require("passport")

const Profile = require("../../models/Profile")

// $route GET /api/profile/test
// @desc 返回请求的json数据
// @access public
router.get("/test",(req,res)=>{
    res.json({msg:"profile works"})
})

// $route POST /api/profile/add
// @desc 创建信息
// @access Private
router.post('/add',passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFilds = {};
    if(req.body.type)profileFilds.type = req.body.type
    if(req.body.describe)profileFilds.describe = req.body.describe
    if(req.body.income)profileFilds.income = req.body.income
    if(req.body.expend)profileFilds.expend = req.body.expend
    if(req.body.cash)profileFilds.cash = req.body.cash
    if(req.body.remark)profileFilds.remark = req.body.remark

    new Profile(profileFilds)
        .save()
        .then(profile=>{
            res.json(profile)
        })
})

// $route GET /api/profile/
// @desc 获取所有信息
// @access Private
router.get('/',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
    .then(profile => {
        if (!profile) {
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    }).catch(err => {
        res.status(404).json(err.massage)   
    });
})

// $route GET /api/profile/:id
// @desc 获取单个信息
// @access Private
router.get('/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then(profile => {
        if (!profile) {
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    }).catch(err => {
        res.status(404).json(err.massage)   
    });
})

// $route PUT /api/profile/edit/:id
// @desc 更新信息
// @access Private
router.put('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFilds = {};
    if(req.body.type)profileFilds.type = req.body.type
    if(req.body.describe)profileFilds.describe = req.body.describe
    if(req.body.income)profileFilds.income = req.body.income
    if(req.body.expend)profileFilds.expend = req.body.expend
    if(req.body.cash)profileFilds.cash = req.body.cash
    if(req.body.remark)profileFilds.remark = req.body.remark

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFilds},
        {new: true}
    )
    .then(profile => res.json(profile))
})

// $route DELETE /api/profile/delete/:id
// @desc 删除信息
// @access Private
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{

    Profile.findOneAndDelete({_id:req.params.id})
    .then(profile=>{
        profile.save().then(profile => res.json(profile))
    })
    .catch(error=>res.status(404).json("删除失败"))
})

module.exports = router