if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
            
function validateForm() {
    var formIsValide = true;
    var errorMessage = ""; 
    var form = document.getElementById("loginForm");
    
    if(!(document.getElementById('admin').checked || document.getElementById('driver').checked)) {
        formIsValide = false;
        errorMessage += "user type is not selected.\n";
    }
    if(document.getElementById("username").value.length == 0){
        formIsValide = false;
        errorMessage += "username is not defined.\n";
    }
    if(document.getElementById("password").value.length == 0){
        formIsValide = false;
        errorMessage += "password is not defined.";
    }

    if(formIsValide){
        form.submit();
    }else {
        alert(errorMessage);
    }
}

document.getElementById("btnSubmit").addEventListener('click', function() {
    event.preventDefault(); 
    validateForm();
});