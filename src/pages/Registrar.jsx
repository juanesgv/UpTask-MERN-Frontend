import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import axios from "axios"

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if([nombre,email,password,repetirPassword].includes('')){
            
            setAlerta({
                msg : "Todos los campos son obligatorios",
                error : true
            })
            return
        }

        if(password !== repetirPassword){
            setAlerta({
                msg : "Las contraseñas no coinciden",
                error : true
            })
            return
        }

        if(password.length < 6 ){
            setAlerta({
                msg : "La contraseña debe tener al menos 6 caracteres",
                error : true
            })
            return
        }

        setAlerta({}) //si pasa todas las validaciones setieamos el state

        //post a la api
        try {
            const api_url = import.meta.env.VITE_API_URL
            const {data} = await axios.post( `${api_url}/api/usuarios`, {nombre,email,password} )
            setAlerta({
                msg:data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta 

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Crea tu cuenta y administra tus <span className='text-slate-700'> proyectos </span> </h1>

            {msg && <Alerta  alerta={alerta}/>}

            <form className='my-10 bg-white shadow rounded-lg p-8' onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>Nombre</label>
                    <input
                        type='text'
                        id='nombre'
                        placeholder='Tu nombre'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email de registro'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Contraseña de registro'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='rpassword'>Repetir contraseña</label>
                    <input
                        type='password'
                        id='rpassword'
                        placeholder='Repetir contraseña'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input
                    type='submit'
                    value={"Crear cuenta"}
                    className='bg-sky-700 w-full py-3 mb-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
                <Link to="/olvide-password" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    ¿Olvidaste tu contraseña?
                </Link>
            </nav>
        </>
    )
}

export default Registrar
