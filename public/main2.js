document.addEventListener('DOMContentLoaded', function(){
    // primero haremos validaciones de los campos 
    var boton = document.getElementById('boton');

    boton.addEventListener('click', function(){
        var correo = document.getElementById('email').value;
        var contra = document.getElementById('password').value;
        var mensaje = document.getElementById('mensaje');
        var mensaje2 = document.getElementById('mensaje2');
        var arreglo = ["@hotmail.com", "@gmail.com"];
        mensaje.innerHTML = "";
        mensaje2.innerHTML = "";

        if(correo == "" || contra == ""){
            mensaje.innerHTML = "Campo Vacio";
            mensaje2.innerHTML = "Campo Vacio";
        } else {
            if (!correo.includes(arreglo[0]) || correo.includes(arreglo[1])){
                mensaje.innerText = "Sintaxis incorrecta";
            } else {

                const url = "http://127.0.0.1:3000/ingreso/" + correo + "/" + contra

                fetch(url)

                .then(response => {
                    if(!response.ok){
                        console.log("no se pudo realizar la solicitud")
                    }else{
                        return response.json()
                    }
                })
                .then(data => {
                   var arreglo = data
                   var longitud =  arreglo.length 
                   if(longitud <= 0){
                        mensaje.innerHTML = "No existe la cuenta o algun campo esta mal "
                   }else{
                        window.location.href = "app.html"
                   }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    });
});
