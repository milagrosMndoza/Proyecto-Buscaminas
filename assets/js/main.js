function crearTablero() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var div = document.createElement("div");
            div.id = i + "" + j;
            div.addEventListener("clic", mostrarNumero, true);
            tableroMinas.appendChild(div)
        }
    }
}

var minas= inicializarMatriz();
function inicializarMatriz(){
    var tabla=[];
    for( var i =0; i<8; i++){
        tabla[i]=[0,0,0,0,0,0,0,0];
    }
    return tabla;
}

function generarBombas(tablero){
    var fila= 0;
    var colum= 0;
    
    fila = Math.floor((Math.random()*7)+0);
    colum= Math.floor((Math.randow()*7)+0);
    
    for(var i = 0; i <8; i++){
        while(tablero[fila][colum]== "*"){
            fila = Math.floor((Math.random()*7)+0);
            colum= Math.floor((Math.randow()*7)+0); 
        }
        tablero[fila][colum] = "*";
    }
}
function bombasAlrededor(tablero){
    for(var i =0; i<8; i++){
        for(var j =0; j<8; j++){
            if(tablero[i][j]== "*"){
                if(i == 0 && j==0){
                    colocaNumeroBombas(i,j, i+1, j+1, tablero);
                }
                else if(i ==0 && (j>0 && j<7)){
                    colocaNumeroBombas(i, j-1, i+1, j+1, tablero);
                }
                else if(i== 0 && j==7){
                    colocaNumeroBombas(i, j-1, i+1, j, tablero);
                }
                else if(j == 7 && (i>0 && i <7)){
                    colocaNumeroBombas(i-1, j-1, i+1,j, tablero);
                }
                else if (i == 7 && j==7){
                    colocaNumeroBombas(i-1, j-1, i, j, tablero);
                }
                else if (i == 7 && (j>0 && j<7)){
                    colocaNumeroBombas(i-1, j-1, i, j+1, tablero);
                }
                else if (i == 7 && j==0){
                    colocaNumeroBombas(i-1, i,j, j+1, tablero);
                }
                else if(j == 0 && (i>0 && j<7)){
                    colocaNumeroBombas(i-1, j-1, i+1, j+1, tablero);
                }
                else{
                    colocaNumerobombas(i-1, j-1, i+1, j+1, tablero);
                }
            }
        }
    }
}

function colocaNumeroBombas(vari, varj, fini, finj, tablero){
    for(var i = vari; i<=fini; i++){
        for(var j =varj; j <=finj; j++){
            if(tablero[i][j] !="*"){
                tablero[i][j]= (parseInt(tablero[i][j])+1);
            }
        }
    }
}

function abrirAlrededor(xi, xj, tablero){
    if (xi == 0 && xj ==0){
        abrirCeros(xi, xj, xi +1, xj+1, xi, xj, tablero);
    }
    else if( xi == 0 && (xj>0 && xj<7)){
        abrirCeros(xi, xj-1, xi +1, xj+1, xi, xj, tablero);
    }
    else if(xi == 0 && xj==7){
        abrirCeros(xi, xj-1, xi +1, xj, xi, xj, tablero);
    }
    else if( xj== 7 && (xi>0 && xi<7)){
        abrirCeros(xi-1, xj-1, xi +1, xj, xi, xj, tablero);
    }
    else if(xi == 7 && xj==7){
        abrirCeros(xi-1, xj-1, xi, xj, xi, xj, tablero);
    }
    else if( xi== 7 && (xj>0 && xj<7)){
        abrirCeros(xi-1, xj-1, xi, xj+1, xi, xj, tablero);
    }
    else if(xi == 7 && xj==0){
        abrirCeros(xi-1, xj, xi, xj+1, xi, xj, tablero);
    }
    else if(xj == 0 && (xi>0 && xi<7)){
        abrirCeros(xi-1, xj, xi+i, xj+1, xi, xj, tablero);
    }
    else{
        abrirCeros(xi-1, xj-1, xi+1, xj+1, xi, xj, tablero);
    }
}