tabButtons = document.querySelectorAll('.tab-btn');
tabContents = document.querySelectorAll('.tab-content');

for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', () => {
        const tabId = tabButtons[i].id;
        for (let j = 0; j < tabContents.length; j++) {
            tabContents[j].classList.remove('actual');
        }
        for (let k = 0; k < tabButtons.length; k++) {
            tabButtons[k].classList.remove('actual');
        }
        document.getElementById(`tab-${tabId}`).classList.add('actual');
        tabButtons[i].classList.add('actual');
    });
}

//Juego 1. Contador de Palabras.
document.getElementById("form-contador").addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = document.getElementById("texto-contador").value.trim();

    document.getElementById("tot-caracteres").textContent = texto.length;
    document.getElementById("notot-caracteres").textContent = texto.replace(/\s+/g, '').length;

    const palabras = texto.split(/\s+/);
    document.getElementById("tot-palabras").textContent = palabras.length;

    let palabraLarga = "";
    if (palabras.length > 0) {
        palabraLarga = palabras.reduce((masLargo, comparaElem) => masLargo.length > comparaElem.length ? masLargo : comparaElem, "");
    }
            
    document.getElementById("larga-palabra").textContent = palabraLarga; 
       
    document.getElementById("result-contador").style.display = "block";
});

//Juego 2. Buscador de Palabras.
document.getElementById("form-buscador").addEventListener("submit", (e) => {
    e.preventDefault();
    buscarPalabra();
});
        
function buscarPalabra() { 

    const textoOriginal = document.getElementById("texto-buscador").value;
    const palabraBuscada = document.getElementById("buscar-palabra").value;

    const texto = textoOriginal.toLowerCase();
    const palabra = palabraBuscada.toLowerCase();
    const longPalabra = palabraBuscada.length;
    
    const coincidencias = [];
    let indice = 0;
    
    while ((indice = texto.indexOf(palabra, indice)) !== -1) {
        coincidencias.push({
            inicio: indice,
            fin: indice + longPalabra,
            igual: textoOriginal.slice(indice, indice + longPalabra)
        });
        indice += longPalabra;
    }
    document.getElementById("apariciones").textContent = coincidencias.length;
    document.getElementById("result-texto").innerHTML = resaltarCoincidencias(textoOriginal, coincidencias);
}

function resaltarCoincidencias(texto, coincidencias) {
    if (coincidencias.length === 0) {
        return texto + "<p>No se encontraron coincidencias</p>";
    }
    
    let resultado = '';
    let ultimaPos = 0;
    
    for (let i = 0; i < coincidencias.length; i++) {
        resultado += texto.slice(ultimaPos, coincidencias[i].inicio);
        resultado += `<span class="resaltado">${coincidencias[i].igual}</span>`;
        ultimaPos = coincidencias[i].fin;
    }
    
    resultado += texto.slice(ultimaPos);
    
    return resultado;
}

//Juego 3. Generador de Acrónimos.
document.getElementById("form-acronimo").addEventListener("submit", (e) => {
    e.preventDefault();
    generarAcronimo();
});
        
function generarAcronimo() {
    const frase = document.getElementById("texto-acronimo").value.trim();

    if(!frase) {
        document.getElementById("frase-original").textContent = "Ingrese una frase";
        document.getElementById("acronimo-generado").textContent = "";
        return;
    }

    let palabras = frase.split(/\s+/);
    let acronimo = "";

    for (const palabra of palabras) {
        if (palabra.length > 0) {
            acronimo += palabra[0];
        }
    }
    document.getElementById("frase-original").textContent = frase;
    document.getElementById("acronimo-generado").textContent = acronimo;
}