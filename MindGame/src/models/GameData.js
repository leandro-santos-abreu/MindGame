import { TemasEnum } from "../enums/temas.enum";

export default class GameData{
    Dificuldade: string;
    Jogo: string;
    Tema: TemasEnum;
    TempoDuracao: Number;
    QuantidadeCliques: Number;
    JogadorId: string;
    TempoPrimeiroClique: Number;
    DataInicio: Date;
    Vitoria: Boolean;
    
    constructor(Dificuldade, Jogo, Tema, TempoDuracao, QuantidadeCliques, JogadorId, TempoPrimeiroClique, DataInicio, Vitoria) {
        this.Dificuldade = Dificuldade,
        this.Jogo = Jogo
        this.Tema = Tema,
        this.TempoDuracao = TempoDuracao,
        this.QuantidadeCliques = QuantidadeCliques,
        this.JogadorId = JogadorId,
        this.TempoPrimeiroClique = TempoPrimeiroClique,
        this.DataInicio = DataInicio,
        this.Vitoria = Vitoria
    }

    toJSON() {
        return {
            Dificuldade: this.Dificuldade,
            Jogo: this.Jogo,
            Tema: this.Tema,
            TempoDuracao: this.TempoDuracao,
            QuantidadeCliques: this.QuantidadeCliques,
            JogadorId: this.JogadorId,
            TempoPrimeiroClique: this.TempoPrimeiroClique,
            DataInicio: this.DataInicio,
            Vitoria: this.Vitoria
        };
    }
}