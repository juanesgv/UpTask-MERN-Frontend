import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Spinner from "../components/Spinner"
import ModalFormTarea from "../components/ModalFormTarea"
import Tarea from "../components/Tarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import ModalFormColaborador from "../components/ModalFormColaborador"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Proyecto = () => {

    const params = useParams()
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto, handleModalTarea, handleModalColaborador } = useProyectos()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    const handleClick = () => {
        if (confirm('¿Deseas eliminar el proyecto?')) {
            eliminarProyecto(params.id)
        }
    }

    return (

        cargando ? <Spinner /> : (
            <>
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        <Link to='/proyectos'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <h1 className="font-black text-4xl">
                            {proyecto?.nombre || "Proyecto no disponible"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-red-600 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                            <button className="uppercase font-bold" onClick={handleClick} >Eliminar</button>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                            <Link to={`/proyectos/editar/${params.id}`} className="uppercase font-bold">Editar</Link>
                        </div>
                    </div>
                </div>

                <Tabs className="mt-5">
                    <TabList>
                        <Tab>Tareas del proyecto</Tab>
                        <Tab>Colaboradores</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
    
                            <div className="flex items-center justify-between mt-2">
                                <p className="font-bold text-xl">Tareas del proyecto</p>
                                <button onClick={handleModalTarea} type="button" className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 hover:bg-sky-700 text-white text-center flex items-center gap-2 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                    </svg>

                                    agregar tarea
                                </button>
                            </div>

                            <div className="bg-white shadow mt-10 rounded-lg">
                                {proyecto.tareas?.length ?
                                    proyecto.tareas.map(t => (
                                        <Tarea key={t._id} tarea={t} />
                                    )) :
                                    <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
                                }
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="flex items-center justify-between mt-2">
                                <p className="font-bold text-xl ">Colaboradores</p>
                                <button onClick={handleModalColaborador} type="button" className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 hover:bg-sky-700 text-white text-center flex items-center gap-2 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                    </svg>

                                    agregar colaborador
                                </button>
                            </div>
                        </TabPanel>

                    </TabPanels>
                </Tabs>

                <ModalFormTarea />
                <ModalEliminarTarea />
                <ModalFormColaborador />
            </>
        )
    )
}

export default Proyecto


