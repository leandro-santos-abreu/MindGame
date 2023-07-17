import { PatternEnum, valueToEnum } from "../enums/patterns.enum";

export const alteraDados = (variavel, valor, dados, setDados) =>{
  setDados({
    ...dados,
    [variavel]: valor
  })
};

export const verificarEntradaVazia = (dados, setDados) => {
  for(const [variavel, valor] of Object.entries(dados)){
    if (valor == ""){
      setDados({
        ...dados,
        [variavel]: null
      })
      return true;
    } 
  }
  return false;
}


export function regexValidation(value, pattern: PatternEnum) {
  if(!value) return false;
  if (pattern) {
    regexPattern = valueToEnum(pattern);
    console.log(regexPattern)
    const condition = new RegExp(regexPattern);
    return !condition.test(value);
  }

  return false;
}