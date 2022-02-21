/*
  07

  - No index.html, comente a div com a classe "container" que contém a tabela;
  - Descomente: 
    - A <div> com a classe "container" abaixo da div que você acabou de 
      comentar;
    - A <link> que importa o style.css;
  - Construa uma aplicação de conversão de conversão de moedas. O HTML e CSS 
    são os que você está vendo no browser (após salvar os arquivos);
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 

      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc.

      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";

      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL;

      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor;

      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;

      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;

      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/

const select_One = document.querySelectorAll('[data-js="currency-one"]')
const select_Two = document.querySelectorAll('[data-js="currency-two"]')
const converted_values = document.querySelector('[data-js="converted-value"]')
const input_Currencies = document.querySelector('[data-js="currency-one-times"]')
const show_Unit_Conversion = document.querySelector('[data-js="conversion-precision"]')

let first_Select = ''
let second_Select = ''
let obj_Info = {}
let ref_Coin_Select01 = ''
let ref_Coin_Select02 = ''

const conversions_Values = async coin_Country => {
  const response = await get_Coin_Value(coin_Country)
  return response.conversion_rates
}

input_Currencies.addEventListener('input', () => {

  select_One.forEach(async (item) => {
    ref_Coin_Select01 = item.value
    obj_Info = await conversions_Values(item.value)
    first_Select = obj_Info[item.value]
    select_Two.forEach(async (item) => {
      ref_Coin_Select02 = item.value
      second_Select = obj_Info[item.value]
    })

    converted_values.textContent = (input_Currencies.value * (second_Select / first_Select)).toFixed(2)

    show_Unit_Conversion.textContent = `1 ${ref_Coin_Select01} = ${second_Select.toFixed(2)} ${ref_Coin_Select02}`
  })
})
