import { StyleSheet } from 'react-native';

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: '900',
    fontSize: 25,
    marginTop: 10,
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
    marginHorizontal: 10,
  },
  listaElementos: {
    marginVertical: 10,
    width: '90%',
  },
  listaItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listaItemConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  listaItemIcone: {
    width: 45, 
    height: 45,
    marginRight: 10,
  },
  listaItemTexto: {
    flex: 1,
    fontSize: 20, 
    fontWeight: '500', 
    marginTop: 5, 
    marginLeft:20,
  },
  limiteCusto: {
    marginVertical: 2,
  },
  remover: {
    
    color:'red',
    right: 30, 
    fontSize:30,
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

  listaItemTitulo:{
    fontSize:20,
    fontWeight:'bold',
  },

  txtRoxo:{
    color: "#6622F6",
  },

  txtBranco:{
    color: "#fff",
  },
});

export default ESTILOS;
