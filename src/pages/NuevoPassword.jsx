import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
import { toast } from "react-toastify"

const NuevoPassword = () => {

    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate();
    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                console.log(error.response)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password.length < 6 ){
            setAlerta({
                msg : "La contraseña debe tener al menos 6 caracteres",
                error : true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url,{password})
            toast.success(data.msg)
            setPasswordModificado(true)
            setTimeout(() => {
                navigate('/');
              }, 5000);
            
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Reestablece tu contraseña  y  continua administrando tus <span className='text-slate-700'> proyectos </span> </h1>

            {msg && <Alerta alerta={alerta}/>}

            {tokenValido && (
                <form className='my-10 bg-white shadow rounded-lg p-8' onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Nueva contraseña</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Escribe tu nueva oontraseña'
                            className='w-full mt-3 p-3 border rounded bg-gray-50'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type='submit'
                        value={"Reestablecer contraseña"}
                        className='bg-sky-700 w-full py-3 mb-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                    />
                </form>
            )}

            {passwordModificado && (
                <Link to="/" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    Inicia sesión
                </Link>
            )}
        </>
    )
}

export default NuevoPassword
