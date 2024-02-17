import { Link } from "react-router-dom"

const PreviewProyecto = ({ proyecto }) => {

    const { nombre, _id, cliente } = proyecto
    return (
        <div className="border-b p-5 flex items-center">
            <div className="flex-1">
                <p className="">
                    {nombre}
                </p>
                <p className="text-sm text-gray-500 uppercase">
                    {cliente}
                </p>
            </div>

            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold ">
                Ver proyecto
            </Link>
        </div>
    )
}

export default PreviewProyecto
