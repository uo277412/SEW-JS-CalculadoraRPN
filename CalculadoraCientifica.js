class CalculadoraMilan {

    constructor() {
        this.parte1 = "";
        this.parte2 = "";
        this.memoria = "";
        this.valorActual = "";
        this.valorIzq = "";
        this.operator = "";

        document.addEventListener('keydown', this.inicializarEvents.bind(this));
    }

    inicializarEvents(event) {
        if (event.key === '-') {
            calculadora.resta();
        }
        if (event.key === '+') {
            calculadora.suma();
        }
        if (event.key === '/') {
            calculadora.division();
        }
        if (event.key === '*') {
            calculadora.multiplicacion();
        }
        if (event.key === '.') {
            calculadora.punto();
        }
        if (event.key >= '0' && event.key <= '9') {
            calculadora.numero(Number(event.key));
        }
        if (event.key === '%') { 
            event.preventDefault();
            calculadora.porcentaje();
        }
        if (event.ctrlKey && event.key === 'm') { 
            event.preventDefault();
            calculadora.mrc();
        }
        if (event.ctrlKey && event.key === 's') { 
            event.preventDefault();
            calculadora.mMas();
        }
        if (event.ctrlKey && event.key === 'r') { 
            event.preventDefault();
            calculadora.mMenos();
        }
        if (event.ctrlKey && event.key === 'a') {
            calculadora.raizCuadrada();
        }
        if (event.key === 'Enter') {// Enter
            event.preventDefault();
            calculadora.igual();
        }
        if (event.key === 'Delete') { // Borrar pantallay memoria
            event.preventDefault();
            calculadora.borrar();
        }
        if (event.key === 'Backspace') { // Borrar pantalla (tecla supr)
            event.preventDefault();
            calculadora.borrarPantalla();
        }
    }

    inicializar() {
        this.pantalla = document.querySelector('input[type=text][name=\"pantalla\"]');
    }

    borrar() {
        this.memoria = "";
        this.valorActual = "";
        this.pantalla.value = "";
    }

    borrarPantalla() {
        this.valorActual = "";
        this.pantalla.value = "";
    }

    masMenos() {
        this.valorActual += this.pantalla.value;
        this.pantalla.value = valorActual * (-1);
    }

    porcentaje() {
        let a = this.pantalla.value;

        var array = a.split("");

        // recorrer la array y almacenar el valor de la izquierda
        let j = array.length - 1;
        let counter = 0; // posición del último operador
        let operatorFound = false;
        let op = "";

        if (this.operator == "+" || this.operator == "-")
            while (!operatorFound) {
                if (array[j] == "+" || array[j] == "-") {
                    op = array[j];
                    counter = j;
                    operatorFound = true;
                }
                j--;
            }

        let i = 0;

        this.valorIzq = a.substring(0, counter);
        let valorDcho = a.substring(counter, a.length);

        this.valorIzq = eval(this.valorIzq);

        if (this.operator == "*" || this.operator == "/") {
            this.valorActual = a + '/100';
        }
        else {
            this.valorActual = this.valorIzq + valorDcho + '/100' + '*' + this.valorIzq;
        }

        let final = eval(this.valorActual);

        this.pantalla.value = final;
        this.valorIzq = "";
    }

    raizCuadrada() {
        let a = this.pantalla.value;
        this.pantalla.value = "Math.sqrt(" + a + ")";
    }

    numero(x) {
        this.pantalla.value += Number(x);
    }

    multiplicacion() {
        var a = this.pantalla.value;
        this.parte1 = eval(a);
        
        this.operator = "*";
        
        this.pantalla.value = this.parte1 + this.operator;
        this.parte1 = "";
    }

    division() {
        var a = this.pantalla.value;
        this.parte1 = eval(a);
        
        this.operator = "/";
        
        this.pantalla.value = this.parte1 + this.operator;
        this.parte1 = "";
    }

    resta() {
        var a = this.pantalla.value;
        this.parte1 = eval(a);
        
        this.operator = "-";
        
        this.pantalla.value = this.parte1 + this.operator;
        this.parte1 = "";
    }

    mrc() {
        this.pantalla.value = this.memoria;
    }

    suma() {
        var a = this.pantalla.value;
        this.parte1 = eval(a);
        
        this.operator = "+";
        
        this.pantalla.value = this.parte1 + this.operator;
        this.parte1 = "";
    }

    mMenos() {
        this.memoria = eval(this.memoria + "-" + this.pantalla.value);
    }

    punto() {
        this.pantalla.value += ".";
    }

    igual() {
        try {
            this.parte1 = this.pantalla.value;
            this.pantalla.value = eval(this.parte1);
        } catch (err) {
            this.pantalla.value = "Error.";
        }

    }

    mMas() {        
        this.memoria = eval(this.memoria + "+" + this.pantalla.value);
    }
}

calculadora = new CalculadoraMilan();






class CalculadoraCientifica extends CalculadoraMilan {

    constructor() {
        super();
        this.opcion = 0; // número de veces que se pulsó la tecla deg

        this.arc = false;
        this.hyperbolic = false;
        this.memoriaVacia = true;

        document.addEventListener('keydown', this.inicializarEvents.bind(this));
    }

    inicializarEvents(event) {
        if (event.key === 's') { // seno
            calculadora.sin();
        }
        if (event.key === 'c') { // coseno
            calculadora.cos();
        }
        if (event.key === 't') { // tangente
            calculadora.tan();
        }
        if (event.key === 'Shift') { // funciones arc-
            event.preventDefault();
            calculadora.flecha();
        }
        if (event.key === 'Backspace') { // Borrar pantalla (tecla supr)
            event.preventDefault();
            calculadora.del();
        }
        if (event.key === 'm') { // Borrar pantalla (tecla supr)
            event.preventDefault();
            calculadora.deg();
        }
        if (event.key === 'f') { // Borrar pantalla (tecla supr)
            event.preventDefault();
            calculadora.fe();
        }
        if (event.key === 'h') { // Borrar pantalla (tecla supr)
            event.preventDefault();
            calculadora.hyp();
        }

    }

    // primera fila de botones
    deg() {
        var num = this.pantalla.value;
        switch (this.opcion) {
            case 0:
                document.querySelector('input[type=button][value=\"DEG\"]').value = "RAD";
                this.opcion++;
                break;
            case 1:
                document.querySelector('input[type=button][value=\"RAD\"]').value = "GRAD";
                this.opcion++;
                break;
            case 2:
                document.querySelector('input[type=button][value=\"GRAD\"]').value = "DEG";
                this.opcion = 0;
                break;
        }
    }

    // notación científica
    fe() {
        var a = this.pantalla.value;

        var array = a.split(/[\\-|\\+|\\*|\\-\\]/);

        var valorDcho = array[array.length - 1];
        var res = this.pantalla.value.substring(0, this.pantalla.value.length - valorDcho.length);

        valorDcho = new Number(valorDcho);

        this.pantalla.value = res + valorDcho.toExponential();
    }

    hyp() {
        this.hyperbolic = !this.hyperbolic;

        if (this.hyperbolic) {
            if (!this.arc) {
                document.querySelector('input[type=button][value=\"SIN\"]').value = "SINH";
                document.querySelector('input[type=button][value=\"COS\"]').value = "COSH";
                document.querySelector('input[type=button][value=\"TAN\"]').value = "TANH";
            }
            else {
                document.querySelector('input[type=button][value=\"ASIN\"]').value = "ASINH";
                document.querySelector('input[type=button][value=\"ACOS\"]').value = "ACOSH";
                document.querySelector('input[type=button][value=\"ATAN\"]').value = "ATANH";
            }

        }
        else {
            if (!this.arc) {
                document.querySelector('input[type=button][value=\"SINH\"]').value = "SIN";
                document.querySelector('input[type=button][value=\"COSH\"]').value = "COS";
                document.querySelector('input[type=button][value=\"TANH\"]').value = "TAN";
            }
            else {
                document.querySelector('input[type=button][value=\"ASINH\"]').value = "ASIN";
                document.querySelector('input[type=button][value=\"ACOSH\"]').value = "ACOS";
                document.querySelector('input[type=button][value=\"ATANH\"]').value = "ATAN";
            }
        }
    }

    // memory recall
    mr() {
        this.pantalla.value = this.memoria;
        document.querySelector('input[type=button][value=\"MR\"]').disabled = true;
        document.querySelector('input[type=button][value=\"MC\"]').disabled = true;
    }

    // memory clear
    mc() {
        this.memoria = "";
        this.pantallaMemoria.value = "";
        document.querySelector('input[type=button][value=\"MR\"]').disabled = true;
        document.querySelector('input[type=button][value=\"MC\"]').disabled = true;
    }

    // memory storage
    ms() {
        this.memoria = this.pantalla.value;
        this.pantallaMemoria.value = this.pantalla.value;
        document.querySelector('input[type=button][value=\"MR\"]').disabled = false;
        document.querySelector('input[type=button][value=\"MC\"]').disabled = false;
    }



    // segunda fila de botones
    cuadrado() {
        this.pantalla.value += "**2";
    }

    potencia() {
        this.pantalla.value += "**";
    }

    transformar() {
        var valor = this.pantalla.value;

        switch (this.opcion) {
            case 0:
                valor = valor * (Math.PI / 180); // deg -> rad
                break;
            case 1:
                valor = valor; // rad = rad
                break;
            case 2:
                valor = valor * (Math.PI / 200); // grad -> rad
                break;
        }
        return valor;
    }

    sin() {
        if (!this.arc) {
            if (!this.hyperbolic)
                this.pantalla.value = eval("Math.sin(" + this.transformar() + ")");
            else
                this.pantalla.value = eval("Math.sinh(" + this.transformar() + ")");

        }
        else {
            if (!this.hyperbolic)
                this.asin(this.transformar());
            else
                this.asinh(this.transformar());
            this.arc = false;
        }
    }

    cos() {
        if (!this.arc) {
            if (!this.hyperbolic)
                this.pantalla.value = eval("Math.cos(" + this.transformar() + ")");
            else
                this.pantalla.value = eval("Math.cosh(" + this.transformar() + ")");
        }
        else {
            if (!this.hyperbolic)
                this.acos(this.transformar());
            else
                this.acosh(this.transformar());
            this.arc = false;
        }
    }

    tan() {
        if (!this.arc) {
            if (!this.hyperbolic)
                this.pantalla.value = eval("Math.tan(" + this.transformar() + ")");
            else
                this.pantalla.value = eval("Math.tanh(" + this.transformar() + ")");
        }
        else {
            if (!this.hyperbolic)
                this.atan(this.transformar());
            else
                this.atanh(this.transformar());

            this.arc = false;
        }
    }


    // tercera fila de botones
    potenciaDeDiez() {
        this.pantalla.value += "Math.pow(10, ";
    }

    log() {
        this.pantalla.value += "Math.log10(";
    }

    exp() {
        this.pantalla.value += "Math.exp(";
    }

    mod() {
        this.pantalla.value += "%";
    }


    // cuarta fila de botones 
    flecha() {
        this.arc = !this.arc;

        if (this.arc) {
            if (!this.hyperbolic) {
                document.querySelector('input[type=button][value=\"SIN\"]').value = "ASIN";
                document.querySelector('input[type=button][value=\"COS\"]').value = "ACOS";
                document.querySelector('input[type=button][value=\"TAN\"]').value = "ATAN";
            }
            else {
                document.querySelector('input[type=button][value=\"SINH\"]').value = "ASINH";
                document.querySelector('input[type=button][value=\"COSH\"]').value = "ACOSH";
                document.querySelector('input[type=button][value=\"TANH\"]').value = "ATANH";
            }
        }
        else {
            if (!this.hyperbolic) {
                document.querySelector('input[type=button][value=\"ASIN\"]').value = "SIN";
                document.querySelector('input[type=button][value=\"ACOS\"]').value = "COS";
                document.querySelector('input[type=button][value=\"ATAN\"]').value = "TAN";
            }
            else {
                document.querySelector('input[type=button][value=\"ASINH\"]').value = "SINH";
                document.querySelector('input[type=button][value=\"ACOSH\"]').value = "COSH";
                document.querySelector('input[type=button][value=\"ATANH\"]').value = "TANH";
            }

        }



    }

    del() {
        var aux = this.pantalla.value;
        this.pantalla.value = aux.slice(0, -1);
    }


    // quinta fila de botones
    pi() {
        this.pantalla.value += "Math.PI";
    }


    // sexta fila de botones
    factorial() {
        var aux;
        try {
            aux = eval(this.pantalla.value);
            var total = 1;

            for (var i = 1; i <= aux; i++) {
                total = total * i;
            }

            this.ans = total;
            this.pantalla.value = total;
        }
        catch (err) {
            this.pantalla.value = "SyntaxError";
        }
    }

    // séptima fila de botones


    // octava fila de botones
    abrirParentesis() {
        this.pantalla.value += "(";
    }

    cerrarParentesis() {
        this.pantalla.value += ")";
    }


    // funciones invocadas después de pulsar flecha arriba
    asin(grados) {
        this.pantalla.value = eval("Math.asin(" + grados + ")");
    }

    acos(grados) {
        this.pantalla.value = eval("Math.acos(" + grados + ")");
    }

    atan(grados) {
        this.pantalla.value = eval("Math.atan(" + grados + ")");
    }

    // funciones invocadas después de pulsar tecla hyp
    asinh(grados) {
        this.pantalla.value = eval("Math.asinh(" + grados + ")");
    }

    acosh(grados) {
        this.pantalla.value = eval("Math.acosh(" + grados + ")");
    }

    atanh(grados) {
        this.pantalla.value = eval("Math.atanh(" + grados + ")");
    }
}

calculadora = new CalculadoraCientifica();