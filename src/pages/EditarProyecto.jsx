import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import FormProyecto from "../components/FormProyecto"

const EditarProyecto = () => {
    const params = useParams()
    const { obtenerProyecto, proyecto } = useProyectos()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])


    return (
        <>
            <div className="flex gap-4 items-center">
                <Link to= {`/proyectos/${params.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                    </svg>
                </Link>
                <h1 className='text-4xl font-black'>
                    Editar proyecto : {proyecto.nombre}
                </h1>
            </div>

            <div className='mt-10 flex justify-center'>
                <FormProyecto />
            </div>
        </>
    )
}

export default EditarProyecto
