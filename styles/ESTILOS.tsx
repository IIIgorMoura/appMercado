import { StyleSheet } from 'react-native';

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: "#6622F6",
  },
  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTab: {
    marginVertical: 5,
    backgroundColor: '#9868FF',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 25,
  },
  txtBranco: {
    color: '#fff',
    fontWeight:'bold'
  },
  txtRoxo: {
    color: "#6622F6",
    fontWeight:'bold'
  },
  btnDestaque: {
    width: '90%',
    backgroundColor: "#6622F6",
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  txtBtnDestaque: {
    fontSize: 18,
    color: "#fff",
  },
  btnDestaqueIcon: {
    margin: 10,
  },
  modal: {
    backgroundColor: "#000",
    width: "85%",
    height: "85%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  listaElementos: {
    marginVertical: 10,
    width: '90%',
  },
  listaItemTitulo: {
    fontSize : 20,
        fontWeight : '500',
        marginTop : '5%',
        marginVertical:5,
  },
  listaItem: {
    width: '100%',
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  categoriaProdutos: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
  },
  imgProdutos: {
    width: '100%',
    height: '85%',
  },

  titulo: {

    fontWeight: '900',
    fontSize: 25,
    marginTop: 10,
    
      },

      limiteCusto : {
        marginVertical:5,
      },

      remover : {
        color : 'red',
      marginLeft : '85%',
      fontSize: 30,
      marginTop:'-5%'
      },
});

export default ESTILOS
