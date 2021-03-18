import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import ErrorModal from '../../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner/LoadingSpinner'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/Util/validators'
import { useForm } from '../../../shared/hooks/form-hook'

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const authSubmitHandler = async event => {
    event.preventDefault()
    // console.log("AUTH LOGIC...", formState.inputs)

    if (isLoginMode) {

    } else {

      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        console.log(responseData)
        setIsLoading(false)
        auth.login()

      } catch (error) {
        console.log(error);
        setError(error.message || 'Something went wrong, please try again later.')
        setIsLoading(false)
      }
    }
  }

  const switchModeHAndler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setIsLogingMode(prevMode => !prevMode)
  }

  const errorHandler = ()=> {
    setError(null)
  }



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
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
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Pleace enter a valid password (at least 5 characters)."
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
