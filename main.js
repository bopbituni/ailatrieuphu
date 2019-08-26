const  TIME = 60;
const QUESTION = [ // Database Question
    {
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
        A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
        },
        correct: "Đường chân trời"
    },{
        question: "Đường nào là đường dài nhất ?",
        point : 100,
        answer: {
            A: "Đường chân trời",
            B: "Đường làng",
            C: "Đường xóm",
            D: "Đường thốnnốt"
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
        let gamer = new Gamer();

        _time= document.createElement('div');
        _time.id = 'time';
        document.body.appendChild(_time);
        this.initQuest();
        this.initAnswer(gamer);
        this.loop();
    }
    this.initAnswer = function (gamer) {

        for (let a in this.getQuestion().answer){

            if (this.getQuestion().answer.hasOwnProperty(a)){
                _answer = document.createElement('input');
                _answer.type = "button";
                _answer.style.width = "120px";
                _answer.style.height = "50px";
                _answer.style.margin = "auto";
                _answer.style.backgroundColor = "red";
                _answer.style.border = "1px solid #ccc";
                _answer.style.cssFloat = "left";
                _answer.addEventListener('click',gamer.choices);
                _answer.value = this.getQuestion().answer[a] ;
                document.body.appendChild(_answer);
            }
        }
    }



    this.initQuest = function (){

        _quest = document.createElement('div');
        _quest.id = "quest";
        _quest.style.width = "400px";
        _quest.style.height = "100px";
        _quest.style.margin = "auto";
        _quest.style.backgroundColor = "green";
        document.body.appendChild(_quest);

        document.getElementById('quest').innerText = this.getQuestion().question;


    }

    this.countDown = function () {
        this.time--;
        return this.time;
    }

    this.timeInit = function(){
        _time= document.getElementById('time');
        _time.innerText = "";
        _time.innerText = this.time;
    }
    this.loop = function () {
        self.countDown();
        self.timeInit();
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
    this.choice = 1;
    this.levelUp = function (game) {
        this.level++;
    }
    this.pointUp = function (game) {
        this.point += game.getQuestion().point;
        return this.point;
    }

    this.choices = function (game) {

        this.time = game.time;
        console.log(this.value);
        console.log(this.choice);


        //this.choice--;
        //console.log(game.getQuestion().correct);


    }


}








function init(){

    let game = new Game();
    game.init();





}






