const express = require('express')
const couchdb = require('node-couchdb')
const dummy = require('./dummy')

let router = express.Router()
router.use(express.static('public'))
router.use(express.urlencoded({extended: false}))
router.use(express.json())

const couch = new couchdb({
    auth: dummy.auth
});

router.post('/dash',(req, res)=>{
  if (req.body.password != 'bb') {
    res.render('index',{
      exams: 1,
      passValid: false
    })
  }
  else{
    res.render("dashboard",{
      facName: 'Athul Raj',
      userName: 'athulraj',
      email: 'athulraj@tutamail.com',
      qNum: 1
    })
  }
})

router.post('/newdb',(req,res)=>{
  console.log(req.body);
  couch.createDatabase(req.body.dbName)
  .then(() =>{
    res.json('success')
  })
  .catch(err =>{
    console.log(err);
    res.json("err")
  })
})

router.post('/newqn',(req,res)=>{

})

router.post('/updateprofile', (req, res)=>{
  console.log(req.body);
  res.json("hello")
})

module.exports = router
