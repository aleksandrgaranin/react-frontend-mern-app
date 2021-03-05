import React from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import PlaceItem from '../PlaceItem/PlaceItem'
import Button from '../../../shared/components/FormElements/Button/Button'

import './PlaceList.css'


const PlaceList = props => {
  console.log(props.items)
  if (props.items.length === 0) {
    return <div className="place-list center">
      <Card style={{textAlign: "center", padding: "1rem"}}>
        No places Found. You can create One.
        <Button to="/places/new">Share place</Button>
      </Card>
    </div>
  }

  return <ul className="place-list">
    {props.items.map(place => (
      <PlaceItem
        key={place.id}
        id={place.id}
        image={place.imageUrl}
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location} />
    ))}
  </ul>
}

export default PlaceList
