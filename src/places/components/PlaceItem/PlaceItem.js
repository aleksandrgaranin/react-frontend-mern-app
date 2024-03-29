import React, { useState, useContext } from 'react'

import Card from '../../../shared/components/UIElements/Card/Card'
import Button from '../../../shared/components/FormElements/Button/Button'
import Modal from '../../../shared/components/UIElements/Modal/Modal'
import Map from '../../../shared/components/UIElements/Map/Map'
import ErrorModal from '../../../shared/components/ErrorModal/ErrorModal'
import LoadingSpinner from '../../../shared/components/LoadingSpinner/LoadingSpinner'

import { AuthContext } from '../../../shared/context/AuthContext'

import { useHttpClient } from '../../../shared/hooks/http-hook'


import './PlaceItem.css'

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()


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

  const confirmDeletingHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      )
      props.onDelete(props.id)
    } catch (error) { }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.userId === props.creatorId && (
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