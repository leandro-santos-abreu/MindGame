import { Wrap } from "native-base";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        backgroundColor: "#397DC9",
        padding: 10,
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        
    },
    headerTextColumn: {
        flexDirection:'column',
        margin: 10,
    },
    headerText:{
        color: "#F5F2E6"
    },
    icone: {
        backgroundColor: "#F5DEA8",
        width: 60,
        height: 60,
        borderRadius: 0.5 * 60
    },
    titles:{
        color: '#397DC9',
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 25,
        marginBottom: 25
    },
    imagem: {
        resizeMode:"contain"
    },
    modal:{
        backgroundColor: "#03377D",
        width: 320,
        height: 300
    },
    flexContainer: {
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        marginTop: 20,
        marginLeft: 135
    },
    caixaPartidas: {
        padding: 11,
        backgroundColor: "#95d8fe",
        marginTop: 5,
        marginRight: 5,
        width: 190,
        borderRadius: 10
    },
    iconeFases: {
        width: 82,
        height: 90,
        marginLeft: 8
    },
    modalDadosTitulo:{
        color: "#FFFFFF",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: 20,
        marginLeft: 145
    },
    modalDadosTexto: {
        color: "#FFFFFF",
        fontSize: 13,
        fontStyle: "normal",
        fontWeight: 500,
        marginLeft: 5
    }
})