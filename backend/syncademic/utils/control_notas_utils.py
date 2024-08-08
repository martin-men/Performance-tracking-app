# Clases de utilidades para control de notas
# Utilizado para Feature 2
# Creado por Alejandra Colcha
from ..models.estudiante import Estudiante


class ControlNotas:
    """ Verifica si existe riesgo de bajar en el promedio o si ya lo hizo,
        cuál es su prioridad de atención.

        Attributes:
            estudiante (Estudiante)
            rango_advertencia (float)
            minimo_aceptable (float)
            promedio (float)
    """

    def __init__(self, estudiante: Estudiante):
        self.minimo_aceptable: float = 0.0
        self.rango_advertencia = 0.5
        self.estudiante = estudiante
        self.promedio: float = 0.0

    def definir_prioridad_alerta(self):
        """ Define la prioridad del estudiante basado en su número de incidencias por bajas calificaciones.

            Prioridad: BAJA, MEDIA, ALTA
        """
        incidencias = self.estudiante.numero_incidencias

        if 0 < incidencias < 3:
            self.estudiante.prioridad = "MEDIA"
        elif incidencias >= 3:
            self.estudiante.prioridad = "ALTA"
        elif incidencias == 0 and not self.existe_riesgo:
            self.estudiante.prioridad = "BAJA"

    @property
    def existe_riesgo(self):
        """ Riesgo de bajar su promedio del minimo aceptable
            Return:
                bool: True si existe riesgo, False si no existe."""
        return 0 < float(self.promedio) - float(self.minimo_aceptable) <= self.rango_advertencia

    @property
    def existe_incidencia(self):
        """ Incidencia: el estudiante ya bajó su promedio del minimo aceptable
            Return:
                bool: True si existe incidencia, False si no existe."""
        return self.promedio < self.minimo_aceptable

    @property
    def estudiante(self):
        return self._estudiante

    @property
    def rango_advertencia(self):
        return self._rango_advertencia

    @property
    def minimo_aceptable(self):
        return self._minimo_aceptable

    @property
    def promedio(self):
        return self._promedio

    @rango_advertencia.setter
    def rango_advertencia(self, value):
        self._rango_advertencia = value

    @minimo_aceptable.setter
    def minimo_aceptable(self, value):
        self._minimo_aceptable = value

    @estudiante.setter
    def estudiante(self, value):
        self._estudiante = value

    @promedio.setter
    def promedio(self, value):
        self._promedio = value
