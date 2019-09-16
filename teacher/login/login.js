function login()
{
    var teacherAccounts = JSON.parse(localStorage.getItem("teacherAccounts"));

    if (teacherAccounts == null)
    {
        alert("No Registered Accounts!");
        return;
    } 

    for (var i = 0; i < teacherAccounts.length; i++)
    {
        if (teacherAccounts[i].username == txtUsername.value && teacherAccounts[i].password == txtPassword.value)
        {
            sessionStorage.setItem("userId", i);
            sessionStorage.setItem("userType", "teacher");
            alert("Login Successful");
            formLogin.action = "../clubs/manage/manage.html";
            return;
        }
    }

    alert("Incorrect Login Information!");
}