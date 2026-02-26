let isLogin = true;
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  function toggleForm(){
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Register";
    authBtn.textContent = isLogin ? "Login" : "Register";
    switchText.textContent = isLogin ? "Don't have an account? Register" : "Already have an account? Login";
  }

  function handleAuth(){
    const u = username.value.trim();
    const p = password.value.trim();
    if(!u || !p) return alert("Enter username & password");

    if(isLogin){
      if(users[u] && users[u]===p) startQuiz();
      else alert("Invalid login");
    } else {
      if(users[u]) return alert("User exists");
      users[u]=p;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered! Please login.");
      toggleForm();
    }
  }

 