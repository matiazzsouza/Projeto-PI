function somarNumeros() {
    var numero1 = parseFloat(document.getElementById('numero1').value);
    var numero2 = parseFloat(document.getElementById('numero2').value);
    
    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor, insira números válidos.");
        return; 
    }

    let soma = numero1 + numero2;

    document.getElementById('resultado').innerText = 'Resultado: ' + soma;
    
}
