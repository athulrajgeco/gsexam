const express = require('express')
const cors = require('cors')
const student = require('./routes/student')
const faculty = require('./routes/faculty')

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req, res)=>{
  res.render('index',{
    exams: 1,
    passValid: true
  })
})

app.use('/st',student)
app.use('/fac',faculty)

app.locals.opts = []

app.listen(3000,()=>{
  console.log("Listening on port 3000");
})
