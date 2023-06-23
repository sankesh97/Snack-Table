import './App.css';
import { useState } from 'react';

const snacks = [
  {
    id: 1,
    product_name: 'Granola Bar',
    product_weight: 21,
    price: 299,
    calories: 150,
    ingredients: ['Oats', 'Honey', 'Nuts', 'Dried Fruits'],
  },
  {
    id: 2,
    product_name: 'Fruit and Nut Mix',
    product_weight: 73,
    price: 749,
    calories: 353,
    ingredients: [
      'Almonds',
      'Cashews',
      'Dried Cranberries',
      'Dried Blueberries',
    ],
  },
  {
    id: 3,
    product_name: 'Veggie Chips',
    product_weight: 28,
    price: 279,
    calories: 130,
    ingredients: ['Sweet Potatoes', 'Beets', 'Kale', 'Sea Salt'],
  },
  {
    id: 4,
    product_name: 'Protein Balls',
    product_weight: 100,
    price: 499,
    calories: 318,
    ingredients: ['Dates', 'Almond Butter', 'Protein Powder', 'Chia Seeds'],
  },
];

function App() {
  const [snacksList, setSnacksList] = useState(snacks);
  const [searchData, setSearchData] = useState();
  const [sortData, setSortData] = useState({ attribute: '', type: '' });

  const sortHandler = (event) => {
    console.log('hello');
    setSortData((prevState) =>
      prevState.attribute && prevState.attribute === event.target.id
        ? { attribute: event.target.id, type: 'desc' }
        : { attribute: event.target.id, type: 'asc' }
    );

    console.log(sortData);
  };

  return (
    <div className='App'>
      <h1>Snack Table</h1>
      <input
        type='text'
        placeholder='Search with product name or ingredients'
        onChange={(event) => {
          setSearchData(event.target.value.toLowerCase());
        }}
      />

      <table>
        <thead>
          <tr>
            <th id='id' onClick={(event) => sortHandler(event)}>
              ID
            </th>
            <th id='product_name' onClick={(event) => sortHandler(event)}>
              Product Name
            </th>
            <th id='product_weight' onClick={(event) => sortHandler(event)}>
              Product Weight
            </th>
            <th id='price' onClick={(event) => sortHandler(event)}>
              Price (INR)
            </th>
            <th id='calories' onClick={(event) => sortHandler(event)}>
              Calories
            </th>
            <th id='ingredients' onClick={(event) => sortHandler(event)}>
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {snacksList
            .filter((snack) =>
              searchData
                ? snack.product_name.toLowerCase().includes(searchData) ||
                  snack.ingredients.includes(searchData)
                : true
            )
            .sort((One, Two) =>
              sortData.type !== ''
                ? sortData.type === 'asc'
                  ? One[sortData.attribute] - Two[sortData.attribute]
                  : Two[sortData.attribute] - One[sortData.attribute]
                : ''
            )
            .map((snack) => (
              <tr key={snack.id}>
                <td>{snack.id}</td>
                <td>{snack.product_name}</td>
                <td>{snack.product_weight}g</td>
                <td>&#8377;{snack.price}</td>
                <td>{snack.calories}</td>
                <td>{snack.ingredients.map((item, index) => item + ',')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
