import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)

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

                const {data} = await clienteAxios('/proyectos', config)
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

    const obtenerProyecto = async id =>{
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

            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            
        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }
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
                cargando
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectoProvider }
export default ProyectosContext 