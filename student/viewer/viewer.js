var announcements = [ ];


function checkLogin()
{
    if (sessionStorage.getItem("userId") == null || sessionStorage.getItem("userType") != "student") document.location.href = "../login/login.html";
}


function getAnnouncements()
{
	document.getElementById("container-announcements").innerHTML = "";
	var clubs = JSON.parse(localStorage.getItem("clubs"));
	var userId = sessionStorage.getItem("userId");
	var clubId;
	var announcements = [ ];


	if (!document.getElementById("checkBoxFilterGeneralAnnouncements").checked)
	{
		if (clubs == null) return;
		for (var i = 0; i < clubs.length; i++)
		{
			if (clubs[i].membersApproved.indexOf(userId) != -1)
			{
				if (document.getElementById("checkBoxFilter" + i.toString()).checked)
				{
					clubId = i;
					announcements = clubs[i].announcements;
					break;
				}
			}
		}
	}
	else
	{
		var generalAnnouncements = JSON.parse(localStorage.getItem("generalAnnouncementList"));
		if (generalAnnouncements == null) generalAnnouncements = [ ];
		announcements = generalAnnouncements;
	}

	for (var i = 0; i < announcements.length; i++)
	{
		var html

		if (document.getElementById("checkBoxFilterGeneralAnnouncements").checked)
		{
			html =
			"<div class='announcement' id='announcement" + i.toString() + "'>" +
				"<span class='announcement-sub-header'>Title: </span><span class='title'>" + announcements[i].title + "</span><br>" +
				"<span class='announcement-sub-header'>Teacher Name: </span><span class='teacherName'>" + announcements[i].teacherName + "</span><br>" +
				"<span class='announcement-sub-header'>Description: </span><span class='description'>" + announcements[i].description + "</span><br>" +
				"<span class='announcement-sub-header'>Date: </span><span class='date'>" + announcements[i].date + "</span><br>" +
			"</div>";
		}
		else
		{
			html =
			"<div class='announcement' id='announcement" + i.toString() + "'>" +
				"<span class='announcement-sub-header'>Title: </span><span class='title'>" + announcements[i].title + "</span><br>" +
				"<span class='announcement-sub-header'>Description: </span><span class='description'>" + announcements[i].description + "</span><br>" +
				"<span class='announcement-sub-header'>Date: </span><span class='date'>" + announcements[i].date + "</span><br>" +
			"</div>";
		}

		document.getElementById("container-announcements").innerHTML = document.getElementById("container-announcements").innerHTML + html;
	}

}



function updateSelectClub()
{
	var clubs = JSON.parse(localStorage.getItem("clubs"));
	var studentAccounts = JSON.parse(localStorage.getItem("studentAccounts"));
	var userId = sessionStorage.getItem("userId");

	if (clubs == null) return;

	for (var i = 0; i < clubs.length; i++)
	{
		if (clubs[i].genders.indexOf(studentAccounts[userId].gender) != -1 && clubs[i].grades.indexOf(studentAccounts[userId].grade) != -1) 
		{
			var option = document.createElement("option");
			option.value = i;
			option.innerHTML = clubs[i].name;
			selectClub.add(option);
		}
	}
}

function updateClubDetails()
{
    var genderLine = "";
    var gradesLine = "";
    var teacherName = "";
    var status = "";
    var clubs = JSON.parse(localStorage.getItem("clubs"));
    var teacherAccounts = JSON.parse(localStorage.getItem("teacherAccounts"));
    var clubId = selectClub.value;
	var userId = sessionStorage.getItem("userId");

	if (selectClub.value == "") return;

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

    if (clubs[clubId].membersApproved.indexOf(userId) != -1) status = "Approved";
    else if (clubs[clubId].membersAwaiting.indexOf(userId) != -1) status = "Awaiting Approval";
    else status = "Not Enrolled";

    var teacherId = clubs[clubId].teacherId;
    teacherName = teacherAccounts[teacherId].firstName + " " + teacherAccounts[teacherId].lastName;

    document.getElementById("pStatus").innerHTML = "<strong>Status:</strong> " + status;
    document.getElementById("pGrades").innerHTML = "<strong>Grades:</strong> " + gradesLine;
    document.getElementById("pGenders").innerHTML = "<strong>Gender:</strong> " + genderLine;
    document.getElementById("pTeacherName").innerHTML = "<strong>Teacher:</strong> " + teacherName;
}


function enroll()
{
	var clubs = JSON.parse(localStorage.getItem("clubs"));
	var clubId = selectClub.value;
	var userId = sessionStorage.getItem("userId");

	if (selectClub.value == "") return;

	clubs[clubId].membersAwaiting.push(userId);

	localStorage.setItem("clubs", JSON.stringify(clubs));
	alert("Enrolled Successfuly! Please await approval.")
}

function disenroll()
{
	var clubs = JSON.parse(localStorage.getItem("clubs"));
	var clubId = selectClub.value;
	var userId = sessionStorage.getItem("userId");
	
	if (selectClub.value == "") return;

	var idx = clubs[clubId].membersAwaiting.indexOf(userId);

	if (idx != -1)
	{
		clubs[clubId].membersAwaiting.splice(idx, 1); 
	}

	idx = clubs[clubId].membersApproved.indexOf(userId);

	if (idx != -1)
	{
		clubs[clubId].membersApproved.splice(idx, 1); 
	}

	localStorage.setItem("clubs", JSON.stringify(clubs));
	alert("Disenrolled Successfully!")
}

function showCheckBoxes()
{
	var clubs = JSON.parse(localStorage.getItem("clubs"));
	var userId = sessionStorage.getItem("userId");

	document.getElementById("containerCheckBoxes").innerHTML =
		"<label><input type='radio' onchange='getAnnouncements();' name='filter' id='checkBoxFilterGeneralAnnouncements' value='general' checked>General Announcements</label>";

	if (clubs == null) return; 
	for (var i = 0; i < clubs.length; i++)
	{
		if (clubs[i].membersApproved.indexOf(userId) != -1)
		{
			document.getElementById("containerCheckBoxes").innerHTML +=
				"<label><input type='radio' name='filter' onchange='getAnnouncements();' value=''" + i.toString() + "' id='checkBoxFilter" + i.toString() + "''>" + clubs[i].name + "</label>";
		}
	}
}


function logout()
{
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    document.location.href = "../login/login.html";
}
