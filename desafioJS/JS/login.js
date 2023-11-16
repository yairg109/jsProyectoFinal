let token = localStorage.getItem("token");
const login = () => {


let mail =document.getElementById("mail").value;
let pass = document.getElementById("password").value;
if (mail && pass){
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  localStorage.setItem("token", token);
  //location.reload();
  window.location.href = "index.html"
}

}




let loginButton = document.getElementById("btn-create-login");
loginButton.addEventListener("click", login);
