import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext()

const ProyectoProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])

    return(
        <ProyectosContext.Provider
            value={{
                proyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectoProvider}
export default ProyectosContext 