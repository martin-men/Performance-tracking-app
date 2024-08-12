import Tabs from './Tabs';
import BarraNavegacion from './BarraNavegacion';

import '../styles/components/Asignatura.css'

type AsignaturaProps = {
    children: React.ReactNode[],
    cerrarSemestre: (isClosed: boolean) => void
}

function Asignatura({ children, cerrarSemestre }: AsignaturaProps) {

    return (
        <div className='contenedor-asignatura'>
            <BarraNavegacion />
            <Tabs cerrarSemestre={cerrarSemestre}>
                {children}
            </Tabs>
        </div>
    )
}

export default Asignatura
