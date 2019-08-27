const  TIME = 6;
const QUESTION = [ // Database Question
    {
        question: "Trong JavaScript sự kiện Onchange xảy ra khi nào?",
        point : 100,
        answer: {
            A: " Khi một đối tượng trong form nhận focus ",
            B: " Xảy ra khi form được người dùng thay đổi dữ liệu ",
            C: " Khi một đối tượng trong form mất focus ",
            D: " Khi kích chuột vào nút lệnh "
        },
        correct: "B"
    },{
        question: "Mạnh vì..., bạo vì tiền",
        point : 300,
        answer: {
            A: "Gạo",
            B: "Đường",
            C: "Muối",
            D: "Mì chính"
        },
        correct: "A"
    },{
        question: "Người ta thường gọi quốc gia nào là đất nước mặt trời mọc",
        point : 500,
        answer: {
            A: "Việt Nam",
            B: "Lào",
            C: "Campuchia",
            D: "Nhật"
        },
        correct: "D"
    },{
        question: "Người Việt Nam đầu tiên bay vào vũ trụ",
        point : 1000,
        answer: {
            A: "Tùng Sơn",
            B: "Đại Úy Lê Thị Hiền",
            C: "Phạm Tuân",
            D: "Khá Bảnh"
        },
        correct: "C"
    },{
        question: "Vua nào đặt nhiều niên hiệu nhất lịch sử nước ta",
        point : 10000,
        answer: {
            A: "Lý Thái Tổ",
            B: "Bảo Đại",
            C: "Lý Nhân Tông",
            D: "Trần Thái Tông"
        },
        correct: "C"
    },{
        question: "Chùa Đồng lớn nhất Việt Nam ở đâu?",
        point : 70000,
        answer: {
            A: "Bái Đính",
            B: "Núi Yên Tử",
            C: "Vịnh Hạ Long",
            D: "Đà Nẵng"
        },
        correct: "B"
    },{
        question: "Huyện Võ Nhai thuộc tỉnh nào nước ta? ",
        point : 90000,
        answer: {
            A: "Thái Nguyên",
            B: "Thái Bình",
            C: "Ninh Bình",
            D: "Bình Định"
        },
        correct: "A"
    },{
        question: "Nhạc sĩ Sô Panh gắn liền với nhạc cụ nào?",
        point : 100000,
        answer: {
            A: "Sáo",
            B: "Đàn Bầu",
            C: "Guitar",
            D: "Piano"
        },
        correct: "D"
    },{
        question: "Kinh thành trà kiệu thuộc tỉnh nào?",
        point : 120000,
        answer: {
            A: "Quảng Trị",
            B: "Quảng Nam",
            C: "Quảng Bình",
            D: "Quảng Ninh"
        },
        correct: "B"
    },{
        question: "Sau chiến tranh thế giới 2, phong trào giải phóng dân tộc nổi lên mạnh nhất ở đâu?",
        point : 150000,
        answer: {
            A: "Châu Phi",
            B: "Việt Nam",
            C: "Mỹ",
            D: "Pháp"
        },
        correct: "A"
    },{
        question: "Câu nói: \"Đầu tôi chưa rơi xuống đất, xin bệ hạ đừng lo\" là của ai?",
        point : 180000,
        answer: {
            A: "Trần Thủ Độ",
            B: "Trần Quốc Tuấn",
            C: "Trần Tử Bình",
            D: "Trần Công Hoan"
        },
        correct: "A"
    },{
        question: "Lần đầu tiên nước ta dùng bộc phá 1000 kg thuốc nổ đánh giặc là ở đâu? ",
        point : 200000,
        answer: {
            A: "Điện Biên Phủ",
            B: "Quảng Trị",
            C: "Hà Nội",
            D: "Đà Nẵng"
        },
        correct: "A"
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
        this.point = 0;
        $("#question-number").html(this.level + 1);
        $("#display-question").html(QUESTION[this.level]);
        $("#reward").empty();
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
        if (this.time > 0){
            this.show($("#withdraw-button"));
            $("#question-number").html("Câu "+(this.level + 1));
            $("#point").html(this.point+" $");
            $("#display-question").html(QUESTION[this.level].question);
            $("#boxA").append("<span class='char'>A</span>" + QUESTION[this.level].answer.A);
            $("#boxB").append("<span class='char'>B</span>" + QUESTION[this.level].answer.B);
            $("#boxC").append("<span class='char'>C</span>" + QUESTION[this.level].answer.C);
            $("#boxD").append("<span class='char'>D</span>" + QUESTION[this.level].answer.D);
            var answerID = "#box" + QUESTION[this.level].correct;
            $(answerID).attr('class', 'answerBox');
            this.show($("#reward"));
            this.hide($("#survey-region"));
            this.show5050();
            this.showSurvey();
        }else {
            self.restartGame();
        }



    };
    // Countdown
    this.countDown = function () {
        //console.log(self.time);
        setTimeout(self.countDown,1000);
        self.time--;
    }

    this.getAnswer = function () {
        this.answer = QUESTION[this.level].answer;
        return this.answer;
    }
    this.getCorrect = function () {
       return this.correct = QUESTION[this.level].correct;
    }
    // Get HTML element by id
    this.getElement = function(elementId){
        return document.getElementById(elementId);
    }
    // Check answer
    this.checkAnswer = function(){

        if (this._selectArray[this.level] == "box"+this.getCorrect()){
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
    if (!this._use5050  && this.level >=5) {
        this.show($("#help5050-button"))
    } else {
        this.hide($("#help5050-button"))
    }
};

Game.prototype.showSurvey = function () {
    if (!this._useSurvey && this.level >=5) {
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
            $("#reward").append("<div class='rewardStep' id='step" + i + "'><p class='number'>" + i + "</p><span class='step'>"+QUESTION[i-1].point+" $</span></div>")
        } else {
            $("#reward").append("<div class='specialRewardStep' id='step" + i + "'><p class='specialNumber'>" + i + "</p><span class='step'>"+QUESTION[i-1].point+" $</span></div>")
        }
    }

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
Game.prototype.changeSubmitAnswerButton = function () {
    this.checkAnswer() ?  this.show($("#next-question")): this.show($("#restart-game"));

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
            message = "Bạn ra về với "+QUESTION[9].point +" $";
        } else if (this.level >= 5) {
            message = "Bạn ra về với "+QUESTION[4].point +" $";
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


