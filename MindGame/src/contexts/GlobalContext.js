import { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export function UserInfoProvider( {children} ) {
  const [TipoUsuario, setTipoUsuario] = useState("Jogador")
  const [IdPaciente, setIdPaciente] = useState("")

  function definirTipoUsuario(usuario, tipoUsuario){
    if(usuario){
      setTipoUsuario(tipoUsuario)
      return 'ok'
    }
    else {
      return 'Falha ao Definir Tipo do Usuário'
    }
  }

  function definirIdPaciente(pacienteId: string){
    if(pacienteId){
      setIdPaciente(pacienteId)
      return 'ok'
    }
    else {
      return 'Falha ao Definir IdPaciente'
    }
  }

  function buscarIdPaciente(){
    return IdPaciente;
  }

  function buscarTipoUsuario(){
    return TipoUsuario;
  }

  return (
    <GlobalContext.Provider value={{
        definirTipoUsuario,
        buscarTipoUsuario,
        definirIdPaciente,
        buscarIdPaciente
    }}>
      {children}
    </GlobalContext.Provider>
  )
}