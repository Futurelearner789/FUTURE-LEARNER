// ==========================
// 🔐 LOGIN SYSTEM
// ==========================

function signup(){
let user=document.getElementById("user")?.value;
let pass=document.getElementById("pass")?.value;

if(!user || !pass){
alert("Enter username and password");
return;
}

localStorage.setItem("user",user);
localStorage.setItem("pass",pass);

alert("Account Created");
}

function login(){
let user=document.getElementById("user")?.value;
let pass=document.getElementById("pass")?.value;

if(
localStorage.getItem("user")===user &&
localStorage.getItem("pass")===pass
){
localStorage.setItem("loggedIn","true");
alert("Login Successful");
}else{
alert("Wrong details");
}
}

function logout(){
localStorage.setItem("loggedIn","false");
alert("Logged Out");
}


// ==========================
// 📝 NOTES SYSTEM
// ==========================

function addNote(){
let input=document.getElementById("noteInput");
if(!input) return;

let notes=JSON.parse(localStorage.getItem("notes")) || [];

if(input.value.trim()===""){
alert("Write something first");
return;
}

notes.push(input.value);
localStorage.setItem("notes", JSON.stringify(notes));

input.value="";
displayNotes();
updateDashboard();
}

function displayNotes(){
let container=document.getElementById("notesContainer");
if(!container) return;

let notes=JSON.parse(localStorage.getItem("notes")) || [];

container.innerHTML="";

notes.forEach((note,index)=>{
let div=document.createElement("div");
div.className="note";

div.innerHTML = `
${note}
<br>
<button onclick="deleteNote(${index})">Delete</button>
`;

container.appendChild(div);
});
}

function deleteNote(index){
let notes=JSON.parse(localStorage.getItem("notes")) || [];
notes.splice(index,1);
localStorage.setItem("notes", JSON.stringify(notes));

displayNotes();
updateDashboard();
}

function searchNotes(){
let input=document.getElementById("search");
if(!input) return;

let value=input.value.toLowerCase();

document.querySelectorAll(".note").forEach(note=>{
note.style.display = note.innerText.toLowerCase().includes(value)
? "block" : "none";
});
}


// ==========================
// 📊 DASHBOARD
// ==========================

function updateDashboard(){
let notes=JSON.parse(localStorage.getItem("notes")) || [];
let el=document.getElementById("totalNotes");

if(el){
el.innerText = notes.length;
}
}


// ==========================
// 🎓 QUIZ SYSTEM
// ==========================

function checkAnswer(correct, chosen){
let result=document.getElementById("quizResult");
if(!result) return;

if(correct === chosen){
result.innerText = "Correct ✅";
}else{
result.innerText = "Wrong ❌";
}
}


// ==========================
// 🔍 GLOBAL SEARCH
// ==========================

function globalSearch(value){
let result=document.getElementById("searchResult");
if(!result) return;

value=value.toLowerCase();

if(value.includes("ai")) result.innerText="Go to AI page";
else if(value.includes("web")) result.innerText="Go to Web Dev page";
else if(value.includes("economy")) result.innerText="Go to Economy page";
else if(value.includes("digital")) result.innerText="Go to Digital page";
else result.innerText="No match found";
}


// ==========================
// 🚀 AUTO LOAD
// ==========================

window.onload = function(){
displayNotes();
updateDashboard();
};