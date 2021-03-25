import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input/Input'
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload'

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Util/validators'
import { useForm } from '../../shared/hooks/form-hook'// Custom Hook
import { useHttpClient } from '../../shared/hooks/http-hook'

import { AuthContext } from '../../shared/context/AuthContext'

import Button from '../../shared/components/FormElements/Button/Button'

import './PlaceForm.css'


const NewPlace = () => {
  const auth = useContext(AuthContext)

  const [formState, inputHandler] = useForm(
    {
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
    },
    false
  )
  const { error, isLoading, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  const placeSubmitHandler = async event => {
    event.preventDefault()
    console.log(formState.inputs) // send to back end
    try {
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value) 
      formData.append('address', formState.inputs.address.value,)
      formData.append('creator', auth.userId)
      formData.append('image', formState.inputs.image.value)      
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        formData 
      )
      history.push('/')
    } catch (error) {

    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} />
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
    </React.Fragment>
  )
}

export default NewPlace
