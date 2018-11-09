var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var sql = require('mssql');
var env = require('dotenv');
var path = require('path');

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

app.get('/v1/Alumno', function(req, res, next){

    var minstudent = req.query.minstudent || 10;
    var AlumnoName = req.query.AlumnoName;
    
    sql.connect(sqlConfig).then(() =>{
        return sql.query(`select * from dbo.Alumno where [AlumnoName] like '${AlumnoName}'`)
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
    var AlumnoName = req.body.AlumnoName;
        
    if(!AlumnoName){
        res.send("error");
    }

    sql.connect(sqlConfig).then(() => {
        var q = `insert into dbo.Alumno([AlumnoName]) values('${AlumnoName}')`;
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