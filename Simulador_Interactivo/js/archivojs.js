(() => 
    {
        let btnConvertir = document.getElementById('btnConvertir');
        btnConvertir.addEventListener('click', ()=>
        {      
            let entrada = parseInt(document.getElementById('numEntrada').value); // leo número de entrada (en base 10)
            let entradaF = parseFloat(document.getElementById('numEntrada').value);
            if(entradaF - entrada != 0)
            {
                alert("Error: NO ha ingresado un número entero");
            }
            else
            {
                let base = 2;
                if(document.getElementById('octal').checked)
                    base = 8;
                document.querySelector("#resultado").innerHTML = "";
                document.querySelector("#resultado").innerHTML += " Resultado en base " + base + ":<br>";
                document.querySelector("#pSalida").innerHTML = "";
                document.getElementById("pSalida").style.padding= "0"; 
                cambioDeBase(entrada, base);
            }
        });
    }
)();

/* Conversor de base 10 a base 2 o base 8 */
function cambioDeBase(numEntrada, divisor)
{
    if(isNaN(numEntrada))
    {
        alert("Error: no ha ingresado un número");
    }
    else
        if(numEntrada < 0)
        {
            alert("Error: debe ingresar un número entero mayor o igual que cero");
        }
        else
        {
            let cociente, resto;
            let cadenaSalida = "";
            do
            {
                cociente = Math.trunc(numEntrada / divisor); // división entera
                resto =  numEntrada - divisor * cociente;
                numEntrada = cociente;
                cadenaSalida = resto + cadenaSalida;
            }   
            while(cociente != 0);
            //muestro lo convertido 
            document.getElementById("pSalida").style.padding= ".25rem .5rem";
            document.querySelector("#pSalida").innerHTML = cadenaSalida; 
        }
}