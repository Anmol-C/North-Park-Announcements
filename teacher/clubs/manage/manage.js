function checkLogin()
{
    if (sessionStorage.getItem("userId") == null || sessionStorage.getItem("userType") != "teacher") document.location.href = "../../login/login.html";
}

function loadClubs()
{
    selectClub.innerHTML = "";

    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var teacherId = sessionStorage.getItem("userId");

    if (clubs != null && teacherId != null)
    {
        for (var i = 0; i < clubs.length; i++)
        {
            if (clubs[i].teacherId == teacherId)
            {
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = clubs[i].name;
                selectClub.add(option);
            }
        }
    }
}


function updateClubDetails()
{
    updateMemberList();

    var genderLine = "";
    var gradesLine = "";
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var clubId = selectClub.value;

    if (clubs == null || clubs == [ ]) return;

    if (clubs[clubId].genders.length != 3)
    {
        for (var j = 0; j < clubs[clubId].genders.length; j++)
        {
            if (clubs[clubId].genders[j] == "male") genderLine += "Male";
            else if (clubs[clubId].genders[j] == "female") genderLine += "Female";
            else if (clubs[clubId].genders[j] == "other") genderLine += "Other";

            if (j != clubs[clubId].genders.length - 1) genderLine += ", ";
        }
    }
    else genderLine = "All";

    if (clubs[clubId].grades.length != 4)
    {
        for (var j = 0; j < clubs[clubId].grades.length; j++)
        {
            gradesLine += clubs[clubId].grades[j];
            if (j != clubs[clubId].grades.length - 1) gradesLine += ", ";
        }
    }
    else gradesLine = "All";

    document.getElementById("pGrades").innerHTML = "<strong>Grades:</strong> " + gradesLine;
    document.getElementById("pGenders").innerHTML = "<strong>Gender:</strong> " + genderLine;
}


function removeClub()
{
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var teacherId = sessionStorage.getItem("userId");
    var clubId = selectClub.value;

    if (clubs != null && teacherId != null)
    {
        if (confirm("Are you sure you want to delete this club?") == false) return;

        if (clubs[clubId].teacherId == teacherId)
        {
            clubs.splice(clubId, 1);
            localStorage.setItem("clubs", JSON.stringify(clubs));
            loadClubs();
            alert("Club Removed Successfully!");
        } 
    }
}

function addAnnouncement()
{
    var clubId = selectClub.value;
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var teacherId = sessionStorage.getItem("userId");
    var teacherAccounts = JSON.parse(localStorage.getItem("teacherAccounts"));
    var teacherName = teacherAccounts[teacherId].firstName + " " + teacherAccounts[teacherId].lastName;

    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var time = "";
    if (date.getHours() > 12) time = date.getHours() - 12 + ":" + date.getMinutes() + "PM";
    else time = date.getHours() + ":" + date.getMinutes() + "AM";

    var announcement = {
        teacherId: teacherId,
        teacherName: teacherName,
        title: txtTitle.value,
        date: days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + time, 
        description: txtDescription.value
    }

    if (checkBoxSendToAll.checked)
    {
        var generalAnnouncementList = JSON.parse(localStorage.getItem("generalAnnouncementList"));

        if (generalAnnouncementList == null) generalAnnouncementList = [ ];
        generalAnnouncementList.push(announcement);
        localStorage.setItem("generalAnnouncementList", JSON.stringify(generalAnnouncementList));
    }
    else if (selectClub.value == "")
    {
        alert("No Club Selected!");
        return;
    }
    else
    {
        clubs[clubId].announcements.push(announcement);

        localStorage.setItem("clubs", JSON.stringify(clubs));
    }
}

function logout()
{
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    document.location.href = "../../login/login.html";
}


function updateMemberList()
{
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var clubId = selectClub.value;
    var tableMembers = document.getElementById("tableMembers");
    var studentAccounts = JSON.parse(localStorage.getItem("studentAccounts"));

    if (clubs == null || clubs == [ ]) return;

    tableMembers.innerHTML = 
        "<tr>" +
			"<td><strong>Member</strong></td>" +
			"<td><strong>Status</strong></td>" +
			"<td></td>"
		"</tr>";

    for (var i = 0; i < clubs[clubId].membersApproved.length; i++)
    {
        var userId = clubs[clubId].membersApproved[i];
        tableMembers.innerHTML = tableMembers.innerHTML + 
            "<tr>" +
                "<td>" + studentAccounts[userId].firstName + " " + studentAccounts[userId].lastName + "</td>" +
                "<td>Approved</td>" +
                "<td><button onclick='removeMember(\"" + userId + "\");'>Remove?</button></td>" +
            "</tr>";
    }

    for (var i = 0; i < clubs[clubId].membersAwaiting.length; i++)
    {
        var userId = clubs[clubId].membersAwaiting[i];
        tableMembers.innerHTML = tableMembers.innerHTML + 
            "<tr>" +
                "<td>" + studentAccounts[userId].firstName + " " + studentAccounts[userId].lastName + "</td>" +
                "<td><button onclick='approveMember(\"" + userId + "\");'>Approve?</button></td>" +
            "</tr>";
    }
}

function approveMember(userId)
{
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var clubId = selectClub.value;

    var idx = clubs[clubId].membersAwaiting.indexOf(userId);

    clubs[clubId].membersApproved.push(clubs[clubId].membersAwaiting[idx]);
    clubs[clubId].membersAwaiting.splice(idx, 1);
    localStorage.setItem("clubs", JSON.stringify(clubs));
    alert("Member Approved!");

    updateMemberList();
}


function removeMember(userId)
{
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var clubId = selectClub.value;

    var idx = clubs[clubId].membersApproved.indexOf(userId);

    clubs[clubId].membersApproved.splice(idx, 1);
    localStorage.setItem("clubs", JSON.stringify(clubs));
    alert("Member Removed!");

    updateMemberList();
}