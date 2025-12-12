
function Start() {
switch (startBtn.value){
 case "開始" :
  startBtn.setAttribute("value", "停止");
  now = Date.now();
  cycle.textContent = 0;
  timerID = setInterval(Count, 100);
  break;
  case "停止" :
     clearInterval(timerID);
     startBtn.setAttribute("value","再開")
     resetBtn.removeAttribute("disabled");
     resultBtn.removeAttribute("disabled");
     break;
  case "再開" :
     startBtn.setAttribute("value","停止")
     now = Date.now() - (timeCount * 1000);
     timerID = setInterval(Count, 100);
     resetBtn.setAttribute("disabled","true");
     resultBtn.setAttribute("disabled","true");
     break;
 }
}

function Reset() {
 clearInterval(timerID);
 timeCount = 0;
 cycleCount = 0;
 cycle.textContent = "";
 timer.textContent = "";
 startBtn.setAttribute("value","開始");
 resetBtn.setAttribute("disabled","true");
 a1flag = false;
 a2flag = false;
}

function Result() {
  const key = Date.now();
  arr.push(key);
  localStorage.setItem(key,makeDate() );
  localStorage.setItem("keyDate" , JSON.stringify(arr));
  Reset();
  window.open("./result.html");
}

function makeDate() {
  const d = new Date();
  return (
    (d.getMonth() + 1) + "/" +
    d.getDate() + "/" +
    d.getHours() + ":" +
    Minute(d.getMinutes()) + " の記録 : " +
    cycleCount + " サイクル"
  );
}

function Minute(minute){
  return (minute.length != 1) ? "0" + minute : minute;
}


function Count() {
 timeCount = (Date.now() - now) / 1000;
 timeCount = Math.floor(timeCount * 10) / 10;
 timer.textContent = (timeCount % 1 != 0) ? timeCount : timeCount + ".0";
 For();
}


function For() {
 // 20秒で音を鳴らす
 if (timeCount >= 20 && a1flag == false) {
   audio1.play();
   a1flag = true; // 音1を鳴らしたらフラグを立てる
   now = Date.now();  // タイマーの再スタート
 }


 // 40秒で音を鳴らす
 if (timeCount >= 40 && a2flag == false) {
   audio2.play();
   a2flag = true; // 音2を鳴らしたらフラグを立てる
   // 40秒を過ぎたらカウントをリセット
   now = Date.now();  // タイマーの再スタート
   a1flag = false;    // 次回の音鳴らしのためにフラグをリセット
   a2flag = false;    // 次回の音鳴らしのためにフラグをリセット
   cycleCount += 1;
   cycle.textContent = cycleCount;
 }
}


const cycle = document.querySelector("#cycle");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const resultBtn = document.querySelector("#result");
const audio1 = document.querySelector("#audio1");
const audio2 = document.querySelector("#audio2");


let arr = JSON.parse(localStorage.getItem("keyDate") || "[]");
let a1flag = false;  // 音1が鳴ったかどうかのフラグ
let a2flag = false;  // 音2が鳴ったかどうかのフラグ
let timeCount = 0;   // 経過時間
let cycleCount = 0;  // サイクル回数
let flag = 0;
let now;             // タイマー開始時の時刻
let timerID;         // タイマーID


startBtn.addEventListener("click", Start);
resetBtn.addEventListener("click", Reset);
resultBtn.addEventListener("click", Result);