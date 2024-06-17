

// primero el evento que hace que cargie todo el documento 
document.addEventListener('DOMContentLoaded' , function(){
    // emepzamos a tomar id del html 
    var boton = document.getElementById('boton')
    var boton2 = document.getElementById('boton2')

    boton.addEventListener('click' , function(){
        window.location.href = "inicio.html"
    })
    boton2.addEventListener('click' , function(){
        window.location.href = "inicio.html"
    })

})