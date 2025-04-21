/*
Basic user registration and login system using JavaScript. It uses an array to store user details and local 
storage to persist user data across sessions.*/
var detailsArray = []; // This initializes an empty array called detailsArray, which will store user information.

// User Registration Function
function register(){
    // Collecting User Input:
    let newUserPassword = document.getElementById('pwdRegister').value;
    let newUserEmail = document.getElementById("email").value;
    let newUserName = document.getElementById("usrNameRegister").value;
    let newFullName = document.getElementById("usrRegister").value;
    // Creating User Object:
    let userDetails = {
        fullname: newFullName,
        username: newUserName,
        useremail: newUserEmail,
        userpassword: newUserPassword
    };
    // Checking for Existing Username:
    for(let i = 0; i< detailsArray.length; i++) {
        if (detailsArray[i].username === newUserName) {
            document.getElementById("alert").innerText = "Username already exists!!";
            return;
        }

    }
            detailsArray.push(userDetails);
            localStorage.userRecord = JSON.stringify(detailsArray);


    document.getElementById('registrationForm').reset();
    window.location = "tickets.html";

}

function init() {
    if(localStorage.userRecord) {
        detailsArray = JSON.parse(localStorage.userRecord);
        for(let i = 0; i< detailsArray.length; i++){
            let fullName = detailsArray[i].fullname;
            let userName = detailsArray[i].username;
            let userEmail = detailsArray[i].useremail;
            let userPassword = detailsArray[i].userpassword;
        }
    }
}


function login(){

    let loginUserName = document.getElementById('usrLogin').value;
    let loginPassword = document.getElementById('pwdLogin').value;

    for (let i = 0; i < detailsArray.length; i++) {

        if(detailsArray[i].username === loginUserName && detailsArray[i].userpassword === loginPassword){
            localStorage.setItem('curUser', detailsArray[i].fullname);
            window.location = "tickets.html";
           }else{
            document.getElementById("loginAlert").innerHTML = "Error!! Try again";
            document.getElementById('loginForm').reset();

        }
    }


}


function welcome(){

    let display = localStorage.getItem('curUser').toUpperCase();
       let welcomeText = document.getElementById("headerTicket");
       welcomeText.style.fontSize = '25px';
       welcomeText.style.color='olive';
       welcomeText.class="text-primary";
       welcomeText.innerHTML ="Logged In:    "+ display
}


