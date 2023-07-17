export const TipoUsuarioEnum = {
    Jogador: "Jogador",
    Profissional: "Profissional"
}

export function valueToEnum(value: string){
    return TipoUsuarioEnum[value];
}