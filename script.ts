// listing element
document.getElementById("resumeForm")?.addEventListener("submit", function(event){
    event.preventDefault();

// Get form elements

const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;

const nameElement = document.getElementById("name") as HTMLInputElement;
const emailElement = document.getElementById("email") as HTMLInputElement;
const phoneElement = document.getElementById("phone") as HTMLInputElement;
const educationElement = document.getElementById("education") as HTMLTextAreaElement;
const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

//Check if all elements are present
if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement)
{
// Get values from Form   
    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;


//Handle profile picture elements
const profilePictureFile = profilePictureInput.files?.[0]
const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : ""; 
    
//Generate the resume html content    
const resumeHTML = `
<h2> Resume </h2>
${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
<p><strong> Name: </strong> ${name} </p>
<p><strong> Email: </strong> ${email} </p>
<p><strong> Phone: </strong> ${phone} </p>

<h3> Education </h3>
<p> ${education} </p>

<h3> Experience </h3>
<p> ${experience} </p>

<h3> Skills </h3>
<p> ${skills} </p>

`;

//Display the resume in thr output container
const resumeOutputElement = document.getElementById("resumeOutput");
if(resumeOutputElement){
    resumeOutputElement.innerHTML = resumeHTML;
    resumeOutputElement.classList.remove("hidden");

// Create container for button
const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
resumeOutputElement.appendChild(buttonContainer);

//Add download PDF button
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download As PDF";
downloadButton.addEventListener("click", () => {
    window.print();
});
buttonContainer.appendChild(downloadButton);

//Add shareable link button
const shareableLinkButton =document.createElement("button");
shareableLinkButton.textContent = "Copy Shareable Link";
shareableLinkButton.addEventListener("click", async () => {
    try {
        //Create a unique shareable link (stimulate in thid case)
        const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;

        //Use clipboard API to copy the shareable link
        await navigator.clipboard.writeText(shareableLink);
        alert("shareable link copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy link to clipbord.Please try again.");
    }
});
buttonContainer.append(shareableLinkButton);
} else {
    console.error("Resume output container not found");
}
} else {
    console.error("Form elements are missing");
}
});






