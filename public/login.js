(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        //document.querySelector('#playerName').textContent = userName;
        setDisplay('loginProcess', 'none');
        setDisplay('playControls', 'block');
        setDisplay('comsumption', 'block');
        setDisplay('about', 'block');

    } else {
        setDisplay('loginProcess', 'block');
        setDisplay('playControls', 'none');
        setDisplay('comsumption', 'none');
        setDisplay('about', 'none');
    }
})();

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}


async function loginOrCreate(endpoint){
    const user = {
        "username": null,
        "password": null
    };

    user["username"] = document.getElementById('user').value;
    user["password"] = document.getElementById('pw').value;
    console.log(user);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user),
    });
    if(response.ok){
        const res = await fetch(`/api/userinfo/${user.username}`);
        var newuser = await res.json();
        console.log(newuser);
        localStorage.setItem("userName", JSON.stringify(newuser));
        userInfo = localStorage.getItem("userName");
        newUser = JSON.parse(userInfo);

        window.location.href = "comsumtion_jaunary.html";
    } else {
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
    
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function comsumption(){
    window.location.href = "comsumtion_jaunary.html";
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

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
        playControlEl.style.display = display;
    }
}

displayQuote();

