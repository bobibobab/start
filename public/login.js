
async function login(){
    const user = {
        "username": null,
        "password": null
    };

    user["username"] = document.getElementById('user').value;
    user["password"] = document.getElementById('pw').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user),
    });
    if(response.ok){
        const res = await fetch('/api/userinfo');
        var newuser = await res.json();

        localStorage.setItem("username", JSON.stringify(newuser));
        userInfo = localStorage.getItem("username");
        newUser = JSON.parse(userInfo);

        //window.location.href = "comsumtion_jaunary.html";
    }
    
}

function displayQuote(data){
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => { 
            const containerEl = document.querySelector('.quote'); 

            const pElement = containerEl.querySelector('p');

            pElement.textContent = data.content;
        
        });
}

displayQuote();

