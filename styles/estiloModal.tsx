import { StyleSheet } from 'react-native';

const estiloModal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(25,25,25,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: "#fff",
        width: "90%",
        height: 600,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    contentReduzido: {
        backgroundColor: "#fff",
        width: "90%",
        height: 300,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    baseBtnsModalReduzido: {
        flexDirection: 'row',
        width: '95%',
        height: '20%',
        justifyContent: 'center',
    },
    btnVoltar: {
        width: '45%',
        backgroundColor: "none",
        borderRadius: 20,
        borderColor: "#6622F6",
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginTop: 10,
    },
    btnProximo: {
        width: '45%',
        backgroundColor: "#6622F6",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginTop: 10,
    },
    baseBtnsModal: {
        flexDirection: 'row',
        width: '95%',
        height: '10%',
        justifyContent: 'center',
    },
    formInput: {
        width: '95%',
    },
    formInputText: {
        marginTop: 30,
        marginBottom: 5, 
        fontWeight: '400',
    },
    input: {
        padding: 10,
        borderBottomColor: '#000',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },

    tituloModal: {
        fontSize:30,
        fontWeight:'700',
       
        
    },

   perigoIcon: {
        fontSize: 50,
        
    },

    txtModalReduzido: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    btnDestaqueModalReduzido: {
        width: '90%',
        backgroundColor: "#6622F6",
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        flexDirection: 'row',
    },
    containerModalTutorial: {
        flex: 1,
        backgroundColor: 'rgba(25,25,25,0.6)',
        alignItems: 'center',
    },
    contentReduzidoTutorialBemVindo: {
        backgroundColor: "#fff",
        position: 'absolute',
        width: "90%",
        height: 300,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        bottom: 20,
    },
    contentReduzidoTutorial: {
        backgroundColor: "#fff",
        position: 'absolute',
        width: "90%",
        height: 400,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        bottom: 20,
    },
    txtModalReduzidoTutorial: {
        marginTop: 10,
        marginBottom: 20,
        width: '75%',
    },
});

export default estiloModal
