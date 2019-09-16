function createStudentAccount()
{
    var studentAccounts = JSON.parse(localStorage.getItem("studentAccounts"));

    if (studentAccounts == null) studentAccounts = [ ];

    var username = txtUsername.value.trim().toLowerCase();

    for (var i = 0; i < studentAccounts.length; i++)
    {
        if (studentAccounts[i].username == username)
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
        gender: selectGender.value,
        grade: selectGrade.value,
        clubs: [ ]
    }

    studentAccounts.push(user);

    localStorage.setItem("studentAccounts", JSON.stringify(studentAccounts));
    alert("Account Made Successfully!");
    formLogin.action = "../login/login.html";
}