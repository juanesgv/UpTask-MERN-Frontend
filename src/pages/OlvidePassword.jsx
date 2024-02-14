import { Link } from "react-router-dom"

const OlvidePassword = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Recupera tu contraseña y no pierdas tus <span className='text-slate-700'> proyectos </span> </h1>

            <form className='my-10 bg-white shadow rounded-lg p-8'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email de registro'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                    />
                </div>

                <input
                    type='submit'
                    value={"Enviar instrucciones"}
                    className='bg-sky-700 w-full py-3 mb-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/registrar" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link to="/" className="block text-center mb-5 text-slate-500 uppercase text-sm hover:text-sky-700 hover:font-medium">
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
            </nav>
        </>
    )
}

export default OlvidePassword
