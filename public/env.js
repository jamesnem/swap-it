function validatePassword() {
    var validatePassword = document.getElementById("registerPassword");
    var validateConfirmP = document.getElementById("confirmPassword");

    if (validatePassword.value != validateConfirmP.value) {
        validateConfirmP.setCustomValidity("Passwords Don't Match");
        
    } else {
        validateConfirmP.setCustomValidity('');
    }
}

$(document).ready(function () {
    password.onchange = validatePassword();
    validateConfirmp.onkeyup = validatePassword();
})
