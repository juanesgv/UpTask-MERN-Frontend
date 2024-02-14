import React from 'react'

const NuevoPassword = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Reestablece tu contraseña  y  continua administrando tus <span className='text-slate-700'> proyectos </span> </h1>

            <form className='my-10 bg-white shadow rounded-lg p-8'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Nueva contraseña</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Escribe tu nueva oontraseña'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                    />
                </div>

                <input
                    type='submit'
                    value={"Reestablecer contraseña"}
                    className='bg-sky-700 w-full py-3 mb-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>
        </>
    )
}

export default NuevoPassword
