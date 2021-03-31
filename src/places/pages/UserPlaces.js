import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import PlaceList from '../components/PlaceList/PlaceList'
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner'

const UserPlaces = () => {
  const userId = useParams().userId // gettin userId from url
  const [loadedPlaces, setLoadedPlaces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        )
        console.log(responseData)
        const userPosts = responseData.places
        setLoadedPlaces(userPosts)
      } catch (err) {

      }

    }
    fetchPlaces()
  }, [sendRequest, userId])

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  }

  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  )

}

export default UserPlaces
