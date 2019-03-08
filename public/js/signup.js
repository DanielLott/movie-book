$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var nameInput = $("input#name-input");
    var passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the name and password are not blank
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var inputData = {
            name: nameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!inputData.name || !inputData.password) {
            return;
        }
        // If we have a name and password, run the signUpFanatic function
        signUpFanatic(inputData.name, inputData.password);
        nameInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the home page
    // Otherwise we log any errors
    function signUpFanatic(inputName, inputPassword) {
        $.post("/api/signup", {
            name: inputName,
            password: inputPassword
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
