# 004

## Sumário

- [Anatomia de uma função](#anatomia-de-uma-função)
  - [O que são](#o-que-são)
  - [Argumentos](#argumentos)
  - [Bloco de código](#bloco-de-código)
  - [Escopo local](#escopo-local)
  - [Retorno](#retorno)
- [Definindo uma função](#definindo-uma-função)
  - [Usando a keyword `function`](#usando-a-keyword-function)
  - [Atribuindo uma função a uma variável](#atribuindo-uma-função-a-uma-variável)
  - [Funções como métodos](#funções-como-métodos)
  - [_Arrow functions_](#arrow-functions)
- [Usando função](#usando-funções)

---

## Anatomia de uma função

### O que são

Funções são blocos de código reutilizáveis que nos permitem organizar e executar tarefas específicas. Elas são essenciais para a modularização do código e nos ajudam a escrever programas mais eficientes e estruturados.

### Argumentos

Argumentos são valores que a função espera receber. Os parâmetros são opcionais e permitem que a função trabalhe com dados externos. Podemos ter zero, um ou vários parâmetros separados por vírgulas.

> Seguindo o exemplo:
> ```js
> function add ( numberOne, numberTwo ) {
>   return numberOne + numberTwo;
> }
> ```
> `numberOne` e `numberTwo` são os argumentos da função

Parâmetros primitivos são passados para as funções por valor; o valor é passado para a função, mas se a função altera o valor do parâmetro, esta mudança não reflete globalmente ou na função chamada. Se você passar um objeto como um parâmetro e a função alterar as propriedades do objeto, essa mudança é visível fora da função.

```js
// --- Primitivo --- //

function changeName (primitive) {
  primitive = "Kyle";
}

let person = "John";

console.log(person); // Imprime: "John"
changeName(person);
console.log(person); // Imprime: "John"

// --- Objeto --- //

function changeName (object) {
  object.name = "Kyle";
}

let person = {
  name: "John",
  year: 1998
};


console.log(person.name); // Imprime: "John"
changeName(person);
console.log(person.name); // Imprime: "Kyle"
```


### Bloco de código

Ele é delimitado por chaves `{}` e contém as instruções que serão executadas quando a função for chamada. Aqui, você pode escrever qualquer código válido em JavaScript.

### Escopo local

Uma função em JavaScript cria um escopo local, também conhecido como escopo da função. Isso significa que as variáveis declaradas dentro da função são acessíveis apenas dentro do bloco de código da função. Essas variáveis são chamadas de variáveis locais, pois têm um escopo restrito.

```js
function addNumberToFive ( number ) {
  const five = 5;
  return number + five;
}

console.log( five ); // ERRO: 'five' não está definido
```

### Retorno

Uma função pode ter um valor de retorno, que é especificado usando a declaração `return`. O retorno permite que a função forneça um resultado que pode ser usado posteriormente em outras partes do programa.

```js
function addNumberToFive ( number ) {
  const five = 5;
  return number + five;
}

let three = 3;
let eight = addNumberToFive( three );
console.log( eight ); // Imprime: 8
```

Além de fornecer um valor de retorno, o `return` é utilizado para encerrar a execução da função. Quando uma função alcança a declaração `return`, não serão executadas quaisquer instruções subsequentes dentro do seu bloco de código. Isso é útil quando queremos controlar o fluxo da função e evitar a execução desnecessária de código.

```js
function checkForNumber (number) {
  if (number < 10) {
    return "Number lesser than 10";
  }
  return "Number equal to or bigger than 10";
}
```

---

## Definindo uma função

A definição de uma função não a executa. Definir a função é simplesmente nomear a função e especificar o que fazer quando a função é chamada. Existem diversas formas de se declarar uma função em JavaScript.

### Usando a keyword `function`

A forma mais comum de declarar uma função é usando a keyword `function`:

```js
function add ( numberOne, numberTwo ) {
  return numberOne + numberTwo;
}
```

> Essa forma permite que você defina a função em qualquer lugar do seu código, mesmo antes de chamá-la. Isso ocorre porque as funções declaradas dessa maneira são içadas (hoisted), o que significa que elas são movidas para o topo do escopo em que foram definidas durante a fase de interpretação. Por exemplo, o código a seguir é válido:
> ```js
> const five = add( 2, 3 );
> 
> function add ( numberOne, numberTwo ) {
>   return numberOne + numberTwo;
> }
> ```

### Atribuindo uma função a uma variável

Outra maneira de declarar funções é atribuindo-as a variáveis usando `var`, `const` ou `let`. Essa abordagem é conhecida como "função anônima" ou "expressão de função ". A sintaxe é a seguinte:

```js
const add = function ( numberOne, numberTwo ) {
  return numberOne + numberTwo;
}
```

As expressões de função são convenientes ao passar uma função como um argumento para outra função.

```js
const square = function ( number ) {
  return number * number;
}

const runFunctionOnArgument = function ( fn, arg ) {
  return fn( arg );
}

console.log( runFunctionOnArgument( square, 2 ) ); // Imprime: 4
```

> É importante destacar que as funções declaradas dessa forma não são içadas e só podem ser chamadas após a atribuição. Por exemplo, o código a seguir não vai funcionar:
>
> ```js
> const five = add( 2, 3 );
> // Erro: não é possível acessar declaração 'add' antes de sua inicialização
> const add = ( numberOne, numberTwo ) => {
>   return numberOne + numberTwo;
> }
> ```

### Funções como métodos

Como vimos na aula passada, quando uma função é declarada como parte de um objeto, ela é chamada de método. Dessa forma, o método está diretamente associado ao objeto e pode ser acessado através da notação de ponto `objeto.metodo()`.

```js
const person = {
  name: "Kyle",
  age: 24,
  birthday: function () {
    this.age = this.age + 1; 
  }
}

console.log(person.age); // Imprime: 24
person.birthday();
console.log(person.age); // Imprime: 25
```

### _Arrow functions_

As _arrow functions_ são uma forma mais recente e concisa de declarar funções em JavaScript. Elas possuem uma sintaxe reduzida, são sempre anônimas e oferecem um comportamento específico em relação ao escopo do this.

_Arrow functions_ contém vários facilitadores léxicos para estilos mais contemporâneos de programação. Não escrevemos `function` para declarar a função, e também não é necessário escrever `return` para retornar o valor da função. Em seguida, vou escrever a mesma função de várias formas, das mais longas até as mais concisas.

```js
// --- uma típica função --- //

const add = function (numberOne, numberTwo) {
  return numberOne + numberTwo;
}

// --- seus equivalentes em funções de seta --- //

const add = (numberOne, numberTwo) => {
  return numberOne + numberTwo;
}

const add = (numberOne, numberTwo) => {
  return numberOne + numberTwo;
}

const add = (numberOne, numberTwo) => numberOne + numberTwo;
```

Até as funções de seta, cada nova função definia seu próprio valor `this` (um novo objeto no caso de um construtor, `window` em chamadas de função em escopo global, o objeto de contexto se a função é chamada como um método, etc.).

```js
let person = {
  name: "Kyle",
  sayHi: function () {
    console.log( this );
    console.log("Hi, my name is " + this.name + ".");
  }
};

person.sayHi(); 
// Imprime: Object { name: "Kyle", sayHi: sayHi() }
// Imprime: 'Hi, my name is Kyle.'
```

Em funções de setas, o valor do "this" é determinado pelo contexto léxico em que a função é definida. Ele não possui um valor próprio e herda o valor do "this" do escopo que o envolve.

```js
let person = {
  name: "Kyle",
  sayHi: () => {
    console.log( this );
    console.log("Hi, my name is " + this.name + ".");
  }
};

person.sayHi(); 
// Imprime: window
// Imprime: 'Hi, my name is undefined.'
```

---

## Usando funções

Chamar a função executa realmente as ações especificadas com os parâmetros indicados. Por exemplo, se você definir a função `add`, você pode chamá-la escrevendo seu nome e declarando seus argumentos entre parênteses.

```js
const add = (numberOne, numberTwo) => numberOne + numberTwo;
add( 2, 3 ); // Retorna: 5;
```

> Lembrando que mesmo se uma função não tiver argumentos, deve ser declarada uma lista de argumentos; Nesse caso, vazia.  

Como já vimos anteriormente, funções que são atribuídas a objetos (métodos) devem ser chamadas usando a notação de ponto:

```js
let person = {
  name: "Kyle",
  sayHi: () => {
    console.log("Hi, my name is " + this.name + ".");
  }
};

person.sayHi(); 
```

> Em JavaScript, todas as funções na verdade são objetos especiais do tipo `Function`. Isso significa que elas tem acesso a métodos especiais, como `apply`, `call`. Esses métodos também permitem que você chame a função, mas como esses métodos se relacionam com a keyword `this`, que pode ser uma aula por si só, não vou entrar muito em detalhes.

---

Referências:
- [MDN Javascript Reference: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [MDN Javascript Reference: Function Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- [ES6 In Depth: Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)
