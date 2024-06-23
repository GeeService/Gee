
document.addEventListener('DOMContentLoaded', function () {
    var busqueda = document.getElementById('busqueda');
    var boton = document.getElementById('boton');
    var boton1 = document.getElementById('boton1')
    var boton2 = document.getElementById('boton2')
    var boton3 = document.getElementById('boton3')
    var boton4 = document.getElementById('boton4')
    var boton5 = document.getElementById('boton_alumnos')
    var boton6 = document.getElementById('boton_coumicados')
    var boton7 = document.getElementById('boton5')
    /*
    const url = "";

    fetch(url)
    .then(response => {
        if (!response.ok) {
            imagen_404();   
        } else {
            return response.json();
        }
    })
    .then(data =>{
         
    })
    .catch(error => {
        console.log(error);
    });
    */

    busqueda.addEventListener('keydown', function (event) {

        if (event.key === 'Enter') {
            var valorInput = event.target.value;
            filtro(valorInput);
        }
    });
    boton.addEventListener('click', function () {
        var campo = document.getElementById('busqueda').value;
        filtro(campo);
    });

    boton1.addEventListener('click', function () {
        // primero vamos a desaparecer todo lo que tenag el div 
        console.log('hola')
        var div_tabla = document.getElementById('tablas')
        var div = document.getElementById('comunicados')
        var div_contraseña = document.getElementById('div3')
        var div_examenes = document.getElementById('div4')

        div_tabla.innerHTML = ''
        div.style.display = 'block'
        div_examenes.style.display = 'none'
        div_contraseña.style.display = 'none'




    })

    boton2.addEventListener('click', function () {
        var div_contraseña = document.getElementById('div3')
        var div_tabla = document.getElementById('tablas')
        var comunicados = document.getElementById('comunicados')
        var div_examenes = document.getElementById('div4')
        div_contraseña.style.display = 'block'
        div_examenes.style.display = 'none'
        div_tabla.innerHTML = " "
        comunicados.style.display = 'none'
    })
    boton3.addEventListener('click', function () {
        console.log("hola mundo")
        var div_examenes = document.getElementById('div4')
        var div_contraseña = document.getElementById('div3')
        var div_tabla = document.getElementById('tablas')
        var comunicados = document.getElementById('comunicados')
        div_tabla.innerHTML = " "
        div_contraseña.style.display = 'none'
        comunicados.style.display = 'none'
        div_examenes.style.display = "block"
    })
    boton4.addEventListener('click', function () {
        console.log("hola mundo")
        var matricula = document.getElementById("matricula").value
        var contraseña = document.getElementById("contraseña").value
        var contraseña2 = document.getElementById("contraseña2").value
        var mensaje = document.getElementById('mensaje')
        var mensaje2 = document.getElementById('mensaje2')
        var mensaje3 = document.getElementById('mensaje3')

        mensaje.innerHTML = ""
        mensaje2.innerHTML = ""
        mensaje3.innerHTML = ""

        // Verificar campos vacíos
        if (matricula == "") {
            mensaje.innerHTML = "campo vacío"
        }
        if (contraseña == "") {
            mensaje2.innerHTML = "campo vacío"
        }
        if (contraseña2 == "") {
            mensaje3.innerHTML = "campo vacío"
        }

        // Verificar si las contraseñas coinciden
        if (contraseña != contraseña2) {
            mensaje2.innerHTML = "Las contraseñas no coinciden"
            mensaje3.innerHTML = "Las contraseñas no coinciden"
        }

        // Si no hay campos vacíos ni contraseñas que no coinciden, proceder con la acción
        if (matricula != "" && contraseña != "" && contraseña2 != "" && contraseña == contraseña2) {
            console.log(matricula)
            console.log(contraseña)
            const url_cambio = "http://127.0.0.1:3000/cambio/" + matricula + "/" + contraseña
            fetch(url_cambio)
                .then(response => {
                    if (!response.ok) {
                        imagen_404()
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    var arreglo = data
                    console.log(arreglo)
                    console.log(arreglo.length)
                })
        }
    })

    boton5.addEventListener('click', function () {

        var div_examenes = document.getElementById('div4')
        var div_contraseña = document.getElementById('div3')
        var div_tabla = document.getElementById('tablas')
        var comunicados = document.getElementById('comunicados')
        div_tabla.innerHTML = " "
        div_contraseña.style.display = 'none'
        comunicados.style.display = 'none'
        div_examenes.style.display = "none"

        var titulo = document.createElement('h1')
        var mensaje = document.createElement('h2')
        titulo.innerHTML = "Mensajes"
        mensaje.innerHTML = "Aun no cuentas con mensajes de tus alumnos"
        div_tabla.appendChild(titulo)
        div_tabla.appendChild(mensaje)

        div_tabla.style.position = 'absolute';
        div_tabla.style.top = '270px';
        div_tabla.style.left = '370px';

    })
    boton6.addEventListener('click', function () {
        console.log("hola mundo ")
        var comunicados = document.getElementById('comunicados')
        var grupo = document.getElementById('grupo')
        var tipo = document.getElementById('tipo')
        var textarea = document.getElementById("texto");
        var valorSeleccionado = grupo.value;
        var valorSeleccionado2 = tipo.value
        var valorTextarea = textarea.value;
        console.log(valorSeleccionado)
        console.log(valorSeleccionado2)
        console.log(valorTextarea)

        // ahora va el fetch 
        const url_comunicado = "http://127.0.0.1:3000/comunicados/" + valorSeleccionado + "/" + valorSeleccionado2 + "/" + valorTextarea

        fetch(url_comunicado)
            .then(response => {
                if (!response.ok) {
                    imagen_404()
                } else {
                    return response.json()
                }
            })
            .then(data => {
                comunicados.innerHTML = ' '
                exito()
            })
            .catch(error => {
                console.log(error)
            })
    })

    boton7.addEventListener('click', function () {
        var div_examenes = document.getElementById('div4');
        var link = document.getElementById('url').value;
        var grupo = document.getElementById('grupo');
        var valorSeleccionado = grupo.value;
        var matricula = document.getElementById('matricula2').value;
        var materia = document.getElementById('materia').value;
        var mensaje = document.getElementById('mensaje3');
        var mensaje2 = document.getElementById('mensaje4');
        var mensaje3 = document.getElementById('mensaje5');

        mensaje.innerHTML = ''; // Limpiamos el contenido de los mensajes antes de verificar
        mensaje2.innerHTML = '';
        mensaje3.innerHTML = '';

        if (link == "" || matricula == "" || materia == "") {
            mensaje.innerHTML = "Campo vacío";
            mensaje2.innerHTML = "Campo vacío";
            mensaje3.innerHTML = "Campos vacíos";
        } else {
            div_examenes.innerHTML = "";
            exito();
        }
    });


});


function filtro(dato) {
    var comunicados = document.getElementById('comunicados')
    var div_contraseña = document.getElementById('div3')
    var div_examenes = document.getElementById('div4')
    div_contraseña.style.display = 'none'
    div_examenes.style.display = 'none'
    comunicados.style.display = 'none'

    // primero si el usuario ingresa una de las palabras reservadas 
    // ara una busqueda personalizada 
    const palabra = ["alumnos", "docentes", "grupos"];

    if (dato == palabra[0] || dato == palabra[1] || dato == palabra[2]) {
        // Aquí empezamos lo que es hacer la solicitud en en cada caso 
        switch (dato) {

            case "alumnos":

                var div_tabla = document.getElementById('tablas');
                div_tabla.innerHTML = " ";
                const url = "http://127.0.0.1:3000/mostrar/" + dato;
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            imagen_404();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {
                        let curso = []
                        const arreglo = data;
                        const elementos = arreglo.length;

                        /**
                         * top: 100px;
                           left: 180px;
                         */

                        // Primero tomamos las llaves del primer elemento del arreglo 
                        const llaves = Object.keys(arreglo[0]);
                        for (let i = 0; i < elementos; i++) {
                            var grupo = arreglo[i]['grupo']
                            curso.push(grupo)
                        }
                        curso.sort()
                        //console.log(curso)
                        let contador = {};

                        // Contar ocurrencias de cada elemento
                        curso.forEach(elemento => {
                            if (contador[elemento]) {
                                contador[elemento]++;
                            } else {
                                contador[elemento] = 1;
                            }
                        });
                        //console.log(contador)
                        var encabezado = Object.keys(contador)
                        var valores = Object.values(contador)
                        console.log(valores)
                        console.log(encabezado)
                        calcularGraficaDona(encabezado,valores)
                        calcularGraficaBarra(encabezado,valores)
                        // Ahora creamos la tabla 
                        var tabla = document.createElement('table');
                        tabla.setAttribute('border', '1');

                        var fila = document.createElement('tr');

                        for (let i = 0; i < llaves.length; i++) {
                            var celda = document.createElement('th');
                            celda.style.background = "cyan";
                            celda.innerHTML = llaves[i];
                            fila.appendChild(celda);
                        }

                        tabla.appendChild(fila);

                        // Agregando los datos por fila 

                        for (let i = 0; i < elementos; i++) {
                            var fila = document.createElement('tr');
                            var datos = Object.values(arreglo[i]);
                            for (let j = 0; j < datos.length; j++) {
                                var celda = document.createElement('td');
                                var bandera = isNaN(datos[j]);
                                if (j == 0) {
                                    celda.style.background = "yellow";
                                }
                                if (bandera == false && j !== 0 && datos[j] < 6) {
                                    celda.style.background = "red";
                                    celda.style.color = "white";
                                }
                                celda.innerHTML = datos[j];
                                fila.appendChild(celda);
                            }
                            tabla.appendChild(fila);
                        }
                        div_tabla.appendChild(tabla);
                        div_tabla.style.position = 'absolute';
                        div_tabla.style.top = '150px';
                        div_tabla.style.left = '30px';

                    })
                    .catch(error => {
                        console.log(error);
                    });

                break;

            case "docentes":

                var div_tabla2 = document.getElementById('tablas');
                div_tabla2.innerHTML = " ";
                const url2 = "http://127.0.0.1:3000/mostrar/" + dato;
                console.log(url2);

                fetch(url2)
                    .then(response => {
                        if (!response.ok) {
                            imagen_404();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {

                        const arreglo = data;
                        const elementos = arreglo.length;

                        const llaves = Object.keys(arreglo[0]);

                        var tabla = document.createElement('table');
                        tabla.setAttribute('border', '1');

                        var fila = document.createElement('tr');

                        for (let i = 0; i < llaves.length; i++) {
                            var celda = document.createElement('th');
                            celda.style.background = "cyan";
                            celda.innerHTML = llaves[i];
                            fila.appendChild(celda);
                        }

                        tabla.appendChild(fila);

                        for (let i = 0; i < elementos; i++) {
                            var fila = document.createElement('tr');
                            var datos = Object.values(arreglo[i]);
                            for (let j = 0; j < datos.length; j++) {
                                var celda = document.createElement('td');
                                if (j == 0) {
                                    celda.style.background = "yellow";
                                }
                                celda.innerHTML = datos[j];
                                fila.appendChild(celda);
                            }
                            tabla.appendChild(fila);
                        }

                        div_tabla2.appendChild(tabla);
                        div_tabla2.style.position = 'absolute';
                        div_tabla2.style.top = '160px';
                        div_tabla2.style.left = '480px';

                    })
                    .catch(error => {
                        console.log(error);
                    });

                break;

            case "grupos":

                var div_tabla2 = document.getElementById('tablas');
                div_tabla2.innerHTML = " ";
                const urlgrupos = "http://127.0.0.1:3000/mostrar/" + dato;
                console.log(urlgrupos);

                fetch(urlgrupos)
                    .then(response => {
                        if (!response.ok) {
                            imagen_404();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {

                        const arreglo = data;
                        const elementos = arreglo.length;

                        const llaves = Object.keys(arreglo[0]);

                        var tabla = document.createElement('table');
                        tabla.setAttribute('border', '1');

                        var fila = document.createElement('tr');

                        for (let i = 0; i < llaves.length; i++) {
                            var celda = document.createElement('th');
                            celda.style.background = "cyan";
                            celda.innerHTML = llaves[i];
                            fila.appendChild(celda);
                        }

                        tabla.appendChild(fila);

                        for (let i = 0; i < elementos; i++) {
                            var fila = document.createElement('tr');
                            var datos = Object.values(arreglo[i]);
                            for (let j = 0; j < datos.length; j++) {
                                var celda = document.createElement('td');
                                if (j == 0) {
                                    celda.style.background = "yellow";
                                }
                                celda.innerHTML = datos[j];
                                fila.appendChild(celda);
                            }
                            tabla.appendChild(fila);
                        }

                        div_tabla2.appendChild(tabla);

                    })
                    .catch(error => {
                        console.log(error);
                    });

                break
        }
    } else if (dato == '') {

        imagen_no_resultados()

    } else {

        var bandera = isNaN(dato);

        switch (bandera) {

            case true:
                // aqui si manda una cadena 
                var div_tabla = document.getElementById('tablas');
                div_tabla.innerHTML = " ";

                var div = document.getElementById('tablas');
                div.innerHTML = ' ';

                const url5 = 'http://127.0.0.1:3000/alumnos/' + dato;

                fetch(url5)
                    .then(response => {
                        if (!response.ok) {
                            imagen_404();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {

                        var arreglo = data;
                        var elementos = arreglo.length;
                        // modificar aqui ponemos el else 

                        if (elementos <= 0) {
                            console.log('No se encontró ningún dato');
                            // Aquí hay que poner imagen de que no se encontró nada 
                            imagen_no_resultados()
                        } else {

                            console.log('Llegó un dato o más');
                            // Creamos tabla 
                            const llaves = Object.keys(arreglo[0]);

                            var tabla = document.createElement('table');
                            tabla.setAttribute('border', '1');

                            var fila = document.createElement('tr');

                            for (let i = 0; i < llaves.length; i++) {
                                var celda = document.createElement('th');
                                celda.style.background = "cyan";
                                celda.innerHTML = llaves[i];
                                fila.appendChild(celda);
                            }
                            tabla.appendChild(fila);

                            for (let i = 0; i < elementos; i++) {
                                var fila = document.createElement('tr');
                                var datos = Object.values(arreglo[i]);
                                for (let j = 0; j < datos.length; j++) {
                                    var celda = document.createElement('td');
                                    var bandera = isNaN(datos[j]);
                                    if (j == 0) {
                                        celda.style.background = "yellow";
                                    }
                                    if (bandera == false && j !== 0 && datos[j] < 6) {
                                        celda.style.background = "red";
                                        celda.style.color = "white";
                                    }
                                    celda.innerHTML = datos[j];
                                    fila.appendChild(celda);
                                }
                                tabla.appendChild(fila);
                            }
                            div.appendChild(tabla);
                            div_tabla.style.position = 'absolute';
                            div_tabla.style.top = '150px';
                            div_tabla.style.left = '270px';

                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });


                break;

            case false:

                var div = document.getElementById('tablas');
                div.innerHTML = ' ';

                const url4 = 'http://127.0.0.1:3000/alumnos/' + dato;

                fetch(url4)
                    .then(response => {
                        if (!response.ok) {
                            imagen_404();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {

                        var arreglo = data;
                        var elementos = arreglo.length;

                        switch (elementos) {
                            case 0:
                                console.log('No se encontró ningún dato');
                                // Aquí hay que poner imagen de que no se encontró nada 
                                imagen_no_resultados()
                                break;
                            case 1:
                                console.log('Llegó un dato o más');
                                // Creamos tabla 
                                const llaves = Object.keys(arreglo[0]);

                                var tabla = document.createElement('table');
                                tabla.setAttribute('border', '1');

                                var fila = document.createElement('tr');

                                for (let i = 0; i < llaves.length; i++) {
                                    var celda = document.createElement('th');
                                    celda.style.background = "cyan";
                                    celda.innerHTML = llaves[i];
                                    fila.appendChild(celda);
                                }
                                tabla.appendChild(fila);

                                for (let i = 0; i < elementos; i++) {
                                    var fila = document.createElement('tr');
                                    var datos = Object.values(arreglo[i]);
                                    for (let j = 0; j < datos.length; j++) {
                                        var celda = document.createElement('td');
                                        var bandera = isNaN(datos[j]);
                                        if (j == 0) {
                                            celda.style.background = "yellow";
                                        }
                                        if (bandera == false && j !== 0 && datos[j] < 6) {
                                            celda.style.background = "red";
                                            celda.style.color = "white";
                                        }
                                        celda.innerHTML = datos[j];
                                        fila.appendChild(celda);
                                    }
                                    tabla.appendChild(fila);
                                }
                                div.appendChild(tabla);
                                break;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
        }
    }
}

function imagen_404() {
    var div = document.getElementById('tablas');
    div.innerHTML = ' ';
    var imagen = document.createElement('img');
    imagen.setAttribute('src', '/icons/error_servidor.png');
    imagen.setAttribute('width', '700px');
    div.appendChild(imagen);
    div.style.position = 'absolute';
    div.style.top = '110px';
    div.style.left = '420px';
}

function imagen_no_resultados() {
    var div = document.getElementById('tablas');
    div.innerHTML = ' ';
    var imagen = document.createElement('img');
    imagen.setAttribute('src', '/icons/no_resultados.png');
    imagen.setAttribute('width', '700px');
    div.appendChild(imagen);
    div.style.position = 'absolute';
    div.style.top = '110px';
    div.style.left = '420px';
}
function exito() {
    var div = document.getElementById('tablas');
    div.innerHTML = ' ';
    var imagen = document.createElement('img');
    imagen.setAttribute('src', '/icons/exito.png');
    imagen.setAttribute('width', '700px');
    div.appendChild(imagen);
    div.style.position = 'absolute';
    div.style.top = '110px';
    div.style.left = '420px';
}

function calcularGraficaDona(encabesados , datos ){

    var canva = document.getElementById('graficadona').getContext('2d');
    var myDoughnutChart = new Chart(canva, {
        type: 'doughnut',  // Tipo de gráfico de dona
        data: {
            labels: encabesados,
            datasets: [{
                label: 'Alumnos',
                data: datos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',   // Colores del borde
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,  
            maintainAspectRatio: false,  
        }
    });

}
function calcularGraficaBarra(encabesados , datos ){

    var canva = document.getElementById('graficabarra').getContext('2d');
    var myDoughnutChart = new Chart(canva, {
        type: 'bar',  // Tipo de gráfico de barra
        data: {
            labels: encabesados,
            datasets: [{
                label: 'Alumnos',
                data: datos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',   // Colores del borde
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,  
            maintainAspectRatio: false,  
        }
    });

}