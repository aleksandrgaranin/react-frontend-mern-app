import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import ErrorModal from '../../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner/LoadingSpinner'
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload'

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../../shared/Util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook'

import { AuthContext } from '../../../shared/context/AuthContext'

import './Auth.css'

const Auth = () => {
  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)

  const [isLoginMode, setIsLogingMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const authSubmitHandler = async event => {
    event.preventDefault()
    // console.log(formState.inputs)
    // console.log("AUTH LOGIC...", formState.inputs)

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          },
        );
        auth.login(responseData.userId, responseData.token);
      } catch (error) {

      }
    } else {
      try {
        const formData = new FormData()
        formData.append('email', formState.inputs.email.value)
        formData.append('userName', formState.inputs.name.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) { }
    }
  }

  const switchModeHAndler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false)
    }
    setIsLogingMode(prevMode => !prevMode)
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode &&
            <Input
              id="name"
              element="input"
              type="text"
              label="User Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Pleace enter a valid User Name"
              onInput={inputHandler}
            />
          }
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image." />}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Pleace enter a valid E-mail address"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Pleace enter a valid password (at least 6 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHAndler}>{isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}</Button>
      </Card>
    </React.Fragment>
  )
}

export default Auth
