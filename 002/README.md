# 002

## Sumário

- [Uma nova dimensão](#uma-nova-dimensão)
- [_Thinking with joins_](#thinking-with-joins)
  - [Enter, Update & Exit](#enter-update-e-exit)
- [Seleção e mutação](#seleção-e-mutação)
- [Manipulação de dados](#manipulação-de-dados)

## Uma nova dimensão

Uma das principais lições que quero passar para vocês é o quão importante é saber ditar as regras que convertem um dado até a sua representação num gráfico.

Um [_dataset_](https://en.wikipedia.org/wiki/Data_set) é só o começo da história que o seu gráfico vai mostrar. Dependendo da profundidade dos dados presentes no seu _dataset_ e da sua própria criatividade, são possíveis múltiplas expressões a partir desses dados, incluindo múltiplas possíveis dimensões.

Seja através de um plano 2D de elementos DOM ou através de representações 3D através de um Canvas, quero chamar a atenção pra outra dimensão que, se os dados permitirem, pode adicionar uma enorme profundidade pra informação.

Trata-se da dimensão **temporal**. Há dados que apresentam-se de forma estática, mas também é possível explorar dados de natureza dinâmica, sejam eles atualizados em tempo real ou através de interações de um usuário.

A biblioteca que escolhemos para esses exercícios facilita justamente a expressão de dados de natureza mutável através de seu modelo de _data joins_.

## _Thinking with joins_

Lidar com o sistema de _data joins_ é, mais do que qualquer coisa, entender um dos conceitos primários do D3: na realização de visualizações, **os [_data points_](https://en.wikipedia.org/wiki/Unit_of_observation#Data_point) são ligados a elementos visuais, e um necessariamente representa o outro**.

Uma abstração que sinto que é pode ajudar a entender melhor esse fluxo de desenvolvimento: o D3 adota o paradigma / estilo de **programação [declarativa](https://pt.wikipedia.org/wiki/Programação_declarativa)**. Ou seja, ao invés de dizer à biblioteca _como_ você quer que ela realize sua visualização, **você declara o resultado final que você quer**. Ao invés de mandar o D3 desenhar pontos no gráfico, você declara que quer pontos baseados nos seus _data points_.

### Enter, Update e Exit

Imaginem que temos uma seleção de elementos visuais existentes e uma matriz de dados que queremos vincular a esses elementos. Através do data join, o D3 faz a correspondência entre os elementos e os dados, permitindo que realizemos operações específicas para cada caso.

- **Enter**: usado quando precisamos criar novos elementos para representar os dados. Podemos, por exemplo, criar elementos SVG `circle` para cada número num array.

  ```js
  let data = [ 1, 2, 3, 4, 5 ],
      circle = d3.selectAll('circle');

  circle
    .data(data, d => d)
    .join(
      enter => enter.append("circle"),
      update => update,
      exit => exit
    );
  ```

  > Se você está se perguntando o porquê de estarmos selecionando elementos que sabemos por fato que não existem, pense assim: o D3 só pode saber que um dado está _entrando_ se ele puder concluir que ele ainda não faz parte da visualização atual. Como o D3 atribui os dados a elementos — como no nosso exemplo o `circle` — é necessário que se faça uma primeira seleção, visto que ela será necessariamente vazia e assim permitindo o D3 a determinar que todos os dados são inéditos.

- **Update**: usado quando temos dados que correspondem exatamente aos elementos visuais existentes. Aqui, queremos atualizar os atributos desses elementos com base nos dados, como posição, tamanho ou cor.

  ```js
  circle
    .data(data, d => d)
    .join(
      enter => enter,
      update => update.attr("r", d => d),
      exit => exit
    );
  ```

- **Exit**: usado quando temos mais elementos visuais do que dados correspondentes e queremos removê-los do DOM de forma adequada.

  ```js
  data = [ 1, 2, 3 ];

  circle
    .data(data, d => d)
    .join(
      enter => enter,
      update => update,
      exit => exit.remove()
    );
  ```

Esses três conceitos - "enter", "update" e "exit" - trabalham juntos para garantir que a nossa visualização de dados esteja sempre sincronizada com seus dados.

> Apesar do que esse capítulo talvez leve a acreditar, o _data join_ não funciona somente para dados mutáveis e também é usado para lidar com dados estáticos. Se trata de um uso simples de uma ferramenta muito mais complexa: é só usar o "enter" uma única vez.

Ao entender e aplicar esses conceitos, podemos criar visualizações de dados dinâmicas e interativas usando o D3. É importante ter em mente boas práticas, como definir _keys_ adequadas para garantir um _data join_ eficiente.
