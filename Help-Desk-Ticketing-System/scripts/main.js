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
    // Storing User Information:
            detailsArray.push(userDetails);
            localStorage.userRecord = JSON.stringify(detailsArray);

    // Resetting the Form and Redirecting:
    document.getElementById('registrationForm').reset();
    window.location = "tickets.html";

}
// This function retrieves stored user records from local storage when the application initializes.
function init() {
    // Loading User Data:
    if(localStorage.userRecord) {
        detailsArray = JSON.parse(localStorage.userRecord);
        for(let i = 0; i< detailsArray.length; i++){
            let fullName = detailsArray[i].fullname;
            let userName = detailsArray[i].username;
            let userEmail = detailsArray[i].useremail;
            let userPassword = detailsArray[i].userpassword;
        }
    }
} // If user records exist in local storage, they are parsed back into the detailsArray. 
  // However, the inner loop does not currently do anything with the data.


function login(){
    // It retrieves the username and password entered by the user.
    let loginUserName = document.getElementById('usrLogin').value;
    let loginPassword = document.getElementById('pwdLogin').value;
    // Validating User Credentials:
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
/*
    The function checks if the entered credentials match any user in detailsArray.
    If a match is found, it saves the user's full name in local storage and redirects to "tickets.html".
    If the credentials do not match, it shows an error message and resets the login form.
*/
function welcome(){

    let display = localStorage.getItem('curUser').toUpperCase();
       let welcomeText = document.getElementById("headerTicket");
       welcomeText.style.fontSize = '25px';
       welcomeText.style.color='olive';
       welcomeText.class="text-primary";
       welcomeText.innerHTML ="Logged In:    "+ display
}
// function retrieves the current user's name from local storage, formats it to uppercase, and displays it in a designated header element with specified styles.

