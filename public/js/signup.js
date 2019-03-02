$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var User_NameInput = $("input#User-input");
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        User_Name: User_NameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.User_Name || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.User_Name, userData.password);
      User_NameInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(User_Name, password) {
      $.post("/api/signup", {
        User_Name: User_Name,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  