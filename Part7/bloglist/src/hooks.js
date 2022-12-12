import { useState } from 'react'

const useField = (type, label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    label,
    type,
    value,
    onChange
  }
}

const useVisible = () => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return {
    visible,
    toggleVisibility,
    hideWhenVisible,
    showWhenVisible
  }
}

export { useField, useVisible }
