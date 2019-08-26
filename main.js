const  TIME = 60;
const QUESTION = [ // Database Question
    {
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
            A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốn-nốt"
        },
        correct: "Đường chân trời"
    },

]






let Game = function () {

    this.level = 1;
    this.answer = undefined;
    this.point = undefined;
    this.time = TIME;
    this.timePerFrame = 1000;
    this.support = undefined;
    this.correct = undefined;
    var self = this;


    this.init = function () {


        this.initQuest();

        this.initAnswer();

        this.gamer = new Gamer();


        this.loop();
    }

    this.countDown = function () {
        this.time--;
        return this.time;
    }
    this.loop = function () {
        console.log('loop');
        setTimeout(self.loop,self.timePerFrame);
    }

    this.getQuestion = function(){
        this.question = QUESTION[this.level];
        return this.question;
    }









}


let Gamer = function () {
    this.name = undefined;
    this.point = 0;

    this.levelUp = function (game) {
        this.level++;
    }
    this.pointUp = function (game) {
        this.point += game.getQuestion().point;
        return this.point;
    }
    this.answerChoice = function() {
        console.log('Choice');
    }
}






let game = new Game();
game.init();





function initAnswer () {

    for (let a in game.getQuestion().answer){
        if (this.getQuestion().answer.hasOwnProperty(a)){

            _answer = document.createElement('input');
            _answer.type = "button";
            _answer.style.width = "120px";
            _answer.style.height = "50px";
            _answer.style.margin = "auto";
            _answer.style.backgroundColor = "red";
            _answer.style.border = "1px solid #ccc";
            _answer.style.cssFloat = "left";
            _answer.addEventListener('click',choice);
            //_a = a+"."+this.getQuestion().answer[a];
            _answer.value = game.getQuestion().answer[a] ;
            document.body.appendChild(_answer);
        }
    }
}

function initQuest(){

    _quest = document.createElement('div');
    _quest.id = "quest";
    _quest.style.width = "400px";
    _quest.style.height = "100px";
    _quest.style.margin = "auto";
    _quest.style.backgroundColor = "green";
    document.body.appendChild(_quest);

    document.getElementById('quest').innerText = game.getQuestion().question;


}

