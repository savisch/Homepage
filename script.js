// JS for the make profile page
if(document.title == "Make Profile"){
    const createButton = document.getElementById("create");
    createButton.addEventListener("click", store);

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clear);

    function store(){
        localStorage.firstName = document.getElementById("first-name").value;
        localStorage.lastName = document.getElementById("last-name").value;
        localStorage.pCity = document.getElementById("p-city").value;
        localStorage.pState = document.getElementById("p-state").value;
        localStorage.pCountry = document.getElementById("p-country").value;
        localStorage.dateOfBirth = document.getElementById("date-of-birth").value;
        localStorage.bio = document.getElementById("bio").value;

        const fileImage = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function(){
            localStorage.imageData = reader.result.replace(/^data:image\/(jpe?g|png);base64,/, "");
        }, false);

        if(fileImage){
            reader.readAsDataURL(fileImage);
        };
    };

    function clear(){
        localStorage.clear();
    };
};

// JS for the profile page
if(document.title == "Profile"){
    const profileName = document.getElementById("profile-name");
    const profileAddress = document.getElementById("profile-address");
    const profileDOB = document.getElementById("profile-dob");
    const profileBio = document.getElementById("bio");
    const profileImage = document.getElementById("p-image");

    function convertDOB(){
        let dob = localStorage.dateOfBirth;
        let splitDOB = dob.split("-");
        splitDOB.push(splitDOB[0]);
        splitDOB.shift();
        let newDOB = splitDOB.join("-");
        return newDOB;
    }

    profileImage.style.backgroundImage = `url(data:image/png;base64,${localStorage.imageData})`;
    profileName.textContent = `${localStorage.firstName} ${localStorage.lastName}`;
    profileAddress.textContent = `${localStorage.pCity} ${localStorage.pState},  ${localStorage.pCountry}`;
    profileDOB.textContent = convertDOB();
    profileBio.textContent = localStorage.bio;

};
