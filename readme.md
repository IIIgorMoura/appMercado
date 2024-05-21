O QUE RESOLVER

---- Estilos do aplicativo ----
	fontes, tamanho e densidade de fontes, tamanhos, modals, icones, lista de  produtos da categoria, lista de produtos da lista, etc;

---- Avanço em UX ----
Dev produtos das categorias base, vindo de inicio;
Adicionar modal de confirmação antes de deletar lista de compras ou produto;
Adicionar opção de editar listas e produtos;

---- Corrigir lógica modals AddProduto ----
Ao adicionar produto da categoria à lista, direcionar para o modal de Categorias de Lista, ao invés de fechar ambos modals;
Adicionar preço unitário e preço total à cada produto, multiplicando QNT * Preço unidade;
	Somar os preços total de cada produto e então multiplicar todos;
	Comparar o Preço total produtos com limite de custo
		se Preco total < Limite = return;
		se Preco total >= limite = alertar perguntando se deseja ignorar limite de custo
			se sim, txt do Preco Total fica vermelho
