const express = require('express')
const cors = require('cors')
const couchdb = require('node-couchdb')
const dummy = require('./dummy')

let router = express.Router()
router.use(express.static('public'))
router.use(express.urlencoded({extended: false}))
router.use(express.json())

router.get('/register',(req, res)=>{
  console.log(dummy.inst);
  res.render("reg",{
    inst: dummy.inst,
    passValid: true
  })
})

router.post('/exam',(req,res)=>{
  if (req.body.password != 'hello') {
      res.render('reg',{
      inst: dummy.inst,
      passValid: false
    })
  } else {
    res.render('exam',{
      qNum: 1,
      ques: dummy.exam.qn,
      options: dummy.exam.opts
    })
  }
})

router.post('/next',(req,res)=>{
  console.log(req.body);
  res.send('Hello')
})

module.exports = router
