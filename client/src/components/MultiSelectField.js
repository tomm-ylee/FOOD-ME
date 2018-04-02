import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Form, Button } from 'reactstrap'


function MultiSelectField(props) {
  const { value, ingredients, onSelectChange, onSelectSubmit } = props

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
  	<div className="section">
      <Form onSubmit={handleSubmit}>
    		<Select
          id="ingredientMulti"
    			multi
    			onChange={onSelectChange}
    			options={options}
    			placeholder="Add your ingredients..."
          removeSelected={true}
    			simpleValue
    			value={value}
          name="ingredient"
    		/>
        <Button className="multiSelectButton">Add Ingredients</Button>
      </Form>
  	</div>
  );

}
export default MultiSelectField;
