function validate(e) {
  name = document.forms['stForm']['name'].value
  pass = document.forms['stForm']['password'].value
  console.log(name);
  if((name == '')||(name == ' ')){
    alert("Please fill your name")
    return false
  }
  else if((pass == '')||(pass == ' ')){
    alert("Please enter the password")
    return false
  }
}

function chosen() {
  document.getElementsByName('opts').forEach((item, i) => {
    if (item.checked) {
      console.log(item.value);
      document.getElementById('chosen').innerHTML = `You chose <strong>${item.value}</strong>`
    }
  })
}
