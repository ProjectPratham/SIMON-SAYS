
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;  //level increase count
var key=0; //counter for keypress count
var id; //get id of color clicked by user
var c=0; //counter for check ans
var i=0; //counter to count no. of times user inputs


var gamePattern = [];  //random color pattern
var userClickedPattern=[]; // user input color pattern


function nextSequence() {
  $('#level-title').text("Level "+level);
  level++;
  //generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //6. Add the new randomChosenColour generated to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
  blink();
  play_game_audio();

}


// blinks the color block
function blink(){
  $('#'+gamePattern[gamePattern.length-1]).fadeOut(100);
  $('#'+gamePattern[gamePattern.length-1]).fadeIn(100);
}


//plays respective color audio
function play_game_audio(){
  var audio = new Audio('./sounds/'+gamePattern[gamePattern.length-1]+'.mp3');
  audio.play();
}


//start by first keypress
$(document).on("keypress",function(){
  if(key==0)
  nextSequence();
  key++;
})


//get id on button click and show animation
$(document).on("click",function(e){
  id=e.target.id;
  userClickedPattern.push(id);
  
  animatonPress(id);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

  //continue until full pattern reached
  if(i<(level-1)&&c==1){
    play_user_audio(id);
    i++;
  }

  //restart game
  else if(c==2){
    gamePattern=[];  
    userClickedPattern=[];
    key=0;
    level=0;
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },150);
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("GAME OVER, PRESS ANY KEY TO RESTART");
  }

  // next level
  else{
    play_user_audio(id);
    i=0;
    if(c==1){
      setTimeout(function(){
        nextSequence();
        userClickedPattern=[];
      },700);
    }
    
  }
})


//audio for user
function play_user_audio(name){
  var audio = new Audio('./sounds/'+name+'.mp3');
  audio.play();
}


// animation for user press
function animatonPress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){
    $('#'+currentColor).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]!=gamePattern[currentLevel]){
    c=2;
    console.log("false");
  }
  else{  
    c=1;
    console.log("success");
  }
}