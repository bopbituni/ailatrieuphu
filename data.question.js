const TIME = 60;
const QUESTION = [ // Database Question
    {
        question: "Trong JavaScript sự kiện Onchange xảy ra khi nào?",
        point: 100,
        answer: {
            A: " Khi một đối tượng trong form nhận focus ",
            B: " Xảy ra khi form được người dùng thay đổi dữ liệu ",
            C: " Khi một đối tượng trong form mất focus ",
            D: " Khi kích chuột vào nút lệnh "
        },
        correct: "B"
    }, {
        question: "Lệnh 'for' nào thực hiện lặp 5 lần?",
        point: 300,
        answer: {
            A: "for( i=0; i<6; i++ )",
            B: "for( i=0; i<5; i++ )",
            C: "for( i=0; i<4; i++ )",
            D: "for( i=0; i<5; i+=2 )"
        },
        correct: "B"
    }, {
        question: "let x = 1;\n" +
            "for (let i = 0; i < -1; i = i + 2) {\n" +
            "    x = x + 1;\n" +
            "}\n" +
            "console.log(x);",
        point: 500,
        answer: {
            A: "4",
            B: "3",
            C: "I Love CodeGym",
            D: "1"
        },
        correct: "D"
    }, {
        question: "Đâu là khởi tạo mảng đúng?",
        point: 1000,
        answer: {
            A: "let a = [12,false,\"Luân\"];\n",
            B: "let a = array(12,false,\"Hòa\");",
            C: "let a = new array(12,false,\"Sơn\");\n",
            D: "let a = new [12,false,\"Hoàng\"];"
        },
        correct: "A"
    }, {
        question: "Đâu là định nghĩa đúng về một hàm trong JavaScript?\n" +
            "\n",
        point: 2000,
        answer: {
            A: "function.FunctionName()",
            B: "new FunctionName()",
            C: "function = FunctionName()",
            D: "function FunctionName()"
        },
        correct: "D"
    }, {
        question: "Trong Javascript, phương thức nào dưới đây dùng để lấy một ký tự tại một vị trí xác định trong chuỗi?",
        point: 3000,
        answer: {
            A: "characterAt()",
            B: "indexOf()",
            C: "charAt()",
            D: "substr()"
        },
        correct: "D"
    }, {
        question: "Mã lệnh nào cho phép sắp xếp một mảng tên là names trong JavaScript? ",
        point: 5000,
        answer: {
            A: "Array.sort(names)",
            B: "names.bubbleSort()",
            C: "names.ArraySort()",
            D: "names.sort()"
        },
        correct: "D"
    }, {
        question: "Thuật toán tìm kiếm và sắp xếp được thực hiện tốt nhất với cấu trúc dữ liệu nào?",
        point: 10000,
        answer: {
            A: "Một danh sách liên kết",
            B: "Một mảng dựa trên danh sách",
            C: "Một đối tượng cụ thể",
            D: "Cả 3 phương án trên"
        },
        correct: "A"
    }, {
        question: "Trong Javascript, phương thức nào dưới đây dùng để lấy một ký tự tại một vị trí xác định trong chuỗi?",
        point: 12000,
        answer: {
            A: "substr()",
            B: "charAt()",
            C: "characterAt()",
            D: "indexOf()"
        },
        correct: "B"
    }, {
        question: "Độ phức tạp tệ nhất của thuật toán tìm kiếm tuyến tính là gì?\n" +
            "\n",
        point: 15000,
        answer: {
            A: "O(1)",
            B: "O(logn)",
            C: "O(n)",
            D: "O(nlogn)"
        },
        correct: "C"
    }, {
        question: "Codegym việt nam được thành lập vào năm bao nhiêu",
        point: 20000,
        answer: {
            A: "2015",
            B: "2016",
            C: "2017",
            D: "2018"
        },
        correct: "C"
    }, {
        question: "<script>\n" +
            "\n" +
            "function kiemtra(){\n" +
            "\n" +
            "window.open(\"http://codegym.com.vn\",\"Chao\");\n" +
            "\n" +
            "}\n" +
            "\n" +
            "</script>\n" +
            "\n" +
            "</head>\n" +
            "\n" +
            "<body onload =\"kiemtra()\"></body>",
        point: 30000,
        answer: {
            A: "Khi chạy thì một trang khác (VNN) được hiện ra",
            B: "Không chạy được vì sai",
            C: "Khi kết thúc thì một site khác hiện ra",
            D: "Hiện một trang vnn duy nhất"
        },
        correct: "A"

    }

];
