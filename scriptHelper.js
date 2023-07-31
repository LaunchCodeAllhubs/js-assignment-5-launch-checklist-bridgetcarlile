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

        pilotStatus.innerHTML = `${pilot} is ready.`;
        copilotStatus.innerHTML = `${copilot} is ready.`
        list.style.visibility = "visible";

        if (fuelLevel <10000 && cargoLevel >10000) {
        fuelStatus.innerHTML = "There is not enough fuel for the journey.";
        cargoStatus.innerHTML = "The cargo is too heavy for the journey"
        launchStatus.innerHTML = "Shuttle is not ready for launch.";
        launchStatus.style.color = "#C7254E";

    } else if (fuelLevel >= 10000 && cargoLevel >10000) {
        fuelStatus.innerHTML = "There is enough fuel for the journey.";
        cargoStatus.innerHTML = "The cargo is too heavy for the journey"
        launchStatus.innerHTML = "Shuttle is not ready for launch.";
        launchStatus.style.color = "#C7254E";
    
    } else if (fuelLevel <10000 && cargoLevel <=10000) {
        fuelStatus.innerHTML = "There is not enough fuel for the journey.";
        cargoStatus.innerHTML = "The cargo is an adequate weight for the journey"
        launchStatus.innerHTML = "Shuttle is not ready for launch.";
        launchStatus.style.color = "#C7254E";
    } else {
        launchStatus.style.color = "#419F6A";
        launchStatus.innerHTML = "Shuttle is ready for launch.";
        fuelStatus.innerHTML = "There is enough fuel for the journey.";
        cargoStatus.innerHTML = "The cargo is an adequate weight for the journey"
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
