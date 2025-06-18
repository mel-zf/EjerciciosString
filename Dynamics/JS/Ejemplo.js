const textoInput = document.getElementById('texto-input');
const metodoInput = document.getElementById('metodo-input');
const ejecutarBtn = document.getElementById('ejecutar-btn');
const resultPantalla = document.getElementById('result-pantalla');

ejecutarBtn.addEventListener('click', function() {
    const texto = textoInput.value;
    const metodo = metodoInput.value;
    
    resultPantalla.innerHTML = ` > "${texto}".${metodo}<br>`;
    try {
        const resultado = eval(`"${texto}".${metodo}`);
        resultPantalla.innerHTML += `Resultado: ${resultado}`;
    } catch (error) {
        resultPantalla.innerHTML += `Error: ${error.message}`;    
    }
});

metodoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        ejecutarBtn.click();
    }
});