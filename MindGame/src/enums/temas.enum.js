export const TemasEnum = {
    Floresta: "Floresta",
    Praia: "Praia",
    Oceano: "Oceano"
}

export function valueToEnum(value: string): TemasEnum{
    return TemasEnum[value];
}