const structureData = {
  coins: {
    'coin-2': {id: 'coin-2', content: 'soy una moneda de 2', value: 2},
    'coin-5': {id: 'coin-5', content: 'soy una moneda de 5', value: 5},
    'coin-10': {id: 'coin-10', content: 'soy una moneda de 10', value: 10},
    'coin-50': {id: 'coin-50', content: 'soy una moneda de 50', value: 50},
    'coin-100': {id: 'coin-100', content: 'soy una moneda de 100', value: 100},
    'coin-200': {id: 'coin-200', content: 'soy una moneda de 200', value: 200},
    'coin-500': {id: 'coin-500', content: 'soy una moneda de 500', value: 500},
    'coin-1000': {id: 'coin-1000', content: 'soy una moneda de 1000', value: 1000}
  },
  columns: {
    'monedero': {
      id: 'monedero',
      title: 'Tu monedero',
      coinsIds: ['coin-2', 'coin-5', 'coin-10', 'coin-50', 'coin-100', 'coin-200', 'coin-500', 'coin-1000']
    },
    'cajaRegistradora': {
      id: 'caja',
      title: 'La caja',
      coinsIds: []
    }
  },
  columnOrder: ['monedero', 'cajaRegistradora']
}


export default structureData