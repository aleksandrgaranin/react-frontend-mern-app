import React from 'react'

import Input from '../../shared/components/FormElements/Input/Input'

import './NewPlace.css'


const NewPlace = () => {
  return (
    <form className="place-form">
      <Input type="input" label="Title" />
      <Input type="text" rows={5} />
    </form>
  )
}

export default NewPlace
