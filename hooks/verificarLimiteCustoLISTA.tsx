import { useState, useEffect } from 'react';

export const VerificarLimiteCustoLISTA = (produtos, limite) => {
    const [totalPreco, setTotalPreco] = useState(0);
    const [limiteAlcancado, setLimiteAlcancado] = useState(false);

    useEffect(() => {
        const total = produtos.reduce((acc, produto) => acc + (produto.quantidade * produto.preco), 0);
        setTotalPreco(total);
        setLimiteAlcancado(total >= limite);
    }, [produtos, limite]);

    return { totalPreco, limiteAlcancado };
};