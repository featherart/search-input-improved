import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({
  children,
  close,
  onClick,
  id,
  listValues,
  handleClick,
  tag,
  listIndex
}) => {
  const [ open, toggleOpen ] = useState(true)
  return (
    <span className='ui tag' onClick={onClick}>
      {children}
      {open &&
        <span>
          <ListValuesComponent
            listValues={listValues}
            handleClick={handleClick}
            tag={tag}
            index={id}
            onClick={() => toggleOpen(!open)}
          />
        </span>
      }
      <FiX onClick={close} className='tags-close-icon' />
    </span>
  )
}

const ListValuesComponent = ({ listValues, handleClick, tag, index }) => {
  return (
    <div className='inner-list-values'>
      {Array.isArray(listValues) ? (
        listValues.map((li, j) => (
          <div onClick={() => handleClick(li, tag, index)} key={j}>
            {li}
          </div>
        ))
      ) : (
        <div onClick={() => handleClick(listValues, tag, index)}>
          {listValues}
        </div>
      )}
    </div>
  )
}
