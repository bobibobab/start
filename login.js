
function login(){
    const user = {
        "username": null,
        "password": null
    }

    user["username"] = document.getElementById('user').value;
    user["password"] = document.getElementById('pw').value;
    
    localStorage.setItem("username", JSON.stringify(user));
    userInfo = localStorage.getItem("username");
    newUser = JSON.parse(userInfo);
    
    window.location.href = "comsumtion_jaunary.html";
}

