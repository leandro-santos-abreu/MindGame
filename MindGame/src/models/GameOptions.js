import { TemasEnum } from "../enums/temas.enum";

export default class GameOptions{
    Dificuldade: string;
    Tema: TemasEnum;
    constructor(Dificuldade, Tema) {
        this.Dificuldade = Dificuldade,
        this.Tema = Tema
    }

    toJSON() {
        return {
            Dificuldade: this.Dificuldade,
            Tema: this.Tema
        };
    }
}