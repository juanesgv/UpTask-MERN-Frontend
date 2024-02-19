export const formatearFecha = fecha => {
    console.log()

    const fecha1 = "2023-02-25"
    const fecha2 = "02-25-2023"
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day : 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}