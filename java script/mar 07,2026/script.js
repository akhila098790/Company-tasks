

function showLogin(){
    document.getElementById("registerForm").style.display="none";
    document.getElementById("loginForm").style.display="block";
}

function showRegister(){
    document.getElementById("loginForm").style.display="none";
    document.getElementById("registerForm").style.display="block";
}

function registerUser(){

    let username=document.getElementById("regUser").value;
    let password=document.getElementById("regPass").value;

    if(username==="" || password===""){
        alert("Fill the given fields");
        return;
    }


    let storedUser=localStorage.getItem("username");

    if(storedUser===username){
        alert("Already Registered");
    }else{
        localStorage.setItem("username",username);
        localStorage.setItem("password",password);
        alert("Registration Successful");
    }

}

function loginUser(){

    let username=document.getElementById("loginUser").value;
    let password=document.getElementById("loginPass").value;

    let storedUser=localStorage.getItem("username");
    let storedPass=localStorage.getItem("password");

    if(username===storedUser && password===storedPass){

        alert("Login successful");

        document.getElementById("loginForm").style.display="none";
        document.getElementById("dashboard").style.display="block";

    }else{
        alert("Invalid username or password");
    }

}