import { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export function UserInfoProvider( {children} ) {
  const [TipoUsuario, setTipoUsuario] = useState("Jogador")
  const [IdPaciente, setIdPaciente] = useState("")

  const [partidasUsuarioJogador, setPartidasUsuarioJogador] = useState([])

  function definirTipoUsuario(tipoUsuario){
    setTipoUsuario(tipoUsuario)
    return 'ok'
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

  function definirPartidasUsuarioJogador(partidas){
    setPartidasUsuarioJogador(partidas)
    return 'ok'
  }

  function buscarIdPaciente(){
    return IdPaciente;
  }

  function buscarTipoUsuario(){
    return TipoUsuario;
  }

  function buscarPartidasUsuarioJogador(){
    return partidasUsuarioJogador;
  }

  return (
    <GlobalContext.Provider value={{
        definirTipoUsuario,
        buscarTipoUsuario,
        definirIdPaciente,
        buscarIdPaciente,
        definirPartidasUsuarioJogador,
        buscarPartidasUsuarioJogador
    }}>
      {children}
    </GlobalContext.Provider>
  )
}