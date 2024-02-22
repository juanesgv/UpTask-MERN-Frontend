import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { data } from "autoprefixer";

const ProyectosContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [cargandoModal, setCargandoModal] = useState(false)
    const [modalFormTarea, setModalFormTarea] = useState(false)
    const [modalFormColaborador, setModalFormColaborador] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const navgiate = useNavigate()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {

        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {

            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)

        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            navgiate('/proyectos')
        } finally {
            setCargando(false)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data]) //hago una copia de lo que hay en el state de proyectos actualmente para agregarle el proyecro recien creado

            toast.success('Proyecto creado exitosamente')

            setTimeout(() => {
                setAlerta({})
                navgiate('/proyectos')
            }, 5000);

        } catch (error) {
            console.log(error)
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            //sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState) //comparo el proyecto actualizado con el que está en el state para actualizarlado en el state, los demás proyectos quedan igual
            setProyectos(proyectosActualizados)

            toast.success('Proyecto actualizado exitosamente')

            setTimeout(() => {
                setAlerta({})
                navgiate('/proyectos')
            }, 5000);

        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            //Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            toast.success(data.msg)


            setTimeout(() => {
                setAlerta({})
                navgiate('/proyectos')
            }, 5000);

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalFormTarea(!modalFormTarea)
        setTarea({})
    }
    const handleModalColaborador = () => {
        setModalFormColaborador(!modalFormColaborador)
    }

    const submitTarea = async tarea => {

        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea, config)

            //Agregar la tarea creada al state
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormTarea(false)
            toast.success('Tarea creada exitosamente')
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            console.log(data)

            //actualizar el dom
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)

            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormTarea(false)
            toast.success('Tarea editada exitosamente')
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const EliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(TareaState => TareaState._id !== tarea._id)
            setProyecto(proyectoActualizado)
            toast.success(data.msg)
            setModalEliminarTarea(false)
            setTarea({})

        } catch (error) {
            console.log(error)
        }
    }


    const submitColaborador = async email => {
        setCargandoModal(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config)
            setColaborador(data)
            setAlerta({})

        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargandoModal(false)
        }
    }

    const agregarColaborador = async email => {
        try {

            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)

            const colaboradorActual = {...colaborador} //hago una copia al colaborador actual, que lo tengo desde submitColaborador

            // Actualizar el estado del proyecto para reflejar el cambio
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = [...proyecto.colaboradores, colaboradorActual]
            console.log("Proyecto acualizado", proyectoActualizado)
            setProyecto(proyectoActualizado)

            //actualizar el estado del proyecto para reflejar el cambio (esta tambien me sirvió)
            // setProyecto((prevProyecto)=>{
            //     const nuevoProyecto = {...prevProyecto}
            //     nuevoProyecto.colaboradores = [...prevProyecto.colaboradores, colaboradorActual]
            //     return nuevoProyecto
            // })

            toast.success(data.msg)
            setColaborador({})

            // Cerrar el modal
            setModalFormColaborador(false);

        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setColaborador({})
        }
    }

    const handleModalEliminarColaborador = colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const EliminarColaborador = async () => {

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)

            toast.success(data.msg)
            setColaborador({})
            setModalEliminarColaborador(false)

        } catch (error) {

        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            const proyectoActualido = {...proyecto}
            proyectoActualido.tareas = proyectoActualido.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualido)
            setTarea({})
            setAlerta({})
            toast.success('Tarea actualizada exitosamente')
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                cargandoModal,
                eliminarProyecto,
                modalFormTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                EliminarTarea,
                modalFormColaborador,
                handleModalColaborador,
                submitColaborador,
                colaborador,
                agregarColaborador,
                modalEliminarColaborador,
                handleModalEliminarColaborador,
                EliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectoProvider }
export default ProyectosContext 