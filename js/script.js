const idpar = document.getElementById("idpar");
const fullname = document.getElementById("fullname");
const type = document.getElementById("type");
const channel = document.getElementById("channel");
const mask = document.getElementById("mask");
const resultArea = document.getElementById("resultArea");
const fileInput = document.getElementById('fileInput');

idpar.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    validateInput1();
  }
});
fullname.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    validateInput2();
  }
});
type.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      validateInput3();
    }
  });
channel.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      validateInput4();
      maskmaker();
    }
  });
mask.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      validateInput5();
    }
  });

function reset() {
    idpar.value = "";
    idpar.classList.remove("green-border");
    fullname.value = "";
    fullname.classList.remove("green-border");
    type.value = "";
    type.classList.remove("green-border");
    channel.value = "";
    channel.classList.remove("green-border");
    mask.value = "";
    mask.classList.remove("green-border");
  }
function resetArea() {
    resultArea.value = "";
}

function validateInput1() {
  let regex = /^[a-zA-Z0-9]+$/;
  let idparValue = idpar.value;

  if (!regex.test(idparValue)) {
    idpar.value = '';
    idpar.classList.remove("green-border");
    alert("Помилка! Недопустимі символи!");
  } else if (idparValue.length < 1 || idparValue.length > 6) {
    idpar.value = '';
    idpar.classList.remove("green-border");
    alert("Помилка! Недопустима кількість символів!");
  } else {
    idpar.classList.add("green-border");
  }
}
function validateInput2() {
  let fullnameValue = fullname.value;

  if (fullnameValue.length < 15 || fullnameValue.length > 60) {
    fullname.value = '';
    fullname.classList.remove("green-border");
    alert("Помилка! Недопустима кількість символів!");
  } else {
    fullname.classList.add("green-border");
  }
}
function validateInput3() {
    let typeValue = type.value;
    if (typeValue.includes("1") || typeValue.includes("20")  || typeValue.includes("21")  || typeValue.includes("15")  ) {
        type.classList.add("green-border");
    } else {
        type.value = '';
        type.classList.remove("green-border");
        alert("Помилка! Недопустимий тип параметру!");
    }
  }
  function validateInput4() {
    let cnum = Number(channel.value);
    let letters = /[a-zA-Zа-яА-Я]/.test(channel.value);
    if (cnum>63 || cnum<0 || letters) {
      channel.value = '';
      channel.classList.remove("green-border");
      alert("Помилка! Недопустимий номер каналу!");
    } else if (channel.value == ''){
        channel.classList.remove("green-border");
        alert("Помилка!Введіть номер каналу!");
    } else {
        channel.classList.add("green-border");
    }
  }
  function validateInput5() {
    let masknum = Number(mask.value);
    let letters = /[a-zA-Zа-яА-Я]/.test(mask.value);
    if (masknum<0 || masknum>7 || letters) {
      mask.value = '';
      mask.classList.remove("green-border");
      alert("Помилка! Недопустимий номер розряду!");
    } else {
      mask.value = Math.pow(2,masknum)
      mask.classList.add("green-border");
    }
    
}
  function maskmaker(){
    let typeValuemask = Number(type.value);
    if (typeValuemask == 1 || typeValuemask == 15) {
        mask.value = "255";
        mask.classList.add("green-border");
      } else {
      }
  }

  function showResult() {
    let result = idpar.value + ":" + fullname.value + ":" + type.value + ":" + channel.value + ":" + mask.value;
    resultArea.value += result + "\n";
}

function loadFile() {
  var fileInput = document.getElementById('fileInput');


  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    resultArea.value = e.target.result;
  };

  reader.readAsText(file);
}


function loadTextFile() {
var text = resultArea.value;

var blob = new Blob([text], { type: "text/plain" });

var link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "file.txt";
link.click();

URL.revokeObjectURL(link.href);
}

