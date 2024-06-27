
const mysql = require('mysql')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const session = require('express-session');
const morgan = require('morgan')



const conexion = mysql.createConnection({

	host : '127.0.0.1',
	user : 'daren',
	password : '5882',
	database : 'alumnos'
})
conexion.connect((error)  => {
	if (error){
		console.log("error en la conexion",error)
	}else{
		console.log("conexion exitosa")
	}

})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({
	secret : "Megadeth58825613",
	resave : false,
	saveUninitialized:true,
	cookie: {secure:false} // todo cunado la subamos cambiarla a True 
}))			
app.use((req,res,next) => {
	const now = new Date();
	var metodo = req.method
	var ruta = req.url
	var hora = now.toLocaleString()
    console.log("Método ->", req.method);
    console.log("Ruta ->", req.url);
    console.log("Hora ->", now.toLocaleString());
	var consultaLogger = "insert into loggers(metodo,enlace,dia) values(?,?,?)"
	conexion.query(consultaLogger, [metodo,ruta,hora] ,(error,resultado) => {
			if(error){
				console.log("error en la insecion de datos")
			}else{
				console.log("Datos agregados con exito")
				next()
			}
	})	
})

app.get('/' , (req,res) => {
	res.sendFile(path.join(__dirname,"public","index.html"))
})

app.get('/login' , (req,res) => {
	res.sendFile(path.join(__dirname,"public","inicio.html"))
})

app.get('/ingreso/:correo/:contra', (req,res,next) => {
	var correo = req.params.correo
	var contra = req.params.contra
	console.log("Solicitud Entrate")
	var contra = req.params.contra
	var correo = req.params.correo
	const consulta = "select email from coordinador where email = ? and contra = ? "

	conexion.query(consulta, [correo,contra], (error, resultado) => {
        if (error) {
            console.log("Error en la consulta");
            res.status(500).send("Error en la consulta");
        } else if (resultado.length === 0) {
            res.status(401).send("Correo o contraseña incorrectos");
        } else { // todo si el usuario logro un inicio exitoso 
            console.log("Usuario autenticado"); 
            req.session.isAuthenticated = true; // todo decimos que el usuario ya esta en verdadero 
            req.session.user = resultado[0]; // todo almacenamos el nombre
			res.json(resultado)
        }
    });
	
})

// Middleware para verificar autenticación
function checkAuth(req, res, next) {
    if (req.session.isAuthenticated) {
        next(); // El usuario está autenticado, continuar con la siguiente ruta
    } else {
        //res.status(401).send('No está autenticado');
		res.status(500).sendFile(path.join(__dirname,"public","noencontrada.html"))
    }
}

// Aplicar el middleware de autenticación a todas las rutas que deben estar protegidas
app.use('/alumnos', checkAuth);
app.use('/mostrar', checkAuth);
app.use('/grupos', checkAuth);
app.use('/cambio', checkAuth);
app.use('/comunicados', checkAuth);

// ruta de busqueda por alumno de manera individual 

app.get('/alumnos/:id' , (req,res) => {
	var id = req.params.id
	const consulta = "select * from alumnos where id = ?"
	conexion.query(consulta , [id] , (error , resultado ) => {
		if(error){
			console.log("error en la consulta")
		}else {
			console.log("consulta realizada con exito")
			console.log(resultado)
			var longitud = resultado.length
			if(longitud != 0 ){
				res.json(resultado)
			}else{
				var consulta_secundaria = "select * from alumnos where nombre = ?"
				conexion.query(consulta_secundaria , [id] , (error,resultado) => {
					if(error){
						console.log("error")
					}else{
						// ahora mandmos por grupo 
						var longitud2 = resultado.length
						if(longitud2 != 0){
							res.json(resultado)
						}else{
							// ahora buscaremos grupos 
							var consulta_tercer = "select * from alumnos where grupo = ?"
							conexion.query(consulta_tercer , [id] , (error,resultado) => {
								if(error){
									console.log("error")
								}else{
									// ahora por el correo
									var longitud3 = resultado.length
									if (longitud3 != 0){
										res.json(resultado)
									}else{
										// buscamos por correo 
										var consulta_cuarta = 'select * from alumnos where correo = ? '
										conexion.query(consulta_cuarta , [id] , (error,resultado) => {

											if(error){
												console.log("error en conulta",error)
											}else{
												res.json(resultado)
											}
										})


									}

									
								}
							})
						}
						
						}
				})
			}
		}
	})
})

// ruta docente 

app.get('/mostrar/:palabra' , (req,res) => {
	var palabra = req.params.palabra
	switch(palabra){
		case "alumnos":
			const consulta = "select * from alumnos"
			conexion.query(consulta, [palabra] , (error, resultado) => {
					if(error){
						console.log(error)
					}else{
						res.json(resultado)
					}
			})
		break;
		case "docentes" :
			const consulta2 =  "select * from profesores"
			conexion.query(consulta2 , [palabra] , (error , resultado) => {
				if(error){
					console.log("error en la consulta")
				}else{
					res.json(resultado)
				}
			})
		break;
		
		case 'grupos' :
			const consulta3 = "select * from Grupos"
			conexion.query(consulta3,(error,resultado) => {
				if(error){
					console.log("error en consulta")
				}else{
					res.json(resultado)
				}
			})
		break; 
	}
})

// ruta que nos da el grupo o nos devuelve los grupos 

app.get('/grupos/' , (req,res) => {

	var grupo = req.params.grupo

	const consul = "select * from Grupos"

	conexion.query(consul ,(error,resultado) => {

		if(error){
			console.log("no se puede realizar la consulta")
		}else{
			res.json(resultado)
		}

	})
})

app.get("/cambio/:matricula/:contra",(req,res) => {

	// aqui aremos una consulta que haga la actualizacion 
	var matricula = req.params.matricula
	var contra = req.params.contra 
	const consulta = "UPDATE alumnos SET contra = ? WHERE id = ?"
	const consulta2 = "select id from alumnos where id = ?"
	console.log(matricula)
	console.log(contra)
	conexion.query(consulta , [contra,matricula] , (error,resultado) => {
		if(error){
			console.log("error en la consulta")
		}else{
			
			res.json(resultado)
		}
	})

})

// esta ruta es del boton cunado se presiona en busqueda que retorna 

app.get('/comunicados/:grupo/:tipo/:texto' , (req,res) => {
	var grupo = req.params.grupo 
	var tipo = req.params.tipo
	var texto = req.params.texto
	console.log(grupo)
	console.log(tipo)
	console.log(texto)
	var fecha = new Date();
	const consultaComunicados = 'INSERT INTO comunicados (mensaje, id_grupo, fecha_envio, tipo_comunicado) VALUES (?,?,?,?)'
	conexion.query(consultaComunicados , [texto,grupo,fecha,tipo] , (error , resultado) => {
			if(error){
				console.log('error en la consulta',error)
			}else{
				res.json(resultado)
			}
		})
})


app.use((req,res) => {
	//res.status(400).send("no existe la ruta a acceder ")
	res.status(500).sendFile(path.join(__dirname,"public","error404.html"))
})

module.exports = app 
