import React from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/Util/validators'

import '../PlaceForm.css'


const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://wallpapertag.com/wallpaper/full/8/1/b/573386-new-york-city-background-1920x1200-for-computer.jpg",
    address: "20 West 34th Street, New York City, NY 10001",
    creator: "u1",
    location: {
      lat: 40.748817,
      lng: -73.985428
    }
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://wallpapertag.com/wallpaper/full/8/1/b/573386-new-york-city-background-1920x1200-for-computer.jpg",
    address: "20 West 34th Street, New York City, NY 10001",
    creator: "u2",
    location: {
      lat: 40.748817,
      lng: -73.985428
    }
  }
]


const UpdatePlace = props => {
  const placeId = useParams().placeId
  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)
  if (!identifiedPlace) {
    return <div className="center">
      <h2>Could not find place!</h2>
    </div>
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        lable="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Pleace enter a valid Title"
        onInput={() => { }}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        rows={5}
        lable="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Pleace enter a valid description (at least 5 characters)."
        value={identifiedPlace.description}
        onInput={() => { }}
        valid={true}
      />
      <Button type="submit" disabled={true}>UPDATE PLACE</Button>
    </form>
  )
}

export default UpdatePlace
