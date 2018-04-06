import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Form, Button } from 'reactstrap'


function MultiSelectField(props) {
  const { value, ingredients, header, onSelectChange, onSelectSubmit } = props

  const options = []
  for(let foodGroup in ingredients) {
    options.push({ label: `- ${foodGroup.toUpperCase()}-`, value: '-', disabled: true });

    for(let ingredient of ingredients[foodGroup]) {
      options.push({ label: ingredient, value: ingredient })
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.getAll('ingredient')

    onSelectSubmit({ value })
  }

  return (
  	<div className="multiSelectSection">
      <h4>{header}</h4>
      <Form onSubmit={handleSubmit}>
    		<Select
          className="ingredientMulti"
    			multi
    			onChange={onSelectChange}
    			options={options}
    			placeholder="Type the ingredients..."
          removeSelected={true}
    			simpleValue
    			value={value}
          name="ingredient"
    		/>
        <Button className="btn-outline-dark multiSelectButton">Add Ingredients</Button>
      </Form>
  	</div>
  );

}
export default MultiSelectField;
