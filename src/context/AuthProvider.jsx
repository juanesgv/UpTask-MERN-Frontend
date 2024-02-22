import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    useEffect(() =>{

        const token = localStorage.getItem('token')
        const autenticarUsuario = async () => {
            if(!token){ //si no hay token, hace return para que no continue con la autenticación
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                // navigate('/proyectos')
            } catch (error) {
                console.log(error)
                setAuth({})
            } finally{
                setCargando(false)
            }
        }
        autenticarUsuario()
    },[])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext