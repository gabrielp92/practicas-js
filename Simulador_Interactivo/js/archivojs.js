(() => {
    let btnConvertir = document.getElementById('btnConvertir');
    btnConvertir.addEventListener('click', ()=>{cambioDeBase();});
})();

/* Conversor de base 10 a base 2 */
function cambioDeBase()
{
    let numEntrada = parseInt(document.getElementById('numEntrada').value); // leo número de entrada (en base 10)
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
                let cadenaBinaria = "";
                let divisor = 2;
                do
                {
                    cociente = Math.trunc(numEntrada / divisor); // división entera
                    resto =  numEntrada - divisor * cociente;
                    numEntrada = cociente;
                    cadenaBinaria = resto + cadenaBinaria;
                }   
                while(cociente != 0);
                //muestro lo convertido a binario
                document.querySelector("#pSalida").innerHTML = cadenaBinaria; 
            }
}