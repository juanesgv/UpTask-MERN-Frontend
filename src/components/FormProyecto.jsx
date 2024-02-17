import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormProyecto = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const {alerta ,mostrarAlerta, submitProyecto} = useProyectos()

    const handleSubmit = async e =>{
        e.preventDefault();
        
        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                msg : "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        //pasar los datos hacia el provider
        await submitProyecto({nombre, descripcion, fechaEntrega, cliente})
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }

    const {msg} = alerta

    return (
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>

            {msg && <Alerta alerta={alerta}/>}

            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>Nombre del proyecto</label>
                <input 
                    type='text' 
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    id='nombre' 
                    placeholder='Nombre del proyecto' 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>Descripcion del proyecto</label>
                <textarea 
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    id='descripcion' 
                    placeholder='descripcion del proyecto' 
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fecha-entrga'>Fecha de entrega</label>
                <input 
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    type = 'date'
                    id='fecha-entrga' 
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre-cliente'>Nombre del cliente</label>
                <input 
                    type='text' 
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    id='nombre-cliente' 
                    placeholder='Nombre del cliente' 
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear proyecto"
                className="bg-sky-600 w-full p-3 uppercase text-white font-bold cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormProyecto
