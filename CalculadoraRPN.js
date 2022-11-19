class PilaLIFO {
    constructor() {
        this.ultimo = -1; // índice del último elemento añadido
        this.elementos = [];
    }

    push(valor) {
        this.elementos.push(valor);
        this.ultimo++;
    }

    pop() {
        if (!this.estaVacia()) {
            this.ultimo -= 1;
            return this.elementos.pop();
        }
    }

    size() {
        return this.ultimo + 1; // numero de elementos en la pila 
    }

    mostrar() {
        if (this.size == 0)
            return;

        var elemento;
        var aux = []; // array auxiliar para almacenar los elementos que sacamos de la array principal con pop() para escribirlos
        var stringPila = "";

        for (var i = 0; i < this.size(); i++) {
            elemento = this.elementos.pop();
            stringPila += "[" + i + "] = " + elemento + "\n";
            aux.push(elemento);
        }

        // volvemos a almacenar los elementos en la array principal 
        for (var i = 0; i < this.size(); i++) {
            elemento = aux.pop();
            this.elementos.push(elemento);
        }

        return stringPila;
    }

    get(x) {
        if (x >= this.size() - 1) {
            return this.elementos[x];
        }
    }

    estaVacia() {
        return this.ultimo < 0;
    }

    vaciar() {
        let indice = 0;
        for (indice = 0; indice < this.size(); indice++) {
            this.elementos.pop();
        }

        this.ultimo = -1;
    }
}

class CalculadoraRPN {

    constructor() {
        this.pila = new PilaLIFO();
    }

    inicializar() {
        this.pantalla = document.querySelector('input[type=text][name=\"pantalla\"]');
    }

    borrar() {
        this.pila.vaciar();
        this.pantalla.value = "";
        document.querySelector('textarea[name=\"pantallaPila\"]').innerHTML = "";
    }

    del() {
        var aux = this.pantalla.value;
        this.pantalla.value = aux.slice(0, -1);
    }

    masMenos() {
        if (this.pila.size() >= 1) {
            this.pila.push(this.pila.pop() * (-1));
            this.mostrarEnPantalla();
        }
    }


    raizCuadrada() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.sqrt(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    numero(x) {
        this.pantalla.value += Number(x);
    }

    multiplicacion() {
        if (this.pila.size() >= 2) {
            this.pila.push(this.pila.pop() * this.pila.pop()); // dos últimos elementos añadidos
            this.mostrarEnPantalla();
        }
    }

    division() {
        if (this.pila.size() >= 2) {
            var dcha = this.pila.pop();
            var izq =  this.pila.pop();
            var res = izq/dcha;
            this.pila.push(res); // dos últimos elementos añadidos
            this.mostrarEnPantalla();
        }
    }

    resta() {
        if (this.pila.size() >= 2) {
            var dcha = this.pila.pop();
            var izq =  this.pila.pop();
            this.pila.push(izq-dcha);
            this.mostrarEnPantalla();
        }
    }

    suma() {
        if (this.pila.size() >= 2) {
            this.pila.push(this.pila.pop() + this.pila.pop());
            this.mostrarEnPantalla();
        }
    }

    punto() {
        this.pantalla.value += ".";
    }


    sin() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.sin(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    cos() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.cos(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    tan() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.tan(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    arcsin() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.asin(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    arctan() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.atan(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    arccos() {
        if (this.pila.size() >= 1) {
            this.pila.push(Math.acos(this.pila.pop()));
            this.mostrarEnPantalla();
        }
    }

    pi() {
        this.pantalla.value = Math.PI;
    }
    


    enter() {
        this.pila.push(Number(this.pantalla.value));

        this.pantalla.value = "";

        this.mostrarEnPantalla();
    }

    mostrarEnPantalla() {
        if (!this.pila.estaVacia()) {
            document.querySelector('textarea[name=\"pantallaPila\"]').innerHTML = this.pila.mostrar();
        }
    }
}


document.addEventListener('keydown', function (event) {
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
    if (event.key >= '0' && event.key <= '9') {
        calculadora.numero(Number(event.key));
    }
    if (event.key === '%') { // Borrar pantalla (tecla supr)
        event.preventDefault();
        calculadora.porcentaje();
    }

    if (event.key === 'Enter') {// Enter
        event.preventDefault();
        calculadora.enter();
    }
    if (event.key === 'Delete') { // Borrar pantalla (tecla supr)
        event.preventDefault();
        calculadora.borrar();
    }
    if (event.key === 'Backspace') { // Borrar pantalla (tecla supr)
        event.preventDefault();
        calculadora.del();
    }

});




pila = new PilaLIFO();
calculadora = new CalculadoraRPN();
