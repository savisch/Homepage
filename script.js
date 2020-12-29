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
    const tableData = [];

    // let index = 1;
    function store(){
        let formData = {
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

        if(localStorage.addresses){
            JSON.parse(localStorage.getItem("addresses"));
            tableData.push(formData);
            localStorage.addresses= JSON.stringify(tableData);
        } else{
            tableData.push(formData);
            console.log(tableData);
            localStorage.setItem("addresses", JSON.stringify(tableData));
        }
    };
};

// JS for the addresses page
if(document.title == "Addresses"){
    const addresses = JSON.parse(localStorage.addresses);
    // console.log(addresses.length);
    // console.log(addresses[0].firstName);
    let tbl = document.getElementById("table");

    for(let i = 0; i < addresses.length; i ++){
        let rowOne = document.createElement("tr");
        let firstCell = document.createElement("td");
        firstCell.innerHTML = `<u>Name:</u> \xa0${addresses[i].firstName} ${addresses[i].lastName}`;
        rowOne.appendChild(firstCell);

        let rowTwo = document.createElement("tr");
        let firstCellTwo = document.createElement("td");
        firstCellTwo.innerHTML = `<u>Birthday:</u> \xa0${convertDOB()}`;
        rowTwo.appendChild(firstCellTwo);

        let rowThree = document.createElement("tr");
        let firstCellThree = document.createElement("td");
        firstCellThree.innerHTML = `<u>Street Address:</u> \xa0${addresses[i].street}`;
        rowThree.appendChild(firstCellThree);

        let rowFour = document.createElement("tr");
        let firstCellFour = document.createElement("td");
        firstCellFour.innerHTML = `<u>City/State/Zip/Country:</u> \xa0${addresses[i].city}, ${addresses[i].state} \xa0\xa0${addresses[i].zipCode} / ${addresses[i].country}`;
        rowFour.appendChild(firstCellFour);

        let rowFive = document.createElement("tr");
        let firstCellFive = document.createElement("td");
        let addressRelationship = addresses[i].relationship;
        let titleRelationship = addressRelationship.replace(addressRelationship[0], addressRelationship[0].toUpperCase());
        firstCellFive.innerHTML = `<u>Relationship:</u> \xa0${titleRelationship}`;
        rowFive.appendChild(firstCellFive);

        let blankRow = document.createElement("tr");
        let firstCellBlank = document.createElement("td");
        blankRow.appendChild(firstCellBlank);
        firstCellBlank.style.backgroundColor = "#b3c5e1";


        tbl.appendChild(rowOne);
        tbl.appendChild(rowTwo);
        tbl.appendChild(rowThree);
        tbl.appendChild(rowFour);
        tbl.appendChild(rowFive);
        tbl.appendChild(blankRow);

        function convertDOB(){
            let dob = addresses[i].dateOfBirth;
            let splitDOB = dob.split("-");
            splitDOB.push(splitDOB[0]);
            splitDOB.shift();
            let newDOB = splitDOB.join("-");
            return newDOB;
        }
    };
};
