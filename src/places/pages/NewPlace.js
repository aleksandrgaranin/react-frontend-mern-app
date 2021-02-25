import React from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import { VALIDATOR_REQUIRE } from '../../shared/Util/validators'

import './NewPlace.css'


const NewPlace = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Input field invalid" />
      <Input element="textarea" rows={5} label="Description" validators={[VALIDATOR_REQUIRE()]} errorText="Textarea field invalid" />
    </form>
  )
}

export default NewPlace
 