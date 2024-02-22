import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Spinner from "../components/Spinner"
import { io } from "socket.io-client"

let socket

const Proyectos = () => {

  const { proyectos, cargando } = useProyectos()

  useEffect(()=>{
    //enviamos datos al servidor con el evento 'prueba'
    socket = io(import.meta.env.VITE_API_URL)
    socket.emit('prueba', proyectos)

    //respuesta del servidor
    socket.on('respuesta', (persona)=>{
      console.log('Desde el frontend', persona)
    })
  },) //useEffect sin dependencia para qu esté escuchando todo el momento

  return (
    cargando ? (
      <Spinner />
    ) : (
      <>
        <h1 className='text-4xl font-black'>
          Proyectos
        </h1>

        <div className="bg-white shadow mt-10 rounded-lg">
          {proyectos.length ?
            proyectos.map(p => (
              <PreviewProyecto key={p._id} proyecto={p} />
            )) :
            <p className="text-center text-gray-600 uppercase p-5">Aún no hay proyectos</p>
          }
        </div>
      </>
    )
  );
}

export default Proyectos
