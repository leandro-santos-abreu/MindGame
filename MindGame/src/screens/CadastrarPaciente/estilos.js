import { Center } from "native-base";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: "#F5DEA8",
        fontFamily: "Inter-Regular"
    },
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
        color: '#000000',
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 30,
        marginBottom: 30
    },
    box:{
        backgroundColor: '#ffffff',
        width: 320,
        height: 70,
        alignSelf: "center",
        borderRadius: 5,
        shadowColor: 'black',
        marginBottom: 25
    },
    imagem: {
        resizeMode:"contain"
    },
    input_box: {
        marginTop: '5%',
        marginLeft: '10%',
        paddingRight: 30,
    },
    input_field:{
        backgroundColor: '#F5F2E6',
        textAlign: "left"
    },
    input_box_text: {
        color: "#575757",
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "bold"
    },
    Button:{
        width: 320,
        height: 50,
        alignSelf: "center",
        borderRadius: 5,
        shadowColor: 'black',
        marginTop: 20,
        backgroundColor: "#397DC9"
    }
})