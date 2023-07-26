import { Image } from 'native-base';
import fase_caca_figura_floresta from '../../../assets/fases/fase_caca_figura_floresta_icon.png'

import Floresta from '../../../assets/fases/fase_caca_figura_floresta.png';
import Praia from '../../../assets/fases/fase_caca_figura_praia.png';
import Oceano from '../../../assets/fases/fase_caca_figura_oceano.png';


export const fases_imagens = [
    {
        Id: 0,
        Icone: fase_caca_figura_floresta,
        Tema: "Floresta",
        Jogo: "Caça Figuras",
        Imagem: Floresta
    },
    {
        Id: 1,
        Icone: "",
        Tema: "Praia",
        Jogo: "Caça Figuras",
        Imagem: Praia
    },
    {
        Id: 2,
        Icone: "",
        Tema: "Oceano",
        Jogo: "Caça Figuras",
        Imagem: Oceano
    }
]

export function buscarImagensPorJogo(jogo: string){
    return fases_imagens.filter(f => f.Jogo === jogo);
}