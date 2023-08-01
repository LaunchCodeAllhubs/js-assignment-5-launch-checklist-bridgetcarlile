// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.

    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter} </li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance} </li>
                <li>Number of Moons: ${moons}</li>
            </ol>
    <img src="${imageUrl}">
    
    `;
   
   
}

function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } else if(isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    };


}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");


    //VALIDATE INPUT AND ALERTS

    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        window.alert("All fields are required!");
        
    } else if(validateInput(pilot) === "Is a Number"  || validateInput(copilot) === "Is a Number") {
        window.alert("Pilot and copilot cannot be numbers.");

    } else if(validateInput(fuelLevel) === "Not a Number") {
        window.alert("Fuel level must be a number.");
        
    } else if(validateInput(cargoLevel) === "Not a Number") {
        window.alert("Cargo mass must be a number.");
        

        
    //UPDATE SHUTTLE INFO

     } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "visible";

        if (fuelLevel <10000 && cargoLevel >10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";

    } else if (fuelLevel >= 10000 && cargoLevel >10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
    
    } else if (fuelLevel <10000 && cargoLevel <=10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch"
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
    } else {
        launchStatus.style.color = "#419F6A";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        list.style.visibility = "hidden";
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }
   
}

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json();
        });

    return planetsReturned;
};    



function pickPlanet(planets) {
    let randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    return randomPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
