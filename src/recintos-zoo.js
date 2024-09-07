class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macacos: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazelas: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leoes: 1 } },
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            const { bioma, tamanhoTotal, animais } = recinto;
            const animalInfo = this.animais[animal];

            if (!animalInfo.bioma.includes(bioma)) continue;

            const espacoOcupado = quantidade * animalInfo.tamanho;
            const espacoAtual = Object.values(animais).reduce((sum, count) => sum + count * animalInfo.tamanho, 0);

            if (espacoOcupado + espacoAtual <= tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamanhoTotal - (espacoOcupado + espacoAtual)} total: ${tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo };

