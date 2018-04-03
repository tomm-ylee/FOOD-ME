import React from 'react';
import { Popover, PopoverBody } from 'reactstrap'

function DefaultPrompt(props) {
  const { defaultPop, basics = [], goToggleDefaultPop = () => {}, goAddDefaults = () => {} } = props
  
  const addDefaults = event => {
    event.preventDefault();
    goAddDefaults({ value: basics })
  }
  const toggleDefaultPop = () => {
    goToggleDefaultPop()
  }

  const toggle = () => {}

  return (
  	<span className="DefaultPrompt">
      (<a id="defaultLink" href='' onClick={addDefaults} onMouseEnter={toggleDefaultPop} onMouseLeave={toggleDefaultPop}>Add our defaults?</a>)
      <Popover placement="bottom" isOpen={defaultPop} target="defaultLink" toggle={toggle}>
        <PopoverBody className="defaultPromptBody">{basics.join(', ')}</PopoverBody>
      </Popover>
  	</span>
  );

}
export default DefaultPrompt;
