import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext()

const ProyectoProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})

    const navgiate = useNavigate()

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const {data} =await clienteAxios.post('/proyectos', proyecto, config)
            console.log(data)

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

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectoProvider}
export default ProyectosContext 