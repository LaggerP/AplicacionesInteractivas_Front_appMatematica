import billete2 from '../../Images/GamesImages/Billetes/billete2.jpg'
import billete5 from '../../Images/GamesImages/Billetes/billete5.jpg'
import billete10 from '../../Images/GamesImages/Billetes/billete10.jpg'
import billete15 from '../../Images/GamesImages/Billetes/billete15.jpg'
import billete20 from '../../Images/GamesImages/Billetes/billete20.jpg'
import billete50 from '../../Images/GamesImages/Billetes/billete50.jpg'
import billete100 from '../../Images/GamesImages/Billetes/billete100.jpg'




export default {
  billetes: {
    'billete-2': {id: 'billete-2', content: 'Billete de $2', value: 2, img: billete2},
    'billete-5': {id: 'billete-5', content: 'Billete de $5', value: 5, img: billete5},
    'billete-10': {id: 'billete-10', content: 'Billete de $10', value: 10, img: billete10},
    'billete-15': {id: 'billete-15', content: 'Billete de $15', value: 15, img: billete15},
    'billete-20': {id: 'billete-20', content: 'Billete de $20', value: 20, img: billete20},
    'billete-50': {id: 'billete-50', content: 'Billete de $50', value: 50, img: billete50},
    'billete-100': {id: 'billete-100', content: 'Billete de $100', value: 100, img: billete100},
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
