import { TemasEnum } from "../enums/temas.enum";

export default class GameData{
    Dificuldade: string;
    Tema: TemasEnum;
    constructor(Id, Tema) {
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