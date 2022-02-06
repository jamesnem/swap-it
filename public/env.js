//Declare variables to user password inputs
var passwordValidate = document.getElementById("registerPassword");
var confirmValidate = document.getElementById("confirmPassword");

//Create function that compares password and confirm password input fields
function validatePassword() {
    if (passwordValidate.value != confirmValidate.value ) {
        confirmValidate.setCustomValidity('Passwords don\'t\ match');
    }
    else {
        confirmValidate.setCustomValidity('')
    }
}

//Funtions and methods that are declared once document is opened
$(document).ready(function () {
    passwordValidate.onchange = validatePassword();
    confirmValidate.onkeyup = validatePassword();
})
