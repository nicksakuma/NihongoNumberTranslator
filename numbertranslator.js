// VARIABLES
var english = "English";
var japanese = "日本語";
var leftLanguage = english;
//Japanese units used in translating
var units = [[100000000,"億"],[10000,"万"],[1000,"千"],[100,"百"],[10,"十"]];
var translationType = "none";

//CHANGE TRANSLATION SETTINGS
function pressTranslationTypeButton(clicked_id){
  document.getElementById("onClickBtn").classList.remove("btn-light")
  document.getElementById("onTypeBtn").classList.remove("btn-light")
  document.getElementById(clicked_id).classList.add("btn-light")
  translationType = clicked_id;
  console.log(translationType)

  switch(translationType){
    case "onClickBtn":
      document.getElementById("onClickDiv").classList.remove("hide");
      document.getElementById("onTypeDiv").classList.add("hide");
    break;
    case "onTypeBtn":
      document.getElementById("onTypeDiv").classList.remove("hide");
      document.getElementById("onClickDiv").classList.add("hide");
      break;
  };
};

function changeLanguage(){
  var y = findTranslateType()
  var leftText = document.getElementById('leftText'+y);
  var rightText = document.getElementById('rightText'+y);
  if(leftText.textContent === english){
    leftText.textContent = japanese;
    rightText.textContent = english;
    leftLanguage = japanese;
    clearTextBox()
  } else if (leftText.textContent === japanese){
    leftText.textContent = english;
    rightText.textContent = japanese;
    leftLanguage = english;
    clearTextBox()
  };
};

//Swap language on screen 
$(document).ready(function(){
  $('.languageSelect').change(function() {
    if(this.checked != true){
      console.log('JP<EN');
      changeLanguage();
    } else {
      console.log('EN>JP');
      changeLanguage();
    }
  });   
});



//CLEAR TEXTAREA

function clearTextBox(){
  var y = findTranslateType()
  document.getElementById("userInput"+y).value= "";
  document.getElementById("rightTextarea"+y).innerText= "";
};

//TRANSLATION
// Check if its ontype or onclick
function findTranslateType() {
  if(translationType==="onClickBtn"){
    var y="2";
    return y;
  } else {
    var y="1";
    return y;
  }}

//Takes userinput and translates
function numberTranslate(){
  var y = findTranslateType()
  var x = document.getElementById("userInput"+y).value;
  if(leftLanguage===english){
    console.log("translate from english")
    document.getElementById("rightTextarea"+y).innerHTML = engToJp(x);
  } else {
    console.log("translate from Japanese")
      if(isNaN(JpToEng(x))===true){
        document.getElementById("rightTextarea"+y).innerHTML = "Incorrect Format. Check the examples below";
      } else{
        console.log(JpToEng(x))
        document.getElementById("rightTextarea"+y).innerHTML = JpToEng(x);
      }
    
  }
}
  

//Eng number to JP number
function engToJp(x){
  var intermediateValue=x;
  var japaneseValue="";
  for(i=0;i<units.length;i++){
    // console.log(units[i]);
      if((intermediateValue/units[i][0])>=1){
          japaneseValue += Math.floor(intermediateValue/units[i][0])+units[i][1];
          // console.log(japaneseValue);
          intermediateValue = (intermediateValue%units[i][0]);
          // console.log(intermediateValue);
      };
  };
  return japaneseValue+intermediateValue;
};

//JP number to Eng number
function JpToEng(x){
  var intermediateValue = x;
  var japaneseValuePlaceholder="";
  var westernValue=0;
    for (i=0;i<intermediateValue.length;i++){
      var unit = findUnit(intermediateValue.charAt(i));
      if(unit !== null){
        westernValue += parseInt(japaneseValuePlaceholder)*unit; 
        japaneseValuePlaceholder = "";
      } else { 
        japaneseValuePlaceholder += intermediateValue.charAt(i);
      };
    };
    if(japaneseValuePlaceholder !== ""){
      westernValue += parseInt(japaneseValuePlaceholder);
    };
    return westernValue;
  };
//Find the japanese unit in x(string)
function findUnit(x){
  for (y=0;y<units.length;y++){
    if(units[y][1]===x){
      return units[y][0];           
    }
  };
  return null;  
};

//EXAMPLE
function showExample(){
  var y = findTranslateType()
  var element = document.getElementById("examples"+y);
  element.classList.toggle("hide");
};