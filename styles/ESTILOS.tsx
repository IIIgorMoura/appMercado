import { StyleSheet } from 'react-native';

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  btnDestaque: {
    width: '90%',
    backgroundColor: "#6622F6",
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  modal: {
    backgroundColor: "#000",
    width: "85%",
    height: "85%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
},
});

export default ESTILOS
