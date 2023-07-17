export const PatternEnum = {
    Email: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
    Senha: ".{6,}"
}

export function valueToEnum(value: string){
    return PatternEnum[value];
}