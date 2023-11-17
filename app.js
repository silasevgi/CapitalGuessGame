
const apiUrl = "https://restcountries.com/v3.1/all";
const countriesData = [];
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error message: ${response.status}`);
    }
    return response.json(); // Return the JSON-parsed data
  })
  .then((data) => {
    
    data.forEach((country) => {
      const countryName = country.name.common;
      const capital = Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : null;
      if (countryName && capital) {
        countriesData.push({ country: countryName, capital: capital });
      }  
    
     
    
    }); 
    
    newQuestion(); // Call newQuestion() after populating countriesData
})
.catch((error) => {
  console.error(`There was a problem fetching the data: ${error}`);
});
function newQuestion() {
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
    const nameOfcountry = document.getElementById("countryName");
    nameOfcountry.textContent = randomCountry.country; // Setting the country name correctly

    const choices = [randomCountry.capital]; // Correct answer
    while (choices.length < 4) {
        const randomCapital = countriesData[Math.floor(Math.random() * countriesData.length)].capital;
        if (!choices.includes(randomCapital)) {
            choices.push(randomCapital);
        }
    }

    const shuffledChoices = shuffle(choices);
    const score = document.getElementById("scoreValue");
    const choiceElements = document.querySelectorAll(".choice");
    
    choiceElements.forEach((choice, index) => {
        choice.textContent = shuffledChoices[index];
        choice.style.backgroundColor = "";
        choice.onclick = () => {
             // Set cursor to default
             choiceElements.forEach((Choice) => {
                 Choice.style.cursor="default";
                 Choice.onclick = null;        
             });

            if (choice.textContent === randomCountry.capital) {
                choice.style.backgroundColor = "green";  
                score.textContent=parseInt(score.textContent)+100;
              }
            
            else {
                choice.style.backgroundColor = "red";
                choiceElements.forEach((correctChoice) => {
                    if (correctChoice.textContent === randomCountry.capital) {
                        correctChoice.style.backgroundColor = "green";
                    }
                });
                 // Update score correctly
                 score.textContent=parseInt(score.textContent)-100;
                 console.log(parseInt(score.textContent));
            }
        };
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function checkScoreAndConfirm() {
  const scoreValue =document.getElementById("scoreValue");
  const value= parseInt(scoreValue.textContent);
  
  if (!isNaN(value) && value >= 300) {
      alert("You are doing great! Keep moving forward :)");
  }
  if (!isNaN(value) && value < -300) {
    alert("You can do much better :(");
}
}

const nextButton=document.getElementById("next");
nextButton.onclick=()=>{
  checkScoreAndConfirm();
    
  newQuestion();
};

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' || event.code === 13) {
     
    checkScoreAndConfirm();
     newQuestion();
  }
});

checkScoreAndConfirm();