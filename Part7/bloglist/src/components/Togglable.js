import { Button, Fab } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import React from 'react'

import { useVisible } from '../hooks'

const Togglable = (props) => {
  const visible = useVisible()

  return (
    <div>
      <div style={visible.hideWhenVisible}>
        <Fab aria-label="edit" variant="contained" onClick={visible.toggleVisibility}>
          <EditIcon /> {props.buttonLabel}
        </Fab >
      </div>
      <div style={visible.showWhenVisible}>
        {props.children} <Button variant="contained" color="primary" onClick={visible.toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  'buttonLabel': PropTypes.string.isRequired
}

export default Togglable
