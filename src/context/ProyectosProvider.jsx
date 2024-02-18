import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormTarea,  setModalFormTarea] = useState(false)

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

            setAlerta({
                msg: 'Proyecto creado exitosamente',
                error: false
            })

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

            setAlerta({
                msg: 'Proyecto actualizado exitosamente',
                error: false
            })

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

            setAlerta({
                msg: data.msg,
                error: false
            })
            

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
                eliminarProyecto,
                modalFormTarea,
                handleModalTarea
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectoProvider }
export default ProyectosContext 