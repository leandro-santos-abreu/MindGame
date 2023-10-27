import { TemasEnum } from "../enums/temas.enum";

export default class GameData{
    Dificuldade: string;
    Jogo: string;
    Tema: TemasEnum;
    TempoDuracao: Number;
    QuantidadeCliques: Number;
    JogadorId: string;
    
    constructor(Dificuldade, Jogo, Tema, TempoDuracao, QuantidadeCliques, JogadorId) {
        this.Dificuldade = Dificuldade,
        this.Jogo = Jogo
        this.Tema = Tema,
        this.TempoDuracao = TempoDuracao,
        this.QuantidadeCliques = QuantidadeCliques,
        this.JogadorId = JogadorId
    }

    toJSON() {
        return {
            Dificuldade: this.Dificuldade,
            Jogo: this.Jogo,
            Tema: this.Tema,
            TempoDuracao: this.TempoDuracao,
            QuantidadeCliques: this.QuantidadeCliques,
            JogadorId: this.JogadorId
        };
    }
}