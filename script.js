// Get all the input elements from the form
var form = document.getElementById('resumeform');
var resumeoutputelement = document.getElementById('resume-output');
var shareableLinkConatiner = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-Link');
var downloadPdfButton = document.getElementById('download-Pdf');
//   handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    var username = document.getElementById('username').value;
    var nameInput = document.getElementById('name').value;
    var emailInput = document.getElementById('email').value;
    var phoneInput = document.getElementById('phone').value;
    var educationInput = document.getElementById('education').value;
    var skillsInput = document.getElementById('skills').value;
    var experienceInput = document.getElementById('experience').value;
    //save form data in local storage with the user name as the key
    var resumeData = {
        name: String,
        email: String,
        phone: String,
        education: String,
        skill: String,
        experience: String,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n<h2>shareable Personal Information</h2>\n<p><b>Name:</b><span contenteditable = \"true\">".concat(nameInput, "</span></p>\n<p><b>Email:</b><span contenteditable = \"true\">").concat(emailInput, "</span></p>\n<p><b>Phone:</b><span contenteditable = \"true\">").concat(phoneInput, "</span></p>\n<h3>Education</h3>\n<p contenteditable = \"true\">").concat(educationInput, "</p>\n<h3>Experience</h3>\n<p contenteditable = \"true\">").concat(experienceInput, "</p>\n<h3>Skills</h3>\n<p contenteditable = \"true\">").concat(skillsInput, "</p>\n");
    // display generated resume
    resumeoutputelement.innerHTML = resumeHTML;
    // Generate the shareable URL with username only
    var shareableURL = "".concat(window.location.origin, "?username = ").concat(encodeURIComponent(username));
    // Display shareable link
    shareableLinkConatiner.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle pdf download
downloadPdfButton.addEventListener('click', function () {
    window.print(); //this will open the print dialog and allow the user to save as pdf
});
// prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var saveResumeData = localStorage.getItem(username);
        if (saveResumeData) {
            var resumeData = JSON.parse(saveResumeData);
            document.getElementById('username').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
