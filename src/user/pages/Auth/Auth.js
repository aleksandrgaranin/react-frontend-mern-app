import React, { useState } from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'

import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/Util/validators'
import { useForm } from '../../../shared/hooks/form-hook'

import './Auth.css'

const Auth = () => {
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



  const authSubmitHandler = (event) => {
    event.preventDefault()
    console.log("AUTH LOGIC...", formState.inputs)
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

  return (
    <Card className="authentication">
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
  )
}

export default Auth
