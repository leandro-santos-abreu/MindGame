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
    }
})