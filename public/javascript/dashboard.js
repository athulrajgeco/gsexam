// let opts = []

function nav(k,m) {
  let btn = document.getElementsByClassName('navBtn')
  let content = document.getElementsByClassName('content')
  for (let i = 0; i < btn.length; i++) {
    btn[i].style.backgroundColor = ''
  }
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = 'none'

  }
  document.getElementById(k).style.backgroundColor = 'darkblue'
  document.getElementById(m).style.display = 'block'
}
document.getElementById('btn5').click()

function showPass() {
  let x = document.getElementsByName('pwd')
  if (x[0].type == 'password') {
    x[0].type = 'text'
    x[1].type = 'text'
  } else {
    x[0].type = 'password'
    x[1].type = 'password'
  }
}

function crExam() {
  let name = document.getElementById('exName').value
  console.log(name);
  const validChars = /[^a-zA-Z0-9\ ]/g
  const validFirstChar = "0123456789"
  if (name.search(validChars)>=0) {
    alert("Only alphanumeric characters allowed in Exam Name")
    // return false
  } else {
    if (validFirstChar.search(name[0])>=0) {
      alert("First character in Exam Name must be an alphabet")
      // return false
    } else {
      name = name.replaceAll(' ','').toLowerCase()
      console.log(name);
      fetch('/fac/newdb',{
        method: 'POST',
        body: JSON.stringify({
          dbName: name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data === 'success') {
          document.getElementById('create').style.display = 'none'
          document.getElementById('ques').style.display = 'block'
          document.getElementById('qNum').innerText = 'Question 1'
        }
        else {
          alert("Exam Name unavailable. Please choose another name")
        }
      })
    }
  }
}

function validate(e) {
  let name = document.forms['examDetails']['examName'].value
  let date = document.forms['examDetails']['examDate'].value
  let time = document.forms['examDetails']['examTime'].value
  let pwd = document.forms['examDetails']['pwd'][0].value
  let cPwd = document.forms['examDetails']['pwd'][1].value
  console.log(`${name}, ${date}, ${time}, ${pwd}`);
  if (pwd === cPwd) {
    if ((name=='')||(date=='')||(time=='')||(pwd=='')) {
      alert("Please fill all fields")
      return false
    }
  } else {
    alert("Passwords do not match")
    return false
  }
}

function successMsg() {
  document.getElementsByClassName('msg')[0].style.display = 'block'
}

function change(id,obj) {
  let p = document.getElementById(id)
  if (obj.innerText == 'Change') {
    p.contentEditable = true
    p.classList.add("edit")
    obj.innerText = 'Save'
  } else {
    p.contentEditable = false
    p.classList.remove("edit")
    fetch('/fac/updateprofile',{
      method: 'POST',
      body: JSON.stringify({
        email: p.innerText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        successMsg()
      })
      // console.log(response);
    obj.innerText = 'Change'
  }
}

function chPwd(obj) {
  document.getElementById('chPass').style.display = 'grid'
  obj.style.display = 'none'
  console.log("kk");
}

function validatePass() {
  let curPwd = document.forms['chPass']['curPwd'].value
  let newPwd= document.forms['chPass']['newPwd'].value
  let renewPwd= document.forms['chPass']['renewPwd'].value
  if ((curPwd=='')||(newPwd=='')||(renewPwd=='')) {
    alert("Please fill all fields")
    return false;
  } else {
    if (newPwd != renewPwd) {
      alert("Passwords do not match")
      return false;
    }
  }
}

function delNode(node) {
  let selectNode = document.getElementById(node)
  while (selectNode.childNodes.length) {
    let lastChild = selectNode.lastChild
    selectNode.removeChild(lastChild);
  }
}

function parseOpt() {
  let rawOpt = document.getElementById('enteredOpts').value
  let selectNode = document.getElementById('sel')
  let options = rawOpt.split('\n')
  if (options.length != selectNode.childNodes.length) {
    delNode('sel')
    options.forEach((item, i) => {
      let opt = document.createElement("option")
      opt.innerText = item
      opt.value = item
      selectNode.appendChild(opt);
    });
  }
}

function abc(obj) {
  console.log(obj.value);
}

function eType(obj) {
  document.getElementById('mcq').style.display = 'none'
  document.getElementById('txt').style.display = 'none'
  document.getElementById(obj.value).style.display = 'block'
}

function aType(obj) {
  document.getElementById('num').style.display = 'none'
  document.getElementById('str').style.display = 'none'
  document.getElementById(obj.value).style.display = 'block'
}

function chosenFiles(obj) {
  console.log(obj.files);
  delNode('imgPrv')
  for (let file of obj.files){
    let divNode = document.createElement("div")
    let imgNode = document.createElement("img")
    imgNode.width = '500'
    imgNode.src = URL.createObjectURL(file)
    let pNode = document.createElement("p")
    pNode.innerText = file.name
    pNode.style.textAlign = 'center'
    divNode.style.margin = '12px'
    divNode.style.display = 'inline-block'
    divNode.style.width = '500px'
    divNode.appendChild(imgNode)
    divNode.appendChild(pNode)
    document.getElementById('imgPrv').appendChild(divNode)
  }
}

function upload() {
  let qn = document.getElementById('qnText').value
  let files = document.getElementById('fileList').files
  let exType = document.forms['exType']['examType'].value
  if (exType == 'mcq') {
    let rawOpt = document.getElementById('enteredOpts').value
    let options = rawOpt.split('\n')
    let cAnswer = document.getElementById('sel').value
  console.log(`${rawOpt} ${options} ${cAnswer} `);
  } else {
    let texType = document.forms['txtAnType']['numstr'].value
    if (texType == 'num') {
      let minAnswer = document.getElementById('minv').value
      let maxAnswer = document.getElementById('maxv').value
      console.log(`${minAnswer} ${maxAnswer} `);
    } else {
      let strAnswer = document.getElementById('strv').value
      console.log(`${strAnswer}`);
    }
  }
  console.log(`${qn} ${exType} `);
}

function logout() {
  fetch('/')
}
