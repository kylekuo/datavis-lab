# Renderizando gráficos

Nesta aula, vamos explorar as várias técnicas para criar se gráficos interativos e visualizações de dados utilizando D3. Compreender as particularidades e benefícios de cada abordagem permitirá que você crie visualizações personalizadas e eficientes para suas aplicações de visualização de dados.

## HTML

O uso de HTML para criar gráficos no D3 é a forma mais simples de se começar a realizar sua ideia. Utilizamos as funções de seleção do D3 para selecionar os elementos HTML e manipulá-los.

```js
const div = wrap
  .append('div')
  .classed('donut', true);

let nodes = div.selectAll('.node');

nodes = nodes
  .data(data, d => d.id)
  .join(

    enter => enter
      .append('div')
      .classed('node', true)
      .attr('join', 'enter'),

    update => update
      .attr('join', 'update'),

    exit => exit
      .attr('join', 'exit')
      .remove()

  );
```

Prós:

- **Semântica e acessibilidade**: você pode aproveitar a estrutura semântica do HTML para tornar os gráficos mais acessíveis a todos os usuários, incluindo aqueles que utilizam leitores de tela. É possível adicionar rótulos descritivos e usar elementos HTML apropriados para melhorar a interpretação dos dados pelos usuários com deficiência visual
- **Uso do CSS**: possibilita a estilização completa dos elementos gráficos, permitindo criar visualizações personalizadas através da especificação completa do CSS
- **Interatividade**: através da combinação de CSS e JavaScript, é possível facilmente adicionar interatividade ao gráfico.

Contras:

- **Limitações do HTML/CSS**: Ao contrário de SVG ou Canvas, o padrão HTML/CSS não foi estritamente projetado para esse tipo de uso, e portato limita a nossa possibilidade de realizar ideias mais complexas.
- **Desempenho em visualizações complexas**: para visualizações de dados muito complexas com grande quantidade de elementos, a manipulação do DOM pode se tornar menos eficiente em comparação com outras abordagens.
- **Limitações na animação**: gráficos animados podem ser menos fluidos com HTML/CSS, especialmente com grandes conjuntos de dados. A manipulação de elementos do DOM durante animações pode resultar em perda de desempenho.

> Desempenho de animações em HTML/CSS podem ser menos fluidas em comparação com animações em SVG devido à manipulação direta do DOM e à recorrência de [reflows e repaints](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg). Ao utilizar animações em SVG, você se beneficia de uma manipulação mais eficiente dos elementos gráficos e do fato de que muitos navegadores modernos otimizam a renderização de SVG.

## SVG

```js
const svg = wrap
  .append('svg')
  .classed('donut', true)	
  .attr('width', size)
  .attr('height', size)
  .attr('viewbox', `0 0 ${size} ${size}`);

let nodes = svg.selectAll('.node');

nodes = nodes
  .data(data, d => d.data.id)
  .join(

    enter => enter
      .append('path')
      .classed('node', true)
      .attr('join', 'enter'),

    update => update
      .attr('join', 'update'),

    exit => exit
      .attr('join', 'exit')
      .remove()

  );
```

Prós:

- **Escalabilidade**: SVG é feito para desenho vetorial, o que significa que os gráficos são escaláveis sem perda de qualidade. Isso é especialmente útil em aplicações responsivas, pois os gráficos podem se adaptar a diferentes tamanhos de tela sem distorção.
- **Manipulação dos elementos**: SVG possui uma estrutura hierárquica similar a HTML, facilitando a manipulação de grupos de elementos. Como vimos na aula de _data joins_, através de seletores D3 é possível associar dados a elementos SVG, permitindo a criação de gráficos reativos que respondem a mudanças nos dados.
- **Suporte a animações**: D3.js oferece suporte a animações em SVG, permitindo criar transições suaves entre estados de visualizações e adicionar movimento e interatividade aos elementos gráficos.
- **Não afeta o HTML**: como os atributos SVG são alterados sem afetar o layout do DOM da página, a renderização das animações tende a ser mais eficiente e fluida e portanto não causa diminuição de performance no resto da página.
- **Otimização de hardware**: muitos navegadores modernos otimizam a renderização de SVG usando aceleração de hardware, o que melhora ainda mais a performance das animações em SVG.

Contras:

- **Performance em visualizações complexas**: em visualizações com grande quantidade de elementos, a performance de animações em SVG pode ser prejudicada. Manipular muitos elementos SVG pode levar a sobrecarga na renderização e impactar a fluidez das animações.
- **Compatibilidade**: SVG é amplamente suportado pelos navegadores modernos, mas diferentes [_engines_](https://en.wikipedia.org/wiki/Comparison_of_browser_engines) podem ter leves diferenças na forma como lidam com partes da especificação SVG. Os problemas são maiores ainda se considerarmos suporte em versão antigas de browsers, como Internet Explorer.
- **Estiização**: SVG oferece suporte a gradientes, padrões e máscaras, o que permite criar visualizações mais ricas e estilizadas; dito isso, as propriedades que ditam isso são diferentes das usadas em HTML e nem sempre são acessíveis através do uso de CSS. Por isso, estilizar SVG consegue ser, dependendo do caso, mais complexo.

## Canvas

```js
const canvas = wrap
  .append('canvas')
  .classed('donut', true)
  .attr('width', size)
  .attr('height', size);

const ctx = canvas.node().getContext('2d');

for (const point of data) {

  ctx.beginPath();

  ctx.moveTo( center, center );

  ctx.arc(
    center, // posição X
    center, // posição Y
    size / 2, // Raio do arco
    point.startAngle, // ângulo de começo
    point.endAngle, // ângulo de fim
    false // se é anti-horário
  );

  ctx.lineTo( center, center );

  ctx.fillStyle = point.color;

  ctx.fill();

}
```

Prós:

- **Técnicas de renderização**: em visualizações que requerem desenhos personalizados, o Canvas oferece recursos mais avançados para manipulação direta de pixels, permitindo criar efeitos visuais mais detalhados
- **Alto desempenho**: Canvas é mais adequado para renderizar gráficos com grande quantidade de elementos, pois a manipulação direta dos pixels torna a renderização mais eficiente
- **Renderização em tempo real**: aplicações que exigem atualizações rápidas e contínuas de dados em tempo real, como dados em streaming, o Canvas pode ser a escolha mais eficiente
- **Animações complexas**: dado o controle granular no Canvas, é possível realizar animações mais complexas ou com necessidade de alta performance
- **3D**: é possível renderizar cenas tridimensionais usando Canvas, utilizando também aceleração de hardware, fazendo com que gráficos complexos ainda possam ser fluidos.

Contras:

- **Complexidade**: trabalhar com canvas para renderizar gráficos pode ser mais complexo em comparação com as outras formas de renderização, que oferecem uma estrutura mais familiar e escalável. Além disso, a animação e interatividade em canvas podem exigir um maior entendimento dos conceitos de desenho e uma abordagem mais cuidadosa em relação à performance, tornando o aprendizado e a implementação mais complexos.
- **Pouco suporte pelo D3**: enquanto o D3.js proporciona uma camada de abstração que simplifica a manipulação dos elementos HTML e SVG, permitindo que os desenvolvedores se concentrem nos dados e na lógica da visualização, com o canvas ele não oferece essa mesma facilidade.
- **Limitações em gráficos vetoriais**: diferente do SVG, o Canvas não oferece suporte nativo a elementos vetoriais, o que pode dificultar a criação de gráficos escaláveis sem perda de qualidade. Isso pode tornar o Canvas menos adequado para gráficos que precisam ser redimensionados em diferentes tamanhos de tela
- **Falta de acessibilidade**: por ser uma área de desenho bitmap, seus elementos gráficos não são acessíveis a leitores de tela e não são facilmente indexáveis por mecanismos de busca


## Comparando as Abordagens

A escolha entre HTML/CSS, SVG e Canvas para renderizar gráficos usando D3.js depende das necessidades específicas da sua visualização de dados. 

**HTML/CSS é ideal para gráficos mais simples**, com foco em acessibilidade e flexibilidade de estilização. **SVG é a escolha quando a criação de gráficos vetoriais escaláveis e interativos é primordial.** Por outro lado, o **Canvas é mais adequado para visualizações de dados complexas**, com desempenho aprimorado em animações e detalhes visuais.

## Exercício

O código a seguir monta os dados necessários para um _scatterplot_:

```js
function scatterData (amount = 10) {
  
  const data = [],
        bounds = { 
          type: [ 'A', 'B', 'C' ], 
          x: 1000, 
          y: 1000, 
          z: 1000, 
          value: 50 
        };
  
  for (let i = 0; i < amount; i++) {

    const type = bounds.type[ Math.floor( Math.random() * bounds.type.length ) ],
          x = Math.floor( Math.random() * bounds.x ),
          y = Math.floor( Math.random() * bounds.y ),
          z = Math.floor( Math.random() * bounds.z ),
          value = Math.floor( Math.random() * bounds.value );

    data.push({ type, x, y, z, value });

  }

  return data;

}

console.log( scatterData( 100 ) ); // Array(100) [ {…}, {…}, {…}, … ]
```

Os dados retornados estão no formato de um array contendo vários objetos com as seguintes propriedades:

- `type`: uma _string_ que pode contem um de três valores "A", "B" ou "C"
- `x`: um _number_ que pode conter um número entre 0 e 1000
- `y` um _number_ que pode conter um número entre 0 e 1000
- `z` um _number_ que pode conter um número entre 0 e 1000
- `value`: um _number_ que pode conter um número entre 0 e 50

**Vocês devem pegar esses dados e renderizar um _scatterplot_ em cada uma das formas que falamos sobre hoje**. Alguns detalhes:

- Cada valor de `type` deve ser representado visualmente no gráfico. Por exemplo: "A" é vermelho, "B" é verde e "C" é azul.
- O valor de `value` deve ser representado visualmente no gráfico. Por exemplo, um valor de 0 é representado por um círculo de 10px de diâmetro enquanto que um de valor 50 tem diâmetro de 100px.
- Foram dados 3 valores de posicionamento (`x`, `y` e `z`), mas só são necessários o uso de 2. No entanto, deixei o terceiro caso alguém queira se aventurar em 3D.

## Referências e recursos adicionais

- [Como o browser renderiza o documento (em inglês)](https://gist.github.com/faressoft/36cdd64faae21ed22948b458e6bf04d5)
- [Visualizando _reflow_](https://www.youtube.com/watch?v=dndeRnzkJDU)
- [Referência de elementos SVG](https://developer.mozilla.org/pt-BR/docs/Web/SVG/Element)
- [Referência da API Canvas](https://developer.mozilla.org/pt-BR/docs/Web/SVG/Element)