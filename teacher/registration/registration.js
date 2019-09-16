function createTeacherAccount()
{
    var teacherAccounts = JSON.parse(localStorage.getItem("teacherAccounts"));
    var username = txtUsername.value.trim().toLowerCase();

    if (teacherAccounts == null) teacherAccounts = [ ];

    for (var i = 0; i < teacherAccounts.length; i++)
    {
        if (teacherAccounts[i].username == username)
        {
            alert("Username already registered! Please try logging in.")
            return;
        }
    }

    var user = {
        username: username,
        password: txtPassword.value,
        firstName: txtFirstName.value,
        lastName: txtLastName.value,
        clubs: [ ]
    }

    teacherAccounts.push(user);

    localStorage.setItem("teacherAccounts", JSON.stringify(teacherAccounts));
    alert("Account Made Successfully!");
    formLogin.action = "../login/login.html";
}