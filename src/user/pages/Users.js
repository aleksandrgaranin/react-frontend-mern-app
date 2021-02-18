import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: "ui1",
      name: "Aleks Garanin",
      image: "https://aleksandrgaranin.github.io/images/ag.jpg",
      places: 1,
    }
  ];

  return (
    <UsersList items={USERS} />
  )
}

export default Users
