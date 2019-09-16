function addClubToLocalStorage()
{
    var teacherId = sessionStorage.getItem("userId");
    var clubs = JSON.parse(localStorage.getItem("clubs"));

    if (clubs == null) clubs = [ ];

    var genders = [ ];
    if (document.getElementById("checkBoxMale").checked) genders.push("male");
    if (document.getElementById("checkBoxFemale").checked) genders.push("female");
    if (document.getElementById("checkBoxOther").checked) genders.push("other");

    var grades = [ ];
    if (document.getElementById("checkBoxGrade9").checked) grades.push("9");
    if (document.getElementById("checkBoxGrade10").checked) grades.push("10");
    if (document.getElementById("checkBoxGrade11").checked) grades.push("11");
    if (document.getElementById("checkBoxGrade12").checked) grades.push("12");

    var club = {
        "name": txtClubName.value,
        "teacherId": teacherId,
        "grades": grades,
        "genders": genders,
        "announcements": [ ],
        "membersAwaiting": [ ],
        "membersApproved": [ ]
    }

    clubs.push(club);

    localStorage.setItem("clubs", JSON.stringify(clubs));
    alert("Club Added Successfully!")
}

function logout()
{
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    document.location.href = "../../login/login.html";
}

function checkLogin()
{
    if (sessionStorage.getItem("userId") == null || sessionStorage.getItem("userType") != "teacher") document.location.href = "../../login/login.html";
}
