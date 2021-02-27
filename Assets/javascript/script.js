var questions = document.querySelector("#questions");
var BtnOne = document.querySelector("#choice-1");
var BtnTwo = document.querySelector("#choice-2");
var BtnThree = document.querySelector("#choice-3");
var BtnFour = document.querySelector("#choice-4");
var answerOne = document.querySelector("#A-1");
var answerTwo = document.querySelector("#A-2");
var answerThree = document.querySelector("#A-3");
var answerFour = document.querySelector("#A-4");
var time = document.querySelector("#seconds");
var startBtn = document.querySelector("#start");
var correct = document.querySelector("#correct");
var main = document.querySelector("#main-quiz");
var submit = document.querySelector("#submit");
var userInput = document.querySelector("#name");
var scoreList = document.querySelector("#score-list");
var resetBtn = document.querySelector("#reset");
var viewHigh = document.querySelector("#viewHigh");
var finish = document.querySelector(".highScore");
var startScreen = document.querySelector(".start-screen")
var resetScore = document.querySelector("#reset-score")
var scoreScreen = document.querySelector("#score-screen")
var displayIn = document.querySelector("#displayIn")
var imgCont = document.querySelector("#imgCont")
var sound = document.querySelector("#wizard")
var storage = [];

var scoreDataArr = [];

console.log(scoreDataArr)
console.log(storage)


var timer;
var timeCount;
var currentQuestion = 0;
var score = 0;



var quizQuestion = [{
question: "What is the name of the elf in Harry Potter?", 
answer: "choice-1",
choice1: "Dobby",
choice2: "Durby",
choice3: "Dundee",
choice4: "Dooby"
},

{
question: "What is Dumbledores first name?",
answer: "choice-2",
choice1: "Alvin",
choice2: "Albus",
choice3: "Albert",
choice4: "Ian McKellen"
},

{
question: "Who is the Half-blood Prince?",
answer: "choice-4",
choice1: "Harry Potter",
choice2: "Thomas Riddle",
choice3: "Drayco Malfoy",
choice4: "Severus Snape"
}]

var questionText = "";


startBtn.addEventListener("click", startGame)


function startGame() {
    startBtn.disabled = true;
    startScreen.style.display = "none"
    main.style.display = "block";
    startTimer();
    questionDisplay();

};

function startTimer() {
    timeCount = 30;
    timer = setInterval(function(){
        timeCount--;
        time.textContent = timeCount

        if (timeCount === 0) {
            resetTimer();
            nextQuestion();
        }
    }, 1000);
};

function resetTimer() {
    clearInterval(timer);
}

function stopTimer(){
    clearInterval(timer);
}

function questionDisplay() {

    questionText = quizQuestion[currentQuestion].question;
    BtnOne.textContent = quizQuestion[currentQuestion].choice1;
    BtnTwo.textContent = quizQuestion[currentQuestion].choice2;
    BtnThree.textContent = quizQuestion[currentQuestion].choice3;
    BtnFour.textContent = quizQuestion[currentQuestion].choice4;
    questions.textContent = questionText;

};

function checkAnswer(answer) {

    if (answer === quizQuestion[currentQuestion].answer) {
        correct.textContent = "correct!";
        resetTimer();
        score++
        localStorage.setItem("score", score)

        
    } else {
        correct.textContent = "wrong!";
        resetTimer();

    };
    
    nextQuestion();

};

function nextQuestion() {

    if (currentQuestion < quizQuestion.length-1) {
        startTimer();
        currentQuestion++
        questionDisplay();
    } else if (currentQuestion === quizQuestion.length-1) {
        stopTimer();
        main.style.display = "none"
        finish.style.display = "block"
        startBtn.disabled = false;
        currentQuestion = 0;
        sound.volume = 0.2;
        sound.play();
    }
}
submit.addEventListener("click", saveData);


function init() {
    if (localStorage.getItem("highScore") && localStorage.getItem("scoreStoreData") !== null){
        displayData();
    }
};



function saveData(event){
    event.preventDefault()
    var highScore = userInput.value
    var scoreStoreData = localStorage.getItem("score")
    
    if (localStorage.getItem("highScore") == null) {
        localStorage.setItem("highScore", "[]");
    };
    if (localStorage.getItem("scoreStoreData") == null) {
        localStorage.setItem("scoreStoreData", "[]");
    }
    var oldScore = JSON.parse(localStorage.getItem("highScore"));
    oldScore.push(highScore)
    storeScore = JSON.parse(localStorage.getItem("scoreStoreData"));
    storeScore.push(scoreStoreData)

    localStorage.setItem("highScore", JSON.stringify(oldScore));
    localStorage.setItem("scoreStoreData", JSON.stringify(storeScore));
    userInput.value = ""
    finish.style.display = "none"
    scoreScreen.style.display = "block"

    if (scoreStoreData == 3) {
        var gryffindor = document.createElement("img");
        gryffindor.setAttribute("class", "bg-img")
        gryffindor.setAttribute("src", "https://images-na.ssl-images-amazon.com/images/I/915wv-U37QL._AC_SY679_.jpg")
        gryffindor.setAttribute("alt", "gryffindor logo")
        imgCont.appendChild(gryffindor)
    } else if (scoreStoreData == 2) {
        var ravenclaw = document.createElement("img");
        ravenclaw.setAttribute("class", "bg-img")
        ravenclaw.setAttribute("src", "https://images-na.ssl-images-amazon.com/images/I/91c9b3pZpXL._AC_SY679_.jpg")
        ravenclaw.setAttribute("alt", "ravenclaw logo")
        imgCont.appendChild(ravenclaw)
    } else if (scoreStoreData == 1) {
        var hufflepuff = document.createElement("img");
        hufflepuff.setAttribute("class", "bg-img")
        hufflepuff.setAttribute("src", "https://images-na.ssl-images-amazon.com/images/I/91m0fktyyCL._AC_SL1500_.jpg")
        hufflepuff.setAttribute("alt", "hufflepuff logo")
        imgCont.appendChild(hufflepuff)
    } else {
        var slytherin = document.createElement("img");
        slytherin.setAttribute("class", "bg-img")
        slytherin.setAttribute("src", "https://m.media-amazon.com/images/I/913oKbge7IL._AC_SL1500_.jpg")
        slytherin.setAttribute("alt", "slytherin logo")
        imgCont.appendChild(slytherin)
        var gandalf = document.querySelector("#gandalf")
        gandalf.volume = 0.15;
        gandalf.play();
    }

    loadData();
}

function loadData() {
    if (localStorage.getItem("highScore") !== null) {
        var i =0
        var li = document.createElement("li");
        var liArray = JSON.parse(localStorage.getItem("highScore"))
        var scoreArr = JSON.parse(localStorage.getItem("scoreStoreData"));

        for (i = 0; i < liArray.length; i++) {

            li.textContent = liArray[i] + " " + scoreArr[i]

        }
    
        score = 0;
        localStorage.setItem("score", score)
        scoreList.appendChild(li);
    }
}

function displayData() {
    if (storage && scoreDataArr !== null) {
        var storageData = JSON.parse(localStorage.getItem("highScore"))
        storage.push(storageData)
        var scoreData = JSON.parse(localStorage.getItem("scoreStoreData"))
        scoreDataArr.push(scoreData)
   
        for (var i = 0; i < storage[0].length; i++) {

            var li = document.createElement("li"); 
            li.textContent = storage[0][i] + " " + scoreDataArr[0][i];
            scoreList.appendChild(li);
            
        }
    }

}

resetBtn.addEventListener("click", function(){ 
    location.reload();
    correct.textContent = ""
})

function clearData(event) {
    event.preventDefault();
    localStorage.removeItem("highScore")
    localStorage.removeItem("scoreStoreData")
}


viewHigh.addEventListener("click", function(){
    stopTimer();
    main.style.display = "none";
    finish.style.display = "none";
    startScreen.style.display = "none";
    scoreScreen.style.display = "block";
});

resetScore.addEventListener("click", function(){
    localStorage.removeItem("scoreStoreData");
    localStorage.removeItem("highScore");
    location.reload();
})


init();