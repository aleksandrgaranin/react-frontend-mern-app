import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import LoadingSpinner from '../../../shared/components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../../shared/components/ErrorModal/ErrorModal'
import Card from '../../../shared/components/UIElements/Card/Card'

import { AuthContext } from '../../../shared/context/AuthContext'

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/Util/validators'

import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook'

import '../PlaceForm.css'


const UpdatePlace = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()
  const placeId = useParams().placeId
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  )

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        )
        setLoadedPlace(responseData.place)
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        )


      } catch (error) {

      }
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])

  const updateSubmitHandler = async event => {
    event.preventDefault()
    console.log(formState.inputs)
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      history.push(`/${auth.userId}/places`)
    } catch (error) {

    }
  }

  console.log(loadedPlace);
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedPlace && !error) {
    return <div className="center">
      <Card>
        <h2>Could not find place!</h2>
      </Card>
    </div>
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Pleace enter a valid Title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            rows={5}
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Pleace enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
      )}
    </React.Fragment>

  )
}

export default UpdatePlace
