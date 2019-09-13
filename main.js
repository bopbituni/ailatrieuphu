let Game = function () {
    this.point = 0;
    this._color = '#3498db';
    this._selectArray = [];
    this.time = TIME;
    this._number5050 = 0;
    this._keep = 0;
    let self = this;


    this.startGame = function () {
        this.level = 0;
        this._use5050 = false;
        this._useSurvey = false;
        this.hide($("#question-form"));
        this.hide($("#button"));
        this.show($("#board-button"));
        this.hide($("#submit-answer"));
        this.hide($('#next-question'));
        this.hide($("#restart-game"));
        this.hide($("#alert"));
        this.hide($("#survey-region"));
        this.showBoard();
        this.drawMap();
        this.changeStepColor();

    };
    this.restartGame = function () {
        this.level = 0;
        this.point = 0;
        $("#question-number").html(this.level + 1);
        $("#display-question").html(QUESTION[this.level]);
        $("#reward").empty();
        $("#surveyBoard").empty();
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
        $("#question-number").html("Câu " + (this.level + 1));
        $("#point").html(this.point + "VNĐ");
        $("#display-question").html(QUESTION[this.level].question);
        $("#boxA").append("<span class='char'>A</span>" + QUESTION[this.level].answer.A);
        $("#boxB").append("<span class='char'>B</span>" + QUESTION[this.level].answer.B);
        $("#boxC").append("<span class='char'>C</span>" + QUESTION[this.level].answer.C);
        $("#boxD").append("<span class='char'>D</span>" + QUESTION[this.level].answer.D);
        var answerID = "#box" + QUESTION[this.level].correct;
        $(answerID).attr('class', 'answerBox');
        this.countDown();
        this.show($("#reward"));
        this.hide($("#survey-region"));
        this.show5050();
        this.showSurvey();


    };
    // Countdown
    this.countDown = function () {
        clearInterval(self._count);
        this._count = setInterval(function () {
            self.time--;
            $("#time").html("00 : " + self.time);
            if (self.time == 0) {
                self.resetBoardStatus();
                self.restartGame();
                self.drawMap();
                self.changeStepColor();
            }

        }, 1000)
    };
    this.getAnswer = function () {
        this.answer = QUESTION[this.level].answer;
        return this.answer;
    };
    this.getCorrect = function () {
        return this.correct = QUESTION[this.level].correct;
    };
    // Get HTML element by id
    this.getElement = function (elementId) {
        return document.getElementById(elementId);
    };
    // Check answer
    this.checkAnswer = function () {

        if (this._selectArray[this.level] == "box" + this.getCorrect()) {
            return true;
        } else {
            return false;
        }
    };


    //Show Answer
    this.showAnswer = function () {
        this.getElement('boxA').innerHTML = "<span class=\'char\'>A</span>" + this.getAnswer().A;
        this.getElement('boxB').innerHTML = "<span class=\'char\'>B</span>" + this.getAnswer().B;
        this.getElement('boxC').innerHTML = "<span class=\'char\'>C</span>" + this.getAnswer().C;
        this.getElement('boxD').innerHTML = "<span class=\'char\'>D</span>" + this.getAnswer().D;
    };


    // Listen click event for 4 answer buttons
    this.getElement('boxA').addEventListener('click', function () {
        return self.selectBox(this.id);
    });
    this.getElement('boxB').addEventListener('click', function () {
        return self.selectBox(this.id);
    });
    this.getElement('boxC').addEventListener('click', function () {
        return self.selectBox(this.id);
    });
    this.getElement('boxD').addEventListener('click', function () {
        return self.selectBox(this.id);
    });

    //Submit Answer click
    this.getElement('submit-answer').addEventListener('click', function () {
        self.changeSubmitAnswerButton();
        self.changeSubmitAnswerButton();
        self.nextOrStop();
        self.congrats();
        self.hide($('#board-button'));
        self.show($('#alert'));

    });

    // Next button click
    this.getElement('next-question').addEventListener('click', function () {
        self.resetBoardStatus();
        self.nextLevel();
        self.showBoard();
        self.changeStepColor();
    });

    // Restart button click

    this.getElement('restart-game').addEventListener('click', function () {
        self.resetBoardStatus();
        self.restartGame();
        self.drawMap();
        self.changeStepColor();
    });

    // Withdraw click 

    this.getElement('withdraw-button').addEventListener('click', function () {
        self.congrats();
        self.withdraw();
    });

    this.getElement('helpSurvey-button').addEventListener('click', function () {
        self.helpSurvey();
        self.showSurvey();
    });
    this.getElement('withdraw-button').addEventListener('click', function () {
        self.withdraw();
        let finishGame = document.getElementById("finish");
        finishGame.play();

    });

    this.getElement('help5050-button').addEventListener('click', function () {
        self.help5050();
        let doubleFifty = document.getElementById("fifty-fifty");
        doubleFifty.play();
    });

    this.getElement('helpSurvey-button').addEventListener('click', function () {
        self.helpSurvey();
        let helpSurvey = document.getElementById("help");
        helpSurvey.play();
    });

    this.getElement('submit-answer').addEventListener('click', function () {
        if (self.checkAnswer() == true) {
            let correct = document.getElementById('true');
            correct.play();
        } else {
            let correct = document.getElementById('false');
            correct.play();
        }
    })

};
Game.prototype.hide = function (elementDom) {
    this._elementDom = elementDom;
    this._elementDom.css('display', 'none');

};
Game.prototype.show = function (elementDom) {
    this._elementDom = elementDom;
    this._elementDom.css('display', 'block');
};


Game.prototype.show5050 = function () {
    if (!this._use5050 && this.level >= 5) {
        this.show($("#help5050-button"))
    } else {
        this.hide($("#help5050-button"))
    }
};

Game.prototype.showSurvey = function () {
    if (!this._useSurvey && this.level >= 5) {
        this.show($("#helpSurvey-button"))
    } else {
        this.hide($("#helpSurvey-button"))
    }
};
Game.prototype.drawMap = function () {
    let countQuestion = QUESTION.length;
    //console.log(countQuestion);
    for (var i = 1; i <= countQuestion; i++) {
        if (i % 5 !== 0) {
            $("#reward").append("<div class='rewardStep' id='step" + i + "'><p class='number'>" + i + "</p><span class='step'>" + QUESTION[i - 1].point + " VNĐ</span></div>")
        } else {
            $("#reward").append("<div class='specialRewardStep' id='step" + i + "'><p class='specialNumber'>" + i + "</p><span class='step'>" + QUESTION[i - 1].point + " VNĐ</span></div>")
        }
    }

};

Game.prototype.drawChart = function (valueA, valueB, valueC, valueD) {
    this.hide($("#reward"));
    this.show($("#survey-region"));
    var i = 0;
    $("#chartA").append("<span class='ABCD'>A</span><span class='startPercent'></span>");
    $("#chartB").append("<span class='ABCD'>B</span><span class='startPercent'></span>");
    $("#chartC").append("<span class='ABCD'>C</span><span class='startPercent'></span>");
    $("#chartD").append("<span class='ABCD'>D</span><span class='startPercent'></span>");

    for (i = 1; i <= valueA; i++) {
        setTimeout(function () {
            $("#chartA").append("<span class='percent'></span>")
        }, 100)
    }
    for (i = 1; i <= valueB; i++) {
        setTimeout(function () {
            $("#chartB").append("<span class='percent'></span>")

        }, 100)
    }
    for (i = 1; i <= valueC; i++) {
        setTimeout(function () {
            $("#chartC").append("<span class='percent'></span>")

        }, 100)
    }
    for (i = 1; i <= valueD; i++) {
        setTimeout(function () {
            $("#chartD").append("<span class='percent'></span>")

        }, 100)
    }

    setTimeout(function () {
        $("#chartA").append("<span class='percentNumber'> " + valueA + "%</span>")

    }, 900);

    setTimeout(function () {
        $("#chartB").append("<span class='percentNumber'> " + valueB + "%</span>")

    }, 900);

    setTimeout(function () {
        $("#chartC").append("<span class='percentNumber'> " + valueC + "%</span>")

    }, 900);

    setTimeout(function () {
        $("#chartD").append("<span class='percentNumber'> " + valueD + "%</span>")

    }, 900)

};
Game.prototype.changeStepColor = function () {
    this.point += QUESTION[this.level].point;
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
    //console.log(QUESTION[this.level].point);

    this._interval = setInterval(function () {
        //console.log(this._hover);
        if (this._hover) {
            $('.answerBox').css('background-color', '#2ecc71');
            $('.answerBox').css('pointer-events', 'none');
            $('#sellector').css('pointer-events', 'none');
            $('.box').css('pointer-events', 'none');
            this._hover = false;
        } else {
            $('.answerBox').css('background-color', 'orange');
            $('.answerBox').css('pointer-events', 'none');
            $('#sellector').css('pointer-events', 'none');
            $('.box').css('pointer-events', 'none');
            this._hover = true;
        }

    }, 100);
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
    this._number5050 = 0;
    this.time = TIME;
    clearInterval(this._interval);

};
Game.prototype.help5050 = function () {
    var answerBox = this.getCorrect();
    var random1 = this.random(1, 2);
    var random2 = this.random(1, 2);
    this.boxWrong(answerBox, random1, random2);
    this._use5050 = true;
    this._number5050 = this.level + 1;
    //console.log(self._keep);
    //console.log(answerBox);
};
Game.prototype.NumberBoxNameChanger = function (value) {
    //console.log(value);
    if (value == "A") {
        return 1;
    } else if (value == "B") {
        return 2;
    } else if (value == "C") {
        return 3;
    } else if (value == "D") {
        return 4;
    } else if (value == 1) {
        return "boxA"
    } else if (value == 2) {
        return "boxB"
    } else if (value == 3) {
        return "boxC"
    } else {
        return "boxD"
    }

};
Game.prototype.boxWrong = function (boxName, random1, random2) {
    var boxID = this.NumberBoxNameChanger(boxName);
    console.log(boxID);
    if (random1 == random2) {
        if (random1 !== 1) {
            random1--
        } else {
            random1++
        }
    }

    var number1 = (boxID + random1) % 4;
    if (number1 == 0) (number1 = 4);
    var number2 = (boxID + random2) % 4;
    if (number2 == 0) (number2 = 4);
    var boxWrong1 = this.NumberBoxNameChanger(number1);
    var boxWrong2 = this.NumberBoxNameChanger(number2);
    //console.log(boxWrong1,boxWrong2);
    for (var i = 1; i <= 4; i++) {
        if (i !== number1 && i !== number2 && i !== boxID) self._keep = i;
    }


    this.clearWrong(boxWrong1, boxWrong2);

};

Game.prototype.clearWrong = function (boxName1, boxName2) {

    boxName1 = "#" + boxName1;
    boxName2 = "#" + boxName2;
    $(boxName1).attr('class', 'boxWrong');
    $(boxName2).attr('class', 'boxWrong');
    $(boxName1).css('pointer-events', 'none');
    $(boxName2).css('pointer-events', 'none');
    $(boxName1).css('background-color', '#3498db');
    $(boxName2).css('background-color', '#3498db');

};
Game.prototype.helpSurvey = function () {
    var answerBox = this.getCorrect();
    //console.log(answerBox);
    var sum = 76;
    var value1 = this.random(0, sum);
    var value2 = this.random(0, sum - value1);
    var value3 = this.random(0, sum - value1 - value2);
    var value4 = sum - value1 - value2 - value3;
    var valueA = this.random(1, 4);
    var valueB = 0;
    var valueC = 0;
    var valueD = 0;


    if (valueA === 1) {
        valueA = value1;
        valueB = value2;
        valueC = value3;
        valueD = value4;
    } else if (valueA === 2) {
        valueA = value2;
        valueB = value3;
        valueC = value4;
        valueD = value1;
    } else if (valueA === 3) {
        valueA = value3;
        valueB = value4;
        valueC = value1;
        valueD = value2;
    } else {
        valueA = value4;
        valueB = value1;
        valueC = value2;
        valueD = value3;
    }


    if (answerBox === "boxA") {
        valueA = valueA + 24;

    } else if (answerBox === "boxB") {
        valueB = valueB + 24;

    } else if (answerBox === "boxC") {
        valueC = valueC + 24;
    } else {
        valueD = valueD + 24;
    }


    if (this._number5050 == this.level + 1) {

        var sumRemove = 0;


        if (self._keep !== 1 || answerBox !== "boxA") {

            sumRemove += valueA;
            valueA = 0;
        }
        if (self._keep !== 2 && answerBox !== "boxB") {
            sumRemove += valueB;
            valueB = 0;

        }
        if (self._keep !== 3 && answerBox !== "boxC") {
            sumRemove += valueC;
            valueC = 0;

        }
        if (self._keep !== 4 && answerBox !== "boxD") {
            sumRemove += valueD;
            valueD = 0;

        }


        if (answerBox === "boxA") {
            valueA = valueA + sumRemove;

        } else if (answerBox === "boxB") {
            valueB = valueB + sumRemove;

        } else if (answerBox === "boxC") {
            valueC = valueC + sumRemove;
        } else {
            valueD = valueD + sumRemove;
        }


    }

    this.drawChart(valueA, valueB, valueC, valueD);
    this._useSurvey = true;


};

Game.prototype.changeSubmitAnswerButton = function () {
    this.checkAnswer() ? this.show($("#next-question")) : this.show($("#restart-game"));

};
Game.prototype.withdraw = function () {
    this._point = $("#point").html();
    this.show($('#alert'));
    this.hide($("#submit-answer"));
    this.hide($("#withdraw-button"));
    this.show($("#restart-game"));
    var message = "Bạn sẽ ra về với " + this._point;
    $("#alert").attr("class", "alert alert-info");
    $("#alert").html(message);

};
Game.prototype.nextOrStop = function () {
    if (this.checkAnswer()) {
        $("#alert").attr("class", "alert alert-success");
        $("#alert").html("Chúc mừng ! Bạn đã trả lời đúng !");
        this._color = '#f1c40f';
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
            message = "Bạn ra về với " + QUESTION[9].point + " $";
        } else if (this.level >= 5) {
            message = "Bạn ra về với " + QUESTION[4].point + " $";
        } else {
            message = "Tiếc quá ! Bạn đã trả lời sai rồi."
        }

        $("#alert").html(message);

    }

    this.hide($("#submit-answer"));


};
Game.prototype.random = function (min, max) {
    //this._use5050 = true;
    return Math.floor(Math.random() * (max - min + 1)) + min;

};


function init() {
    var game = new Game();
    //g.level  = 5;
    game.startGame();


}

