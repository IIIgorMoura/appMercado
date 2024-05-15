import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArmazenamentoListas() {

    async function obterItem(chave) {
        try {
            const listas = await AsyncStorage.getItem(chave);
            return JSON.parse(listas) || []; 
        } catch (erro) {
            console.error("Erro ao obter itens", erro); 
            return [];
        }
    }

    async function salvarItem(chave, valor) {
        try {
            let listas = await obterItem(chave);
            listas.push(valor);
            await AsyncStorage.setItem(chave, JSON.stringify(listas));

        } catch (erro) {
            console.error("Erro ao salvar item", erro); 
        }
    }

    async function removerItem(chave, item) {
        try {
            let listas = await obterItem(chave);
            let listasAtualizadas = listas.filter((elemento) => elemento !== item);
            await AsyncStorage.setItem(chave, JSON.stringify(listasAtualizadas));
            return listasAtualizadas;

        } catch (erro) {
            console.error("Erro ao remover item", erro);
        }
    }

    return {
        obterItem,
        salvarItem,
        removerItem
    };
}