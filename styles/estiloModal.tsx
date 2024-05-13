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
        height: "95%",
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
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
});

export default estiloModal
