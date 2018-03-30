import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// const flavArr = [
//   'Chocolate', 'Vanilla', 'Strawberry', 'Caramel', 'Cookies and Cream', 'Peppermin', 'Coffee'
// ]
// const FLAVOURS2 = flavArr.map(flavour => {
//   return { label: flavour, value: flavour }
// })
//
// const FLAVOURS = [
// 	{ label: 'Chocolate', value: 'chocolate' },
// 	{ label: 'Vanilla', value: 'vanilla' },
// 	{ label: 'Strawberry', value: 'strawberry' },
// 	{ label: '---BEST FLAVOURS---', value: '-', disabled: true },
// 	{ label: 'Caramel', value: 'caramel' },
// 	{ label: 'Cookies and Cream', value: 'cookiescream' },
// 	{ label: 'Peppermint', value: 'peppermint' },
// ];

function MultiSelectField(props) {
  const { value, ingredients, onFieldChange } = props

  const options = ingredients.meats.map(ingredient => {
    return { label: ingredient, value: ingredient }
  })

	const handleSelectChange = fieldValue => {
    onFieldChange(fieldValue);
	}
  return (
  	<div className="section">
  		<Select
  			multi
  			onChange={handleSelectChange}
  			options={options}
  			placeholder="Add your ingredients..."
        removeSelected={true}
  			simpleValue
  			value={value}
  		/>
  	</div>
  );

}
export default MultiSelectField;
