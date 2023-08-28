import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: "#93D7FF",
        fontFamily: "ArimaMadurai-Regular",
        alignItems: "center"
    },
    titulo:{
        color: "#03377D",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 90,
        marginBottom: 25,
        lineHeight: 30
    },
    imagens: {
        marginTop: 25,
    },
    botao:{
        width: 80,
        height: 40,
        backgroundColor: "#94D8FF",
        alignSelf: "center",
        marginRight: 15,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6
    },
    texto_botao:{
        textAlign: "center",
    },
    modal:{
        backgroundColor: "#03377D",
        width: 320,
        height: 154
    }
})