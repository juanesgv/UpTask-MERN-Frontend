import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({ proyecto }) => {

    const { auth } = useAuth()

    const { nombre, _id, cliente, creador } = proyecto

    return (
        <div className="border-b p-5 flex items-center justify-between">
            <div className="flex gap-3">
                <div className="">
                    <p>
                        {nombre}
                    </p>
                    <p className="text-sm text-gray-500 uppercase">
                        {cliente}
                    </p>
                </div>
                {auth._id !== creador && (
                    <p className="p-1 text-xs rounded-lg max-h-6 text-white font-bold bg-teal-500">Colaborador</p>
                )}
            </div>

            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold ">
                Ver proyecto
            </Link>
        </div>
    )
}

export default PreviewProyecto
