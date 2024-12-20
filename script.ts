// Get all the input elements from the form
 const form=document.getElementById('resumeform') as HTMLFormElement;
 const resumeoutputelement= document.getElementById('resume-output') as HTMLDivElement;
const shareableLinkConatiner = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-Link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-Pdf') as HTMLButtonElement;

//   handle form submission
form.addEventListener('submit',(event:Event)=>{
    
    event.preventDefault(); //prevent page reload
    const username =  (document.getElementById('username') as HTMLInputElement).value; 
const nameInput = (document.getElementById('name') as HTMLInputElement).value;
const emailInput = (document.getElementById('email') as HTMLInputElement).value;
const phoneInput = (document.getElementById('phone') as HTMLInputElement).value;
const educationInput = (document.getElementById('education') as HTMLTextAreaElement).value;
const skillsInput = (document.getElementById('skills') as HTMLTextAreaElement).value;
const experienceInput = (document.getElementById('experience') as HTMLTextAreaElement).value;



//save form data in local storage with the user name as the key
const resumeData = {
    name:String, 
    email:String,
    phone:String,
     education:String, 
     skill:String,
     experience: String, 
};
localStorage.setItem(username, JSON.stringify(resumeData));
const resumeHTML = `
<h2>shareable Personal Information</h2>
<p><b>Name:</b><span contenteditable = "true">${nameInput}</span></p>
<p><b>Email:</b><span contenteditable = "true">${emailInput}</span></p>
<p><b>Phone:</b><span contenteditable = "true">${phoneInput}</span></p>
<h3>Education</h3>
<p contenteditable = "true">${educationInput}</p>
<h3>Experience</h3>
<p contenteditable = "true">${experienceInput}</p>
<h3>Skills</h3>
<p contenteditable = "true">${skillsInput}</p>
`;
// display generated resume
    resumeoutputelement.innerHTML = resumeHTML
    // Generate the shareable URL with username only
    const shareableURL =
    `${window.location.origin}?username = ${encodeURIComponent(username)}` ;
    // Display shareable link
    shareableLinkConatiner.style.display ='block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle pdf download
downloadPdfButton.addEventListener('click',()=>{
    window.print(); //this will open the print dialog and allow the user to save as pdf

});
// prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded',() =>{
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if(username){
        // Autofill form if data is found in localStorage
        const saveResumeData = localStorage.getItem(username);
        if(saveResumeData){
            const resumeData = JSON.parse(saveResumeData);
            (document.getElementById('username') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;
        }

        }
    
});
