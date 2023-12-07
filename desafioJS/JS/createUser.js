let token = localStorage.getItem("token");
const postUser = async () => {
    let mail =document.getElementById("mail").value;
    let pass = document.getElementById("password").value;
    let userBody = {email: mail, password:pass}
    console.log(userBody)
    console.log(JSON.stringify(userBody))
    let response = await fetch("http://localhost:3000/users",{
        method: "POST",
        body: JSON.stringify(userBody),
        headers: {
            "Content-Type": "application/json",
          },
      
    })
    let newuser = await response.json()
    console.log(newuser)
    login(mail,pass)
    return newuser
}

const login = (mail,pass) => {
  if (mail && pass){
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    localStorage.setItem("token", token);
    //location.reload();
    window.location.href = "index.html"
  }
}

let createUserButton = document.getElementById("btn-create-user");
createUserButton.addEventListener("click", () => {postUser()});