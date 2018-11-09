Create Database Asistencia;
Use Asistencia;

create Table Alumno (
AlumnoId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
AlumnoName varchar (30) NOT NULL,
)
create table Profesor(
ProfesorId smallint IDENTITY(1,1) PRIMARY key NOT NULL,
ProfesorName varchar (30) NOT NULL,
)
create Table Curso(
CursoId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
CursoName varchar (30) NOT NULL,
ProfesorId smallint FOREIGN KEY REFERENCES Profesor(ProfesorId),
)
create Table Matricula(
MatriculaId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
CursoId smallint FOREIGN KEY REFERENCES Curso(CursoId),
AlumnoId smallint FOREIGN KEY REFERENCES Alumno(AlumnoId),
)
create Table Asistencia(
AsistenciaId smallint IDENTITY (1,1) PRIMARY key NOT NULL,
MatriculaId smallint FOREIGN KEY REFERENCES Matricula(MatriculaId), 
Asistenciahoy varchar (7) NOT NULL,

)
