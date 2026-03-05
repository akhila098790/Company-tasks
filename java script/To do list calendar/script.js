function addTask(){

let task=document.getElementById("task").value;
let date=document.getElementById("date").value;
let time=document.getElementById("time").value;

if(task===""){
alert("Please enter a task");
return;
}

let li=document.createElement("li");

li.innerHTML = `
<span onclick="completeTask(this)">
${task} <br>
📅 ${date} ⏰ ${time}
</span>`;


document.getElementById("taskList").appendChild(li);

document.getElementById("task").value="";
document.getElementById("date").value="";
document.getElementById("time").value="";
}

function completeTask(task){
task.classList.toggle("completed");
}