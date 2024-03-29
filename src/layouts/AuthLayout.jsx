import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
                <div className="md:w-2/3 lg:w-2/5">
                    <Outlet />
                </div>
            </main>
            <ToastContainer />
        </>
    )
}

export default AuthLayout
