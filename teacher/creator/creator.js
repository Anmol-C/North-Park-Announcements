var announcements = [ ];

function getAnnouncementsFromLocalStorage()
{
    announcements = JSON.parse(localStorage.getItem("announcements"));
    if (announcements == null) announcements = [ ];    
}

function postAnnouncementsToLocalStorage()
{
    localStorage.setItem("announcements", JSON.stringify(announcements));
}



function addAnnouncementToList()
{
    var description = document.getElementById("txtDescription").value;
    var subject = document.getElementById("selectSubject").value;
    var sendToAll = document.getElementById("checkBoxSendToAll").checked;

    var genders = [ ];
    if (document.getElementById("checkBoxMale").checked) genders.push("male");
    if (document.getElementById("checkBoxFemale").checked) genders.push("female");
    if (document.getElementById("checkBoxOther").checked) genders.push("other");

    var grades = [ ];
    if (document.getElementById("checkBoxGrade9").checked) grades.push("9");
    if (document.getElementById("checkBoxGrade10").checked) grades.push("10");
    if (document.getElementById("checkBoxGrade11").checked) grades.push("11");
    if (document.getElementById("checkBoxGrade12").checked) grades.push("12");


    var announcement = {
        description: description,
        subject: subject,
        genders: genders,
        grades: grades,
        sendToAll: sendToAll
    }

    announcements.push(announcement);
    postAnnouncementsToLocalStorage();
}