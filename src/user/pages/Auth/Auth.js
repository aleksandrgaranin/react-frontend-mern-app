import React from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'

import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/Util/validators'
import { useForm } from '../../../shared/hooks/form-hook'

import './Auth.css'

const Auth = () => {
 const [formState, inputHandler] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)


  const authSubmitHandler = (event) => {
    event.preventDefault()
    console.log("AUTH LOGIC...")
  }


  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
        <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
      </form>
    </Card>
  )
}

export default Auth
