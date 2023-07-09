//prototype- Object is automatically get 1 property that is called protype
//Quiz Prototype
function Quiz(questions){
    this.score=0;
    this.questionIndex=0;
    this.questions=questions;
}

//Function to return questions from current index number
Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}

//Function to check end of the quiz
Quiz.prototype.isEnded=function(){
    return this.questions.length===this.questionIndex;
}

//Function to check correct answer and move to next question index
Quiz.prototype.checkOptionWithAnswer=function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

//Question Prototype
function Question(text, choices, answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

Question.prototype.isCorrectAnswer=function(choice){
    return this.answer===choice;
}

//To load questions on HTML page 1 by 1
function loadQuestions(){
    
    if(quiz.isEnded()){
        showScores();
    }
    else{       
        //show next question
       var element= document.getElementById("question");//fetch <p id="question">
       element.innerHTML=quiz.getQuestionByIndex().text;
       //display choices
       var choices=quiz.getQuestionByIndex().choices;
       for(var i=0;i<choices.length;i++){
            //Fetch span to dsplay choice
            var element_choice=document.getElementById("choice"+i);
            element_choice.innerHTML=choices[i];
            handleOptionButton("btn"+i,choices[i]);
       }
       showProgress();
    }
    
}

function handleOptionButton(id,choice){
    var button=document.getElementById(id);
    button.onclick=function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

//To show the progess bar
function showProgress(){
    var currentQuestionNumber=quiz.questionIndex+1;
    var progressbar=document.getElementById("progress");
    progressbar.innerHTML="Question "+currentQuestionNumber + " of "+ quiz.questions.length;
}

//Function to show the score
function showScores(){
    var result="<h1>Result<h1><h2 id='score'> Your Score :: ";
    result+=quiz.score;
    result+="<br>Percentage is:: "+(quiz.score/questions.length*100) +" %"
    //fetch quiz div and put result over it
    var element=document.getElementById("quiz");
    element.innerHTML=result;
}

//Array of Object of Questions

var questions = [
    new Question("JS Stands for",["Java Script","SQL Server","Sybase","Oracle"],"Java Script"),
    new Question("XML Stands for",["Java Script","Extensible Markup Language","Sybase","Oracle"],"Extensible Markup Language"),
    new Question("HTML Stands for",["Java Script","SQL Server","Hypertext Markup Language","Oracle"],"Hypertext Markup Language"),
    new Question("OS Stands for",["Java Script","SQL Server","Sybase","Operating System"],"Operating System"),
    new Question("DOS Stands for",["Java Script","Disk Operating System","Sybase","Oracle"],"Disk Operating System")
];

//Create object of quiz
var quiz=new Quiz(questions);

loadQuestions();

