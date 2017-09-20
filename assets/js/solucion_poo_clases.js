//solucion_poo_clases.js
'use strict';
const app = {
    item: {

        minas: undefined,

    },
    init: function(){
         app.item.minas= app.inicializaMatriz();
         app.crearTablero();
         app.generarBombas(app.item.minas);
         app.bombasAlrededor(app.item.minas);
    },   
    inicializaMatriz: function () {
            let tabla = [];
            for (let i = 0; i < 8; i++) {
                tabla[i] = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            return tabla;
        },      
        
        
         crearTablero: function() {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let div = document.createElement("div");
                    div.id = i + "" + j;
                    div.addEventListener("click", app.mostrarNumero, true);
                    tablerominas.appendChild(div);
                }
            }
        
        },
        
         mostrarNumero:function(e) {
            let auxstr = this.id.split("");
            let myid = auxstr[0] + auxstr[1];
            let divObj = document.getElementById(myid);
        
            if (app.item.minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == 0) {
                divObj.style.backgroundColor = "white";
                app.abrirAlrededor(parseInt(auxstr[0], 10), parseInt(auxstr[1], 10), app.item.minas);
            } else {
                if (app.item.minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] != "*") {
                    document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + app.item.minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] + "</p>";
                    divObj.style.backgroundColor = "white";
                } else {
                    divObj.style.backgroundImage = "url(assets/img/bomba.gif)";
                    app.abrirTablero(app.item.minas);
                    swal(
                        'Oops...',
                        'Perdiste! Esto ha explotado!',
                        'error'
                    );
                }
            }
        },
        
         bombasAlrededor: function(tablero) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (tablero[i][j] == "*") {
                        if (i == 0 && j == 0) {
                            colocaNumeroBombas(i, j, i + 1, j + 1, tablero);
                        } else if (i == 0 && (j > 0 && j < 7)) {
                            app.colocaNumeroBombas(i, j - 1, i + 1, j + 1, tablero);
                        } else if (i == 0 && j == 7) {
                            app.colocaNumeroBombas(i, j - 1, i + 1, j, tablero);
                        } else if (j == 7 && (i > 0 && i < 7)) {
                            app.colocaNumeroBombas(i - 1, j - 1, i + 1, j, tablero);
                        } else if (i == 7 && j == 7) {
                            app.colocaNumeroBombas(i - 1, j - 1, i, j, tablero);
                        } else if (i == 7 && (j > 0 && j < 7)) {
                            app.colocaNumeroBombas(i - 1, j - 1, i, j + 1, tablero);
                        } else if (i == 7 && j == 0) {
                            app.colocaNumeroBombas(i - 1, j, i, j + 1, tablero);
                        } else if (j == 0 && (i > 0 && i < 7)) {
                            app.colocaNumeroBombas(i - 1, j, i + 1, j + 1, tablero);
                        } else {
                            app.colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1, tablero);
                        }
                    }
                }
            }
        },
        
         colocaNumeroBombas: function(leti, letj, fini, finj, tablero) {
            for (let i = leti; i <= fini; i++) {
                for (let j = letj; j <= finj; j++) {
                    if (tablero[i][j] != "*") {
                        tablero[i][j] = (parseInt(tablero[i][j]) + 1);
                    }
                }
            }
        },
        
         generarBombas: function(tablero) {
            let fil = 0;
            let col = 0;
        
            fil = Math.floor((Math.random() * 7) + 0);
            col = Math.floor((Math.random() * 7) + 0);
        
            for (let i = 0; i < 8; i++) {
                while (tablero[fil][col] == "*") {
                    fil = Math.floor((Math.random() * 7) + 0);
                    col = Math.floor((Math.random() * 7) + 0);
                }
                tablero[fil][col] = "*";
            }
        },
        
         abrirCeros: function(leti, letj, fini, finj, cori, corj, tablero) {
            for (let i = leti; i <= fini; i++) {
                for (let j = letj; j <= finj; j++) {
                    let myid = i + "" + j;
                    let objDiv = document.getElementById(myid)
                    if (objDiv.textContent == "") {
                        if (tablero[i][j] == 0) {
                            if (i == cori && j == corj) {
                                objDiv.textContent = "";
                                objDiv.style.backgroundColor = "white";
                            } else {
                                if (objDiv.style.backgroundColor != "white") {
                                    app.abrirAlrededor(i, j, tablero);
                                }
                            }
        
                        } else {
                            if (tablero[i][j] != "*") {
                                document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>";
                                objDiv.style.backgroundColor = "white";
                            }
                        }
                    }
                }
            }
        },
        
         abrirAlrededor: function(xi, xj, tablero) {
            if (xi == 0 && xj == 0) {
                app.abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj, tablero);
            } else if (xi == 0 && (xj > 0 && xj < 7)) {
                app.abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
            } else if (xi == 0 && xj == 7) {
                app.abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj, tablero);
            } else if (xj == 7 && (xi > 0 && xi < 7)) {
                app.abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj, tablero);
            } else if (xi == 7 && xj == 7) {
                app.abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj, tablero);
            } else if (xi == 7 && (xj > 0 && xj < 7)) {
                app.abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj, tablero);
            } else if (xi == 7 && xj == 0) {
                app.abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj, tablero);
            } else if (xj == 0 && (xi > 0 && xi < 7)) {
                app.abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj, tablero);
            } else {
                app.abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
            }
        },
        
         abrirTablero: function(tablero) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let myid = i + "" + j;
                    let objDiv = document.getElementById(myid);
                    if (tablero[i][j] == "*") {
                        objDiv.style.backgroundImage = "url(assets/img/bomba.gif)";
                    }
                }
            }
        }
        
}

app.init();
