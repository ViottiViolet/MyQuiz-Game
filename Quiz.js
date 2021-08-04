class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background(rgb(245, 237, 132));
    //write code to show a heading for showing the result of Quiz
    fill('black');
    textSize(50);
    text("Results Are Back!", 300, 75);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
    //write code to add a note here
    fill('blue');
    textSize(25);
    text("Note: Correct contestants are highlighted green!", 200, 300);

    var x = 100
    //write code to highlight contest who answered correctly
      for(var plr in allContestants) {

        var correctAnswer = "2";
        if(correctAnswer == allContestants[plr].answer) {
          fill('green');
        }
        else {
          fill('red');
      }
      textSize(30);
      text(allContestants[plr].name + ":" + allContestants[plr].answer, x, 350);
      x += 500;
      }

    }
  }

}