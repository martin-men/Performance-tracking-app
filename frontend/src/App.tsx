import { useState } from 'react';

import Asignatura from './components/Asignatura';
import Cursos from './pages/Cursos';
import Capacitaciones from './pages/Capacitaciones';
import Login from './pages/Login';
import RegistroNotas from './pages/RegistroNotas';
import Estudiantes from './pages/Estudiantes';
import EstudiantesCandidatos from './pages/EstudiantesCandidatos';
import { useContextoGlobal } from './ContextoGlobal';
import PerfilProfesor from './pages/Profesor';
import TablaProfesores from './components/TablaProfesores';
import SeguimientoSilabo from './components/SeguimientoSilabo';
import RegistroAvance from './components/RegistroAvance';
import RegistroAsistencia from './components/RegistroAsistencia';
import Asistencia from './pages/Asistencia';
import { Umbral } from './pages/Umbral';


function App() {
  const { paginaActual, rol, profesor } = useContextoGlobal()
  const [isSemesterClosed, setIsSemesterClosed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState('SeguimientoSilabo');
  const handleSemesterToggle = (isClosed: boolean) => {
    console.log('Semestre cerrado:', isClosed);
    setIsSemesterClosed(isClosed);
  };
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderAsignaturaChildren = (): React.ReactNode[] => {
    if (isSemesterClosed) {
      return [
        <Estudiantes key="estudiantes" id="Estudiantes" />,
        <EstudiantesCandidatos key="estudiantesCandidatos" id="Estudiantes candidatos" />,
        <RegistroAsistencia key="registroAsistencia" id="Registo Asistencia" />,
        <Umbral key="umbral" id='Umbral' />
      ];
    } else {
      return [
        <Estudiantes key="estudiantes" id="Estudiantes" />,
        currentPage === 'SeguimientoSilabo' ? (
          < SeguimientoSilabo id = "Seguimiento sílabo" handlePageChange ={ handlePageChange} showNotification />
        ) : (
          < RegistroAvance id = "Seguimiento sílabo" handlePageChange ={ handlePageChange} />
        ),
        <RegistroNotas key="registroNotas" id="Registro notas" />,
        <Asistencia key="asistencia" id="Asistencia" />,
        <Umbral key="umbralComprension" id='Umbral de comprensión' />
      ];
    }
  };

  const mostrarPagina = () => {

    if (rol === 'administrador') {
      switch (paginaActual) {
        case 'Profesor':
          return profesor ? <PerfilProfesor profesor={profesor} /> : <div>No se ha seleccionado ningún profesor</div>;
        case 'Home':
          return (
            <>
              <Asignatura cerrarSemestre={() => console.log('Cerrando semestre')}>
                <Componente_profesor id="Profesores" />
                <Componente_asignatura id="Asignaturas" />
              </Asignatura>
            </>
          );
      }
    } else if (rol === 'docente') {

      switch (paginaActual) {
        case 'Cursos':
          return <Cursos />
        case 'Capacitaciones':
          return <Capacitaciones />
        case 'Home':
          return (
            <Asignatura cerrarSemestre={handleSemesterToggle}>
              {renderAsignaturaChildren()}
            </Asignatura>
          );
      }
    } else {
      return <Login />
    }
  }

  return (
    <>
      {mostrarPagina()}
    </>
  )
}

function Componente_profesor({ id }: { id: string }) {
  return <TablaProfesores/>;
}

function Componente_asignatura({ id }: { id: string }) {
  return (
    <div id={id}>
      <h1>Componente Asignatura</h1>
    </div>
  );
}

export default App
