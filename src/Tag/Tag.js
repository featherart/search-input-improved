import React from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({
  children,
  close,
  onClick,
  onMouseEnter,
  id
}) => (
  <span
    className='ui tag'
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {children}
    <span id={id} />
    <FiX onClick={close} className='tags-close-icon' />
  </span>
)
