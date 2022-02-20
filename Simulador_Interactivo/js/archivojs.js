(() => 
    {
        let btnConvertir = document.getElementById('btnConvertir');
        btnConvertir.addEventListener('click', ()=>
        {      
            let entrada = parseInt(document.getElementById('numEntrada').value); // leo número de entrada (en base 10)
            let base = 2;
            if(document.getElementById('octal').checked)
                base = 8;
            document.querySelector("#resultado").innerHTML = "";
            document.querySelector("#resultado").innerHTML += " Resultado en base " + base + ":<br>";
            cambioDeBase(entrada, base);
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
            if((numEntrada - Math.trunc(numEntrada)) != 0)  // se chequea si se ingresa un número con decimales
            {
                alert("Error: NO ha ingresado un número entero");
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
                document.querySelector("#pSalida").innerHTML = cadenaSalida; 
            }
}