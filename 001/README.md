# 001

## Sumário

1. [Introdução](#introdução-ao-d3js)
2. [Seleção e mutação](#seleção-e-mutação)
3. [Manipulação de dados](#manipulação-de-dados)

## Introdução ao D3.js

Para realizarmos nossas experimentações, vamos usar a biblioteca [D3.js](https://d3js.org/), que facilita a manipulação do HTML e de seus adjacentes usando dados. Isso significa que podemos manipular o [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), elementos [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), estilos [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) e até gráficos em [Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas).

> O nome D3 é bem autoexplicativo, significa Data-Driven Documents

## Seleção e mutação

O D3 facilita o processo de selecionar elementos no DOM (através de funções como o `select`) e manipulá-los em diversas frentes, seja por seus estilo CSS:

```js
d3.select("h1").style("color", "blue");
```

Seus atributos:

```js
d3.select("h1").attr("hidden", true);
```

E até seu conteúdo:

```js
d3.select("h1").text('Introdução a D3');
```

## Manipulação de dados

O verdadeiro poder do D3 está em sua capacidade de permitir fácil manipulação e representação de dados através de suas funções.

Podemos, por exemplo, transformar um simples [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) num gráfico de mais fácil leitura. 

Através de sua lógica de _data joins_, o D3 também permite a atualização de dados já pré-existente. Devido a complexidade do assunto, usaremos as funções sem mergulhar muito a fundo em seus conceitos. Por isso, recomendo a leitura de [artigos](https://bost.ocks.org/mike/join/) feitos pelo autor do D3, [Mike Bostock](https://observablehq.com/@mbostock), para melhor compreensão de _joins_.

```js
const numbers = [ 80, 50, 55, 10, 130, 65 ];
d3.select("body")
  .selectAll("p")
  .data(numbers)
  .enter()
  .append("p")
  .text( function (datapoint) { return "I’m number " + datapoint + "!"; });
```
