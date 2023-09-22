import { StyleSheet } from "react-native";

export default StyleSheet.create({
    floresta:{
        height: 109,
        width: 221,
        backgroundColor: '#154903',
        borderRadius: 5,
        elevation: 6,
        borderColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    praia:{

    },
    oceano:{

    },
    background:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center" 
    },
    containerAnimacao:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5DEA8",
      },
    imagem: {
        height: 300,
        width: 300
    },
    icones:{
        width: 50,
        height: 50
    },
    timer:{
        width: 100,
        height: 30,
        backgroundColor: '#EAEAEA',
        margin: 20,
        alignSelf: "flex-end",
        borderRadius: 5,
        elevation: 6,
        borderColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    modal:{
        backgroundColor: "green",
        width: 320,
        height: 300
    },
    button:{
        padding: 20,
        backgroundColor: "green",
        width: 300,
        height: 70,
    }
})