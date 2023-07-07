# 003

## Sumário

- [Dados estruturados e tipos primitivos em JS](#dados-estruturados-e-tipos-primitivos-em-js)
- [Valores primitivos em JavaScript](#valores-primitivos-em-javascript)
  - [String](#string)
  - [Number](#number)
  - [Boolean](#boolean)
  - [Null](#null)
  - [Undefined](#undefined)
  - [BigInt](#bigint)
- [Objetos em JavaScript](#objetos-em-javascript)
- [Diferença entre tipos primitivos e objetos](#diferença-entre-tipos-primitivos-e-objetos)
- [Objetos wrapper para tipos primitivos](#objetos-wrapper-para-tipos-primitivos)
- [Objetos especiais](#objetos-especiais)
  - [Array](#array)
  - [Set](#set)
- [JSON (JavaScript Object Notation)](#json-javascript-object-notation)

---

## Dados estruturados e tipos primitivos em JS

Visualização de dados envolve a transformação de conjuntos de dados em representações gráficas significativas e compreensíveis. Para alcançar esse objetivo, é necessário não apenas conhecer as técnicas de visualização, mas também ser capaz de manipular e processar os dados de forma adequada. É aí que entram JavaScript e JSON.

Nesta aula, portanto, vamos explorar os fundamentos do JavaScript, começando com os valores primitivos e objetos, e depois nos aprofundando na utilização do JSON (JavaScript Object Notation) em diversos contextos.

---

## Valores primitivos em JavaScript

Em JavaScript, existem 7 tipos primitivos:

- String
- Number
- Boolean
- Null
- Undefined
- Symbol [(a partir do ECMAScript 6)](https://262.ecma-international.org/6.0/#sec-ecmascript-language-types-symbol-type)
- BigInt [(a partir do ECMAScript 11)](https://262.ecma-international.org/11.0/#sec-ecmascript-language-types-bigint-type)

### String

Em qualquer linguagem de programação, uma _string_ é uma sequência de caracteres usados para representar texto. Elas são utilizadas para exibir informações descritivas, como nomes, títulos, rótulos de categorias, entre outros. As strings são muito importantes na visualização de dados, pois permitem fornecer contexto e descrição aos elementos gráficos. Podemos usar strings para rotular e identificar séries de dados, categorias em um gráfico de barras, nomes de países em um mapa, entre outros.

```js
const first_name = 'Kyle';
const last_name = 'Kuo';
const full_name = first_name + ' ' + last_name; 
// 'Kyle' + ' ' + 'Kuo' = 'Kyle Kuo'
```

### Number

Em JavaScript, _number_ é um tipo de dado numérico no formato [IEEE 754](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). Os números são utilizados para representar valores numéricos, como quantidades, medidas ou índices. Por exemplo, podemos usar números para representar a quantidade de vendas de um produto, a idade de uma pessoa ou a posição de um ponto em um gráfico. Na visualização de dados, os números são frequentemente utilizados para definir escalas, coordenadas ou valores de eixos em um gráfico.

```js
const minimum_age_to_vote = 16;
if ( current_age < minimum_age_to_vote ) {
  alert( 'você ainda não pode votar!' )
}
```

> Em outras linguagens de programação diferentes tipos numéricos podem existir, por exemplo: Integers (Inteiros), Floats (Pontos Flutuantes), Doubles (Dobros), ou Bignums.

### Boolean

Um booleano, em ciência da computação, é um tipo de dado lógico que pode ter apenas um de dois valores possíveis: `true` e `false`. Eles são utilizados para representar estados lógicos, como verdadeiro ou falso, ativado ou desativado, etc. Os booleanos são fundamentais em expressões condicionais e lógicas.

```js
const user_is_logged_in = false;
if ( user_is_logged_in == false ) {
  alert( 'você não está logado!' )
}
```

### Null

Em ciência da computação, um valor nulo representa uma referencia que aponta, geralmente de maneira intencional, para um objeto ou endereço de memória inválido ou inexistente. O significado do valor nulo varia entre as implementações das linguagens.

Suponha que você esteja desenvolvendo um painel de visualização de dados que exibe informações sobre produtos. Cada produto possui propriedades como nome, preço e quantidade em estoque. No entanto, pode haver casos em que algumas informações não estejam disponíveis ou sejam desconhecidas para determinados produtos. Nesse caso, você pode utilizar o valor `null` para representar a ausência de um valor específico.

```js
const produto = {
  nome: "Camiseta",
  preco: null,
  estoque: 10
};
if (produto.preco === null) {
  console.log("Preço indisponível");
} else {
  console.log("Preço: R$ " + produto.preco);
}
```

> Apesar de ser considerado um valor primitivo, quando avaliado pelo operador `typeof`, um valor `null` retorna `object`. Isso é considerado um bug, mas sua solução foi [rejeitada](https://web.archive.org/web/20160331031419/http://wiki.ecmascript.org:80/doku.php?id=harmony:typeof_null) pois quebraria muitos scripts que inadvertidamente tomavam proveito dessa lógica.

### Undefined

O _undefined_ é um valor automaticamente atribuído para variaveis que foram recentemente declaradas ou para [parâmetros de função](https://developer.mozilla.org/en-US/docs/Glossary/Parameter) para qual não existem [argumentos](https://developer.mozilla.org/en-US/docs/Glossary/Argument) atualmente.

É importante ter em mente que indefinido (`undefined`) é diferente de nulo (`null`). O `null` é utilizado para representar intencionalmente a ausência de um valor, enquanto `undefined` indica que uma variável ou propriedade não foi atribuída ou definida.

```js
let x; // Cria a variável mas não atribui nenhum valor a ela 
console.log(`o valor de x é ${x}`); // imprime "o valor de x é undefined"
```

### Symbol

O Symbol em JavaScript é um tipo de dado primitivo que representa um identificador único e imutável, o que significa que dois símbolos nunca serão iguais, mesmo que possuam a mesma descrição. Symbol é frequentemente utilizado como uma propriedade de objetos, pois sua finalidade principal é criar identificadores únicos.

```js
const cor_r = Symbol("vermelho");
const cor_g = Symbol("verde");
const cor_b = Symbol("azul");

function exibir_cor ( cor ) {
  if ( cor === cor_r) {
    console.log('Cor: vermelho');
  } else if ( cor === cor_g) {
    console.log('Cor: verde');
  } else if ( cor === cor_b) {
    console.log('Cor: azul');
  } else {
    console.log('Cor desconhecida');
  }
}

exibir_cor( cor_r );            // Cor: vermelho
exibir_cor( cor_g );            // Cor: verde
exibir_cor( Symbol("azul") );   // Cor desconhecida
```

> O argumento passado para a função Symbol() é opcional e serve para fornecer uma descrição para o símbolo criado. A descrição é uma string que pode ajudar na identificação e no entendimento do propósito do símbolo, mas não afeta a unicidade do símbolo em si.
>
> ```js
> const s = Symbol('descrição do meu símbolo');
> console.log( s ); // Imprime: Symbol(descrição do meu símbolo)
> ```

### BigInt

No JavaScript, _BigInt_ é um tipo de dado numérico que representa inteiros no formato de [precisão arbritrária](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic). Assim, você pode armazenar e operar com segurança em grandes números inteiros, mesmo além do limite de números inteiros seguros.

Um BigInt é criado anexando `n` ao final de um inteiro ou chamando o construtor `BigInt()`.

```js
function calcular_fatorial ( num ) {
  if ( num < 0 ) return 'Erro: não é possível calcular a fatorial de um número negativo.';

  let resultado = 1n;
  for (let i = 1n; i <= num; i++) {
    resultado *= i;
  }

  return resultado;
}

const numero = 100n;
const fatorial = calcular_fatorial(numero);
console.log(`A fatorial de ${numero} é: ${fatorial}`);
// A fatorial de 100 é: 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000
```

O uso do _BigInt_ nesse exemplo permite calcular a fatorial de números inteiros grandes sem perder a precisão. Caso utilizássemos o tipo _Number_, a fatorial de números maiores resultaria em um valor aproximado ou mesmo em _Infinity_.

> Você pode usar os operadores `+`, `*`, `-`, `**` e `%` com _BigInt_ — assim como com _Number_. Um _BigInt_ não é estritamente igual a um _Number_, mas é vagamente assim. No entanto, _BigInt_ não podem ser operados de forma intercambiável com _Number_ e qualquer tentativa gerará um erro.

---

## Objetos em JavaScript

Objetos são estruturas de dados complexas que podem armazenar valores primitivos e outros objetos. Eles podem ser vistos como coleções de propriedades, onde cada propriedade é um par chave-valor. Podemos criar objetos em JavaScript usando a sintaxe de objeto literal, que envolve as propriedades entre chaves `{}`.

```js
const pessoa = {
  nome: "Kyle",
  idade: 23,
  cidade: "Rio de Janeiro"
};
```

Podemos acessar as propriedades de um objeto usando a notação de ponto `.` ou a notação de colchetes `[]`.

```js
console.log(pessoa.nome); // Imprime: "Kyle"
console.log(pessoa["idade"]); // Imprime: 24
```

Também é possível adicionar novas propriedades a um objeto ou modificar propriedades existentes. Por exemplo:

```js
pessoa.profissao = "Engenheiro";
pessoa.idade = 24;
console.log(pessoa.profissao); // Imprime: "Engenheiro"
console.log(pessoa.idade); // Imprime: 24
```

Além das propriedades, os objetos também podem ter métodos, que são funções associadas a um objeto. Os métodos podem ser chamados usando a notação de ponto.

```js
pessoa.apresentar = function () {
  console.log("Olá, meu nome é " + this.nome + " e tenho " + this.idade + " anos.");
};
pessoa.apresentar(); // Imprime: "Olá, meu nome é Kyle e tenho 24 anos."
```

---

## Diferença entre tipos primitivos e objetos

- **Armazenamento**: Os tipos primitivos são armazenados diretamente em uma variável, enquanto os objetos são armazenados como referências a um local na memória.

- **Mutabilidade**: Os tipos primitivos são imutáveis, o que significa que não podem ser alterados após serem criados. Já os objetos são mutáveis, ou seja, é possível alterar suas propriedades e valores internos. É importante não confundir um primitivo com uma variável atribuída a um primitivo. A variável pode ser reatribuída a um novo valor, mas o valor existente não pode ser alterado da mesma forma que os objetos podem ser alterados.

  ```js
  // --- Primitivos --- //

  let a = 5;
  let b = a;

  a = 10;

  console.log(a); // Imprime: 10
  console.log(b); // Imprime: 5

  // --- Objetos --- //

  let c = { valor: 5 };
  let d = c;

  c.valor = 10;

  console.log(c); // Imprime: 10
  console.log(d); // Imprime: 10
  ```

- **Métodos e propriedades**: Os tipos primitivos não possuem métodos ou propriedades associadas diretamente a eles. Por outro lado, os objetos possuem métodos e propriedades específicos da classe ou construtor a partir do qual foram criados.

  > É possível usar métodos em tipos primitivos, vamos explorar isso no próximo tópico

- **Comparação**: Ao comparar dois tipos primitivos com o mesmo valor, eles são considerados iguais se seus valores são idênticos. No caso de objetos, a comparação é feita por referência, ou seja, eles são considerados iguais apenas se referem ao mesmo local na memória.

  ```js
  // --- Primitivos --- //

  const str1 = 'Hello';
  const str2 = 'Hello';
  console.log(str1 === str2); // Imprime: true

  // --- Objetos --- //

  const str3 = new String('Hello');
  const str4 = new String('Hello');
  console.log(str3 === str4); // Imprime: false
  ```

---

## Objetos wrapper para tipos primitivos

Objetos wrapper são objetos especiais associados a alguns tipos primitivos que fornecem funcionalidades adicionais e métodos que podem ser úteis em certos cenários.

```js
const nome = "Kyle";
console.log(typeof nome); // Imprime: string

const nomeObjeto = new String("Kyle");
console.log(typeof nomeObjeto); // Imprime: object
```

Os objetos wrapper possuem métodos e propriedades adicionais que permitem a manipulação dos valores primitivos de maneiras mais complexas. Por exemplo, você pode usar o objeto wrapper _Number_ para formatar números.

```js
const numeroObjeto = new Number( 42 );
console.log( numeroObjeto.toFixed( 2 ) ); // Imprime: 42.00
```

Quando você chama um método em uma variável que contém um valor primitivo, o JavaScript automatica e temporariamente converte o valor primitivo em um objeto wrapper para permitir a chamada do método. Assim que a operação é concluída, o valor volta ao seu estado original primitivo. Essa capacidade de acessar métodos diretamente em valores primitivos é chamada de "autoboxing". É uma funcionalidade conveniente que torna o código mais legível e conciso.

```js
const nome = "Kyle";
const nome_gritado = nome.toUpperCase();
console.log( nome_gritado ); // Imprime: "KYLE";

const preco = 20;
const preco_completo = preco.toFixed(2);
console.log( preco_completo ); // Imprime: "20.00";

const booleana = true;
const booleana_em_string = booleana.toString();
console.log( booleana_em_string ); // Imprime: "true";
```

---

## Objetos especiais

Em JavaScript, existem objetos especiais que possuem funcionalidades específicas e são amplamente utilizados no desenvolvimento de aplicações. [A lista de objetos especiais](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects) é bem grande, e portanto darei alguns poucos exemplos. Recomendo que vocês leiam mais sobre isso posteriormente.

### Array

O objeto Array é uma estrutura de dados que permite armazenar e manipular uma coleção de elementos de forma ordenada. Ele oferece métodos poderosos para adicionar, remover e modificar elementos, além de fornecer recursos como ordenação, filtragem e iteração dos elementos presentes no array. Os arrays são especialmente úteis quando se trata de trabalhar com conjuntos de dados e realizar operações em massa, como cálculos matemáticos ou filtragem de informações.

```js
const numeros = [1, 2, 3, 4, 5];
console.log(numeros.length); // Imprime: 5

numeros.push(6);
console.log(numeros); // Imprime: [1, 2, 3, 4, 5, 6]

const dobrados = numeros.map(num => num * 2);
console.log(dobrados); // Imprime: [2, 4, 6, 8, 10, 12]
```

### Set

O objeto Set é uma coleção de elementos únicos, o que significa que não permite a inclusão de elementos duplicados. Ele fornece métodos para adicionar, remover e verificar a presença de elementos. O Set é útil quando você precisa manter uma lista de itens exclusivos, realizar operações de união, interseção ou diferença entre conjuntos e remover duplicatas de um array.

```js
const cores = new Set();
cores.add('vermelho');
cores.add('verde');
cores.add('azul');
cores.add('vermelho'); // Não adicionará, pois já existe

console.log(cores.size); // Imprime: 3

cores.delete('verde');
console.log(cores.size); // Imprime: 2
```

---

## JSON (JavaScript Object Notation)

O JSON é um formato de dados leve e legível por humanos amplamente utilizado para troca de informações entre sistemas, e é baseado na sintaxe de objetos em JavaScript. Usando uma combinação de objetos e arrays, dados em JSON podem ser aninhados para representar estruturas mais complexas.

Um objeto é uma coleção de pares chave-valor, onde cada chave é uma string única e cada valor pode ser de qualquer tipo de dados válido em JSON.

Um array é uma lista ordenada de valores, também podendo conter qualquer tipo de dados JSON.

```json
[
  {
    "nome": "Kyle",
    "idade": 24,
    "cidade": "Rio de Janeiro",
    "habilidades": [ 
      "Engenharia de Software", 
      "Design" 
    ]
  },
  {
    "nome": "Catarina",
    "idade": 28,
    "cidade": "Rio de Janeiro",
    "habilidades": [ 
      "Marketing", 
      "Direito" 
    ]
  }
]
```

Quando se trata de visualização de dados, o JSON é uma excelente opção para estruturar os dados de forma organizada e eficiente. Ele permite representar os dados de maneira hierárquica, facilitando a manipulação e a interpretação dos mesmos em bibliotecas e ferramentas de visualização.

Vamos imaginar um cenário em que você está criando uma visualização de dados para mostrar o crescimento populacional de diferentes países ao longo dos anos. Nesse caso, você pode utilizar o JSON para estruturar os dados da seguinte maneira:

```json
[
  {
    "name": "Brasil",
    "population": [
      {"year": 2010, "count": 196655014},
      {"year": 2011, "count": 199287296},
      {"year": 2012, "count": 201991000},
      {"year": 2013, "count": 204809000},
      {"year": 2014, "count": 207707000},
      {"year": 2015, "count": 210677000}
    ]
  },
  {
    "name": "Estados Unidos",
    "population": [
      {"year": 2010, "count": 309349689},
      {"year": 2011, "count": 311592078},
      {"year": 2012, "count": 313873685},
      {"year": 2013, "count": 316110030},
      {"year": 2014, "count": 318301008},
      {"year": 2015, "count": 320635163}
    ]
  },
  {
    "name": "China",
    "population": [
      {"year": 2010, "count": 1337705000},
      {"year": 2011, "count": 1344130000},
      {"year": 2012, "count": 1350695000},
      {"year": 2013, "count": 1357380000},
      {"year": 2014, "count": 1364270000},
      {"year": 2015, "count": 1371220000}
    ]
  }
]
```

Ao utilizar bibliotecas de visualização de dados, como o D3.js, você pode facilmente percorrer os dados em JSON e extrair as informações necessárias para gerar representações visuais.

Em JavaScript, podemos converter um objeto JavaScript em uma string JSON usando o método `JSON.stringify()`, e também podemos converter uma string JSON em um objeto JavaScript usando o método `JSON.parse()`. Esses métodos facilitam a manipulação de dados JSON em nossas aplicações.

```js
const paises = JSON.parse(paisesJSON);
for (const pais of paises) {
  console.log(pais.name);
  console.log(pais.population[0].count);
}

// Imprime:
// 
// Brasil
// 196655014
// Estados Unidos
// 309349689
// China
// 1337705000
```

---

Acredito que com esses conhecimentos, vocês estão melhor preparados para lidar com dados estruturados usando JavaScript.
