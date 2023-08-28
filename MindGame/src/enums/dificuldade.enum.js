export const DificuldadeEnum = {
    Facil: "Fácil",
    Medio: "Médio",
    Dificil: "Difícil"
}

export function valueToEnum(value: string){
    return DificuldadeEnum[value];
}