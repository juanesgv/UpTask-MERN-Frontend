import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Spinner from "../components/Spinner"

const Proyecto = () => {

    const params = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])


    return (
        cargando ? <Spinner /> : (
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <Link to='/proyectos'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h1 className="font-black text-4xl">
                        {proyecto?.proyecto?.nombre || "Proyecto no disponible"}
                    </h1>
                </div>

                <div className="flex items-center gap-3 text-gray-700 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    <Link to={`/proyectos/editar/${params.id}`} className="uppercase font-bold">Editar</Link>
                </div>

            </div>
        )
    )
}

export default Proyecto


