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

// JS for the make addresses page
if(document.title == "Make Address"){
    const aCreateButton = document.getElementById("a-create");
    aCreateButton.addEventListener("click", store);

    let index = 1;
    function store(){
        let tableData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            street: document.getElementById("street").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zipCode: document.getElementById("zip").value,
            country: document.getElementById("country").value,
            dateOfBirth: document.getElementById("date-of-birth").value,
            relationship: document.getElementById("dropdown").value
        };

        if(localStorage.address){
            let key = "address" + index;
            localStorage.setItem(key, JSON.stringify(tableData));
            index += 1;
        };
        localStorage.setItem("address", JSON.stringify(tableData));
    };
};

// JS for the addresses page
if(document.title == "Addresses"){

}
