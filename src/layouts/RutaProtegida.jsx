import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()
    
    if(cargando){
        return (<Spinner/>)
    }

    return (
        <>
            {auth._id ? <Outlet/> : <Navigate to="/"/>}
        </>
    )
}

export default RutaProtegida
