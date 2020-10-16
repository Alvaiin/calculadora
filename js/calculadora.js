$(document).ready(function () {
    teclas = ['7','8','9','DEL','AC'
             ,'4','5','6','x','/'
             ,'1','2','3','+','-'
             ,'0','.','=','(',')'];
    botones = $(".botones");
    for (i = 0; i < 4 ; i++){
        botones.append('<div class="fila" id="fila'+(i+1)+'">');
        for(j = 0; j < 5; j++){
            $("#fila"+(i+1)).append('<button type="button" class="btn btn-primary" id="btn'+ teclas[(i*5+j)]+'">'+teclas[(i*5+j)]+'</button>');
            //$('#btn'+ $.escapeSelector(teclas[(i*5+j)])).on("click",{input: teclas[(i*5+j)]},enviarInput);
        }
        botones.append('</div>');
    }

    $("#btn1").on("click", function () {
        concatenarEnDisplay("1");
    });

    $("#btn2").on("click", function () {
        concatenarEnDisplay("2");
    });

    $("#btn3").on("click", function () {
        concatenarEnDisplay("3");
    });

    $("#btn4").on("click", function () {
        concatenarEnDisplay("4");
    });

    $("#btn5").on("click", function () {
        concatenarEnDisplay("5");
    });

    $("#btn6").on("click", function () {
        concatenarEnDisplay("6");
    });

    $("#btn7").on("click", function () {
        concatenarEnDisplay("7");
    });

    $("#btn8").on("click", function () {
        concatenarEnDisplay("8");
    });

    $("#btn9").on("click", function () {
        concatenarEnDisplay("9");
    });

    $("#btn0").on("click", function () {
        concatenarEnDisplay("0");
    });

    $("#btnDEL").on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida = salida.substr(0, salida.length - 3);
        } else {
            salida = salida.substr(0, salida.length - 1);
        }
        mostrarEnDisplay(salida);
    });

    $("#btnAC").on("click", function () {
        mostrarEnDisplay("");
    });

    $("#btn"+$.escapeSelector("+")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida = salida.substr(0, salida.length - 3);
        }
        salida += " + ";
        mostrarEnDisplay(salida);
    });

    $("#btnx").on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida = salida.substr(0, salida.length - 3);
        }
        salida += " * ";
        mostrarEnDisplay(salida);
    });

    $("#btn"+$.escapeSelector("-")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida = salida.substr(0, salida.length - 3);
        }
        salida += " - ";
        mostrarEnDisplay(salida);
    });

    $("#btn"+$.escapeSelector("/")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida = salida.substr(0, salida.length - 3);
        }
        salida += " / ";
        mostrarEnDisplay(salida);
    });

    $("#btn"+$.escapeSelector(".")).on("click", function () {
        salida = $("#display").text();
        if(salida.indexOf('.') == -1){
            salida += '.';
            mostrarEnDisplay(salida);
        }
    });

    $("#btn"+$.escapeSelector("(")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida += '( ';
        } else {
            salida += ' ( ';
        }
        mostrarEnDisplay(salida);
    });

    $("#btn"+$.escapeSelector(")")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " ") {
            salida += ') ';
        } else {
            salida += ' ) ';
        }
        mostrarEnDisplay(salida);
    });

    $("#btn"+$.escapeSelector("=")).on("click", function () {
        salida = $("#display").text();
        if (salida[salida.length - 1] == " " && salida[salida.length - 2] != ')')
            return;
        entrada = salida.split(" ");
        polaca = aPolaca(entrada);
        salida = "" + resolver(polaca);
        mostrarEnDisplay(salida);
    });

    function concatenarEnDisplay(caracter){
        salida = $("#display").text();
        $("#display").text( salida+caracter);
    }

    function mostrarEnDisplay(texto){
        $("#display").text(texto);
    }

    function resolver(polaca) {
        pila = [];
        polaca.forEach(element => {
            switch (element) {
                case '+':
                    pila.push(pila.pop() + pila.pop());
                    break;
                case '-':
                    aux = pila.pop();
                    pila.push(pila.pop() - aux);
                    break;
                case '*':
                    pila.push(pila.pop() * pila.pop());
                    break;
                case '/':
                    aux = pila.pop();
                    pila.push(pila.pop() / aux);
                    break;
                default:
                    pila.push(element);
            }
        });
        return pila.pop();
    }

    function aPolaca(entrada) {
        polaca = [];
        pila = [];
        entrada.forEach(function (element) {
            if (element == '')
                return;
            if (element == '+' || element == '-' || element == '*' || element == '/' || element == '(') {
                while (pila.length != 0 && obtenerPrioridad(element) <= obtenerPrioridadPila(pila[pila.length - 1])) {
                    polaca.push(pila.pop());
                }
                pila.push(element);
            } else {
                if (element == ')') {
                    operador = pila.pop();
                    while (pila.length != 0 && operador != '(') {
                        polaca.push(operador);
                        operador = pila.pop();
                    }
                } else
                    polaca.push(parseFloat(element));
            }
        });
        while (pila.length > 0) {
            polaca.push(pila.pop());
        }
        return polaca;
    }

    function obtenerPrioridad(operador) {
        switch (operador) {
            case '+':
                return 1;
            case '-':
                return 2;
            case '*':
                return 3;
            case '/':
                return 4;
            case '(':
                return 5;
        }
    }

    function obtenerPrioridadPila(operador) {
        switch (operador) {
            case '+':
                return 1;
            case '-':
                return 2;
            case '*':
                return 3;
            case '/':
                return 4;
            case '(':
                return 0;
        }
    }
    
});