function login()
{
    var studentAccounts = JSON.parse(localStorage.getItem("studentAccounts"));

    if (studentAccounts == null)
    {
        alert("No Registered Accounts!");
        return;
    }

    for (var i = 0; i < studentAccounts.length; i++)
    {
        if (studentAccounts[i].username == txtUsername.value && studentAccounts[i].password == txtPassword.value)
        {
            sessionStorage.setItem("userId", i);
            sessionStorage.setItem("userType", "student");
            alert("Login Successful");
            formLogin.action = "../viewer/viewer.html";
            return;
        }
    }

    alert("Incorrect Login Information!");
}