Create Database AsistenciaAlumnos;
Use AsistenciaAlumnos

create Table Alumnos(
CtaAlumno varchar (6)PRIMARY KEY NOT NULL,
AlumnoNombre varchar (30) NOT NULL,
AlumnoImg nvarchar(max) NOT NULL,
)
create table Profesores(
CtaProfesor varchar (6) PRIMARY KEY NOT NULL,
ProfesorNombre varchar (30) NOT NULL,
)
create Table Cursos(
CursoId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
CursoNombre varchar (30) NOT NULL,
ProfesorId varchar(6) FOREIGN KEY REFERENCES Profesores(CtaProfesor),
)
create Table Matriculas(
MatriculaId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
CursoId smallint FOREIGN KEY REFERENCES Cursos(CursoId),
CtaAlumno varchar(6) FOREIGN KEY REFERENCES Alumnos(CtaAlumno),
)
create Table Asistencias(
AsistenciaId smallint IDENTITY (1,1) PRIMARY KEY NOT NULL,
MatriculaId smallint FOREIGN KEY REFERENCES Matriculas(MatriculaId),
CursoId smallint FOREIGN KEY REFERENCES Cursos(CursoId),
CtaAlumno varchar(6) FOREIGN KEY REFERENCES Alumnos(CtaAlumno), 
Asistenciahoy varchar (2) NOT NULL,

)
insert into Alumnos(CtaAlumno,AlumnoNombre,AlumnoImg)
values('A12345','Francisco Ayala','TeleTuvies')
insert into Profesores(CtaProfesor,ProfesorNombre)
values('P12345','Roberto Carlos')
insert into Cursos(CursoNombre,ProfesorId)
values('Programacion',P12345)
insert into Matriculas(CursoId,CtaAlumno)
values(2,'A12345')
insert into Asistencias(MatriculaId,CursoId,CtaAlumno,Asistenciahoy)
values(4,2,'A12345','SI')


