import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import Button from '../../../shared/components/FormElements/Button/Button'
import Modal from '../../../shared/components/UIElements/Modal/Modal'
import Map from '../../../shared/components/UIElements/Map/Map'

import AuthContext from '../../../shared/context/AuthContext'


import './PlaceItem.css'

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const auth = useContext(AuthContext)

  const openMapHandler = () => {
    setShowMap(true)
  }

  const closeMapHandler = () => {
    setShowMap(false)
  }

  const openDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const closeDeleteHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeletingHandler = () => {
    console.log('DELETING...')
  }

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteHandler}
        header="Are you shure"
        // contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={(
          <React.Fragment>
            <Button danger onClick={confirmDeletingHandler}>DELETE</Button>
            <Button inverse onClick={closeDeleteHandler}>CLOSE</Button>
          </React.Fragment>
        )}
      >
        <p>Do you want to proceed and delete thisplace?
        Please note that it can't be undone thereafter.
          </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={openDeleteWarningHandler}>DELETE</Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;