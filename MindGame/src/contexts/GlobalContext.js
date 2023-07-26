import { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export function UserInfoProvider( {children} ) {
  const [TipoUsuario, setTipoUsuario] = useState("Jogador")

  function definirTipoUsuario(usuario, tipoUsuario){
    if(usuario){
      setTipoUsuario(tipoUsuario)
      return 'ok'
    }
    else {
      return 'Falha ao Definir Tipo do Usuário'
    }
  }

  function buscarTipoUsuario(){
    return TipoUsuario;
  }

  return (
    <GlobalContext.Provider value={{
        definirTipoUsuario,
        buscarTipoUsuario
    }}>
      {children}
    </GlobalContext.Provider>
  )
}