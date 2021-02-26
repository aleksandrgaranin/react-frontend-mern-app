import React from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Util/validators'

import { useForm } from '../../shared/hooks/form-hook'

import Button from '../../shared/components/FormElements/Button/Button'

import './PlaceForm.css'


const NewPlace = () => {
  const[formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  }, false)
  
  // console.log(formState.isValid)
  


  const placeSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) // send to back end
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        rows={5}
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        rows={5}
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Address."
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  )
}

export default NewPlace
