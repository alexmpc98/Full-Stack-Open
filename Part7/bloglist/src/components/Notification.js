import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let dom = null

  if (notification) {
    dom = (
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
    )
  }

  return dom
}

export default Notification
