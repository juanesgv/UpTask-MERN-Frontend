import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()
    
    if(cargando){
        return (<Spinner/>)
    }

    return (
        <>
            {auth._id ? 
            (
                <div className="bg-gray-100">
                    <Header/>
                    <div className="md:flex md:min-h-screen ">
                        <Sidebar/>
                        <main className="flex-1 p-10">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/"/>}
            <ToastContainer/>
        </>
    )
}

export default RutaProtegida
