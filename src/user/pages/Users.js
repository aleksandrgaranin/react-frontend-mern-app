import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner'

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/users')

        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        console.log(responseData)
        setLoadedUsers(responseData.users)
      } catch (error) {
        console.log(error)
        setError(error.message || 'Something went wrong, uneble to fetch data. Please try again later.')
      }
      setIsLoading(false)

    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  )
}

export default Users
