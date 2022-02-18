(() => {
    let btnCalcular = document.getElementById('btnCalcular');
    btnCalcular.addEventListener('click', ()=>{

        /* Sucesión de Fibonacci */
        let cantNum = parseInt(prompt("Ingrese un número entero positivo N (primeros N números de la Sucesión de Fibonacci que quiere visualizar): "));
        if(isNaN(cantNum))
        {
            alert("Error: no ha ingresado un número");
        }
        else
            if(cantNum <= 0)
            {
                alert("Error: debe ingresar un número entero positivo");
            }
            else 
                if(cantNum == 1)
                {
                    alert("Sucesión de Fibonacci: 0");
                }
                else
                {
                    let numFib;
                    let n1 = 0;
                    let n2 = 1;
                    let sucFib = "Sucesión de Fibonacci: " + n1 + ", " + n2;
                    cantNum = cantNum - 2;  //porque ya concatené los primeros dos números de la sucesión de Fibonacci
                    for (i=1;i<=cantNum;i++)
                    { 
                        numFib = n1 + n2;
                        sucFib = sucFib + ", " + numFib;
                        n1 = n2;
                        n2 = numFib;
                    }
                    alert(sucFib); //muestro la sucesión
                }
    });
})();

