import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList/PlaceList'

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://wallpapertag.com/wallpaper/full/8/1/b/573386-new-york-city-background-1920x1200-for-computer.jpg",
    address: "20 West 34th Street, New York City, NY 10001",
    creator: "u1",
    location: {
      lat: "40.748817",
      lng: "-73.985428"
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
      lat: "40.748817",
      lng: "-73.985428"
    }
  }
]

const UserPlaces = () => {
  const userId = useParams().userId // gettin userId from url
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
