const  TIME = 60;
const QUESTION = [ // Database Question
    {
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
            A: "A",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "A"
    },{
        question: "Cau so 2",
        point : 300,
        answer: {
            A: "Gi",
            B: "Đường làng",
            C: "B",
            D: "Đường thốnnốt"
        },
        correct: "B"
    },{
        question: "Cau hoi so 3 ?",
        point : 500,
        answer: {
            A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Gi cung duoc"
        },
        correct: "C"
    }

]


let Game = function () {
    this.point = 0;
    this._color = '#3498db';
    this._selectArray = [];
    this.time = TIME;
    var self = this;


    this.startGame = function () {
            this.level = 0;
            this._use5050 = false;
            this._useSurvey = false;
            this.hide($("#question-form"));
            this.hide($("#button"));
            this.show($("#board-button"));
            this.show($('#each-question'));
            this.hide($("#submit-answer"));
            this.hide($('#next-question'));
            this.hide($("#restart-game"));
            this.hide($("#alert"));
            this.hide($("#survey-region"));
            this.showBoard();
            this.drawMap();
            this.changeStepColor();
    }
    this.restartGame = function () {
        this.level = 0;
        $("#question-number").html(this.level + 1);
        $("#display-question").html(QUESTION[this.level]);
        ($("#reward")).empty();
        this.show($('#board-button'));
        this.hide($("#submit-answer"));
        this.hide($('#restart-game'));
        this.hide($('#next-question'));
        this.hide($('#alert'));
        this._use5050 = false;
        this._useSurvey = false;
        this.showBoard();


    };
    this.showBoard = function () {
        this.show($("#withdraw-button"));
        $("#question-number").html(this.level + 1);
        $("#display-question").html(QUESTION[this.level].question);
        $("#boxA").append("<span class='char'>A</span>" + QUESTION[this.level].answer.A);
        $("#boxB").append("<span class='char'>B</span>" + QUESTION[this.level].answer.B);
        $("#boxC").append("<span class='char'>C</span>" + QUESTION[this.level].answer.C);
        $("#boxD").append("<span class='char'>D</span>" + QUESTION[this.level].answer.D);
        var answerID = "#box" + QUESTION[this.level].correct;
        console.log(answerID);
        $(answerID).attr('class', 'answerBox');
        this.show($("#reward"));
        this.hide($("#survey-region"));
        this.show5050();
        this.showSurvey();
    };


    this.countDown = function () {
        if (self.time > 0 ){
            setTimeout(self.countDown,1000);
            this.time--;
        }else {

        }
    }



    this.getAnswer = function () {
        this.answer = QUESTION[this.level].answer;
        return this.answer;
    }
    this.getCorrect = function () {
        this.correct = QUESTION[this.level].correct;
    }
    // Get HTML element by id
    this.getElement = function(elementId){
        return document.getElementById(elementId);
    }

    this.checkAnswer = function(){
        this.getCorrect();
        if (this._selectArray[this.level] == "box"+this.correct){
            return  true;
        }else {
           return false;
        }
    }


    //Show Answer
    this.showAnswer = function () {
        this.getElement('boxA').innerHTML = "<span class=\'char\'>A</span>"+this.getAnswer().A;
        this.getElement('boxB').innerHTML = "<span class=\'char\'>B</span>"+this.getAnswer().B;
        this.getElement('boxC').innerHTML = "<span class=\'char\'>C</span>"+this.getAnswer().C;
        this.getElement('boxD').innerHTML = "<span class=\'char\'>D</span>"+this.getAnswer().D;
    }


    // Listen click event for 4 answer buttons
    this.getElement('boxA').addEventListener('click', function(){
       return self.selectBox(this.id);
    });
    this.getElement('boxB').addEventListener('click', function(){
        return self.selectBox(this.id);
    });
    this.getElement('boxC').addEventListener('click', function(){
        return self.selectBox(this.id);
    });
    this.getElement('boxD').addEventListener('click', function(){
        return self.selectBox(this.id);
    });

    //Submit Answer click
    this.getElement('submit-answer').addEventListener('click',function () {
        self.changeSubmitAnswerButton();
        self.changeSubmitAnswerButton();
        self.nextOrStop();
        self.congrats();
        self.hide($('#board-button'));
        self.show($('#alert'));

    })

    // Next button click
    this.getElement('next-question').addEventListener('click',function () {
        self.resetBoardStatus();
        self.nextLevel();
        self.showBoard();
        self.changeStepColor();
    })

    // Restart button click

    this.getElement('restart-game').addEventListener('click',function () {
        self.resetBoardStatus();
        self.restartGame();
        self.drawMap();
        self.changeStepColor();
    })
    
    // Withdraw click 
    
    this.getElement('withdraw-button').addEventListener('click',function () {
        self.congrats();
        self.withdraw();
    })
}
Game.prototype.hide = function (elementDom) {
    this._elementDom = elementDom;
    this._elementDom.css('display', 'none');

};
Game.prototype.show = function (elementDom) {
    this._elementDom = elementDom;
    this._elementDom.css('display', 'block');
};


Game.prototype.show5050 = function () {
    if (!this._use5050) {
        this.show($("#help5050-button"))
    } else {
        this.hide($("#help5050-button"))
    }
};

Game.prototype.showSurvey = function () {
    if (!this._useSurvey) {
        this.show($("#helpSurvey-button"))
    } else {
        this.hide($("#helpSurvey-button"))
    }
};
Game.prototype.drawMap = function () {
    let countQuestion = QUESTION.length;
    console.log(countQuestion);
    for (var i = 1 ; i <= countQuestion; i++) {
        if (i % 5 !== 0) {
            $("#reward").append("<div class='rewardStep' id='step" + i + "'><span class='step'>"+QUESTION[i-1].point+" $</span></div>");

        } else {
            $("#reward").append("<div class='rewardStep' id='step" + i + "'><span class='step'>"+QUESTION[i-1].point+" $</span></div>")
        }
    }
};

Game.prototype.changeStepColor = function () {
    var currentStep = this.level + 1;
    for (var i = 1; i < currentStep; i++) {
        var id = "#step" + i;
        $(id).css('background-color', '#2ecc71');
    }
    currentStep = "#step" + currentStep;
    $(currentStep).css('background-color', '#f39c12');


};

Game.prototype.selectBox = function (boxID) {

    var id = "#" + boxID;

    if (boxID == "boxA" || boxID == "boxB" || boxID == "boxC" || boxID == "boxD") {

        $("#boxA").css('background-color', '#3498db');
        $("#boxB").css('background-color', '#3498db');
        $("#boxC").css('background-color', '#3498db');
        $("#boxD").css('background-color', '#3498db');


        $(id).css('background-color', '#f1c40f');
        this.show($('#submit-answer'));
        this._selectArray[this.level] = boxID;
    }

};

Game.prototype.congrats = function () {
    this._interval = setInterval(function () {
        console.log(self._hover);
        if (self._hover) {
            $('.answerBox').css('background-color', '#2ecc71');
            $('.answerBox').css('pointer-events', 'none');
            $('#sellector').css('pointer-events', 'none');
            $('.box').css('pointer-events', 'none');
            self._hover = false;
        } else {
            $('.answerBox').css('background-color', self._color);
            $('.answerBox').css('pointer-events', 'none');
            $('#sellector').css('pointer-events', 'none');
            $('.box').css('pointer-events', 'none');
            self._hover = true;
        }

    }, 150);
};
Game.prototype.nextLevel = function () {
    this.level++;
    var step = this.level + 1;
    this.hide($('#submit-answer'));
    this.hide($('#restart-game'));
    this.hide($('#next-question'));
    this.show($('#board-button'));
    this.hide($('#alert'));

    $("#question-number").html(this.level + 1);
    if (step % 5 == 0) {
        $("#question-number").css("background-color", "yellow");
        $("#display-question").css("color", "yellow");
    } else {
        $("#question-number").css("background-color", "#ffffff");
        $("#display-question").css("color", "#ffffff");
    }
    $("#display-question").html(QUESTION[this.level].question);


};
Game.prototype.resetBoardStatus = function () {
    $("#boxA").css('background-color', '#3498db');
    $("#boxB").css('background-color', '#3498db');
    $("#boxC").css('background-color', '#3498db');
    $("#boxD").css('background-color', '#3498db');
    $("#boxA").empty();
    $("#boxB").empty();
    $("#boxC").empty();
    $("#boxD").empty();
    $("#chartA").empty();
    $("#chartB").empty();
    $("#chartC").empty();
    $("#chartD").empty();

    $('.answerBox').css('pointer-events', 'auto');
    $('.boxWrong').css('pointer-events', 'auto');
    $('#sellector').css('pointer-events', 'auto');
    $('.box').css('pointer-events', 'auto');
    $('.answerBox').attr('class', 'box');
    $('.boxWrong').attr('class', 'box');



    this._color = '#3498db';
    clearInterval(this._interval);
    this._number5050 = 0;

};
Game.prototype.changeSubmitAnswerButton = function () {
    this.checkAnswer() ? this.show($("#next-question")) : this.show($("#restart-game"));

};
Game.prototype.withdraw = function () {
    this.show($('#alert'));
    this.hide($("#submit-answer"));
    this.hide($("#withdraw-button"));
    this.show($("#restart-game"));
    var message = "Bạn đã nhận được phần thưởng ở câu hỏi số " + this.level;
    $("#alert").attr("class", "alert alert-info");
    $("#alert").html(message);

};
Game.prototype.nextOrStop = function () {
    if (this.checkAnswer()) {
        $("#alert").attr("class", "alert alert-success");
        $("#alert").html("Chúc mừng ! Bạn đã trả lời đúng !");
        self._color = '#f1c40f';
        if (this.level + 1 == QUESTION.length) {
            $("#alert").attr("class", "alert alert-success");
            $("#alert").html("Chúc mừng bạn đã trở thành TRIỆU PHÚ");
            this.show($('#restart-game'));
            this.hide($('#next-question'));

        }
    } else {
        var message = "";
        $("#alert").attr("class", "alert alert-danger");
        if (this.level >= 10) {
            message = "Your reward is for question 10"
        } else if (this.level >= 5) {
            message = "Your reward is for question 5"
        } else {
            message = "Tiếc quá ! Bạn đã trả lời sai rồi."
        }

        $("#alert").html(message);

    }

    this.hide($("#submit-answer"))

};





function init(){
    var g = new Game();
    //g.level  = 5;
    g.startGame();
}


