var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var sql = require('mssql');
var env = require('dotenv');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'.'+getExtension(file.originalname))
    }
})

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var upload = multer({ storage: storage })

const result = env.config();
app.use(cors());
app.use(bodyParser());
app.use(function(err, req, res, next){
    console.error(err);
    res.send({ success: false, message: err })
})


const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    debug: true,
    options: {
        encrypt: false
    }
};

app.listen(parseInt(process.env.APP_PORT), function(){
    console.log("el servidor esta corriendo");
    console.log(result.parsed);
    console.log(sqlConfig);
  
});

app.get('/v1/Alumno/Matricula', function(req, res, next){

    var matricula = req.query.matricula;
   
    
    sql.connect(sqlConfig).then(() =>{
        return sql.query(`select * from dbo.Matriculas where [MatriculaId] like '${matricula}'`)
    }).then(result => {

        var data = {
            success : true,
            data : result.recordset,
        }
        res.send(data);
        sql.close();
   
}).catch(err => {
    return next(err);
});
})
app.get('/v1/Alumno/clases', function(req, res, next){

    var clases = req.query.clases;
       
    sql.connect(sqlConfig).then(() =>{
        return sql.query(`select * [CursoNombre] from dbo.Matriculas inner Join [Cursos] on [Matricula.CursoId] like '${matricula}' = [Matriculas.CursoId]`)
    }).then(result => {

        var data = {
            success : true,
            data : result.recordset,
        }
        res.send(data);
        sql.close();
   
}).catch(err => {
    return next(err);
});
})
app.get('/v1/Profesores/clases', function(req, res, next){

    var profesor = req.query.profesor;
       
    sql.connect(sqlConfig).then(() =>{
        return sql.query(`select * [CursoNombre] from dbo.Cursos inner Join [Profesor] on [Cursos.CtaProfesor] like '${profesor}' = [Profesores.CtaProfesor]`)
        }).then(result => {

        var data = {
            success : true,
            data : result.recordset,
        }
        res.send(data);
        sql.close();
   
}).catch(err => {
    return next(err);
});
})

app.post('/v1/Alumno/create', function(req, res, next){
    var ctaAlumno = req.body.ctaAlumno;
    var nombre = req.body.nombre;
    var imagen = req.body.imagen;
        
    if(!ctaAlumno && !nombre && !imagen){
        res.send("error");
    }

    sql.connect(sqlConfig).then(() => {
        var q = `insert into dbo.Alumnos([CtaAlumno], [Alumno], [AlumnoImg]) values('${ctaAlumno}, ${nombre}, ${imagen}')`;
        console.log(q);
        return sql.query(q)
    }).then(result => {
        var data = {
            success: true,
            message: `Se Ingresado ${result.rowsAffected} alumno nuevo`
    }

        res.send(data);

        sql.close();
    }).catch(err => {
        return next(err);
    })
})
app.post('/v1/Alumno/Asistencia', function(req, res, next){
    var matricula = req.body.matricula;
    var ctaAlumno = req.body.ctaAlumno;
    var curso = req.body.curso;
    var asistencia = req.body.asistencia;
        
    if(!ctaAlumno && !matricula){
        res.send("error Alumno no matriculado");
    }
    sql.connect(sqlConfig).then(() => {
        var q = `insert into dbo.Asistencia([MatriculaId], [CtaAlumno], [curso],[AsistenciaHoy] ) values(' ${matricula},${ctaAlumno}, ${curso}, ${asistencia}')`;
        console.log(q);
        return sql.query(q)
    }).then(result => {
        var data = {
            success: true,
            message: `Se Registrado la Asistencia`
    }

        res.send(data);

        sql.close();
    }).catch(err => {
        return next(err);
    })
})
