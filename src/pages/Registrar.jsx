import { Link } from "react-router-dom"

const Registrar = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Crea tu cuenta y administra tus <span className='text-slate-700'> proyectos </span> </h1>

            <form className='my-10 bg-white shadow rounded-lg p-8'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>Nombre</label>
                    <input
                        type='text'
                        id='nombre'
                        placeholder='Tu nombre'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email de registro'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Contraseña de registro'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                    />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='rpassword'>Repetir contraseña</label>
                    <input
                        type='password'
                        id='rpassword'
                        placeholder='Repetir contraseña'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
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
