import React from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import PlaceItem from '../PlaceItem/PlaceItem'

import './PlaceList.css'


const PlaceList = props => {
  console.log(props.items)
  if (props.items.length === 0) {
    return <div className="place-list center">
      <Card>
        No places Found. You can create One.
        <button>Share place</button>
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
