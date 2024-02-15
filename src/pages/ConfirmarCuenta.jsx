import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {

                const url = `/usuarios/confirmar/${token}`
                const { data } = await clienteAxios.get(url)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmarCuenta()
    }, [])

    const { msg } = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl mb-20'>Confirma tu cuenta  y  administra <span className='text-slate-700'> proyectos </span> </h1>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
                {msg && <Alerta alerta={alerta} />}


                <Link to="/" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    Inicia sesión
                </Link>

            </div>
        </>
    )
}

export default ConfirmarCuenta
