export default {
  billetes: {
    'billete-2': {id: 'billete-2', content: 'Billete de $2', value: 2},
    'billete-5': {id: 'billete-5', content: 'Billete de $5', value: 5},
    'billete-10': {id: 'billete-10', content: 'Billete de $10', value: 10},
    'billete-15': {id: 'billete-15', content: 'Billete de $15', value: 15},
    'billete-20': {id: 'billete-20', content: 'Billete de $20', value: 20},
    'billete-50': {id: 'billete-50', content: 'Billete de $50', value: 50},
    'billete-100': {id: 'billete-100', content: 'Billete de $100', value: 100},
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Billetera",
      billeteIds: ['billete-2', 'billete-5', 'billete-10', 'billete-15', 'billete-20', 'billete-50', 'billete-100']
    },
    "column-2": {
      id: "column-2",
      title: "Caja",
      billeteIds: []
    }
  },
  columnOrder: ["column-1", "column-2"]
};
