import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({
  children,
  close,
  onClick,
  id,
  listValues,
  setListValues,
  handleClick,
  tags,
  tag,
  isFirst,
  listIndex
}) => {
  const [ open, toggleOpen ] = useState(isFirst)

  const shouldOpen = isFirst && !open && !tag.includes(':')
  if (shouldOpen) toggleOpen(true)

  return (
    <span className='ui tag' onClick={onClick}>
      {children}
      {open && (
        <span>
          <ListValuesComponent
            listValues={listValues}
            setListValues={setListValues}
            handleClick={handleClick}
            tag={tag}
            index={id}
            toggleOpen={toggleOpen}
          />
        </span>
      )}
      <FiX onClick={close} className='tags-close-icon' />
    </span>
  )
}

const ListValuesComponent = ({
  listValues,
  setListValues,
  handleClick,
  tag,
  index,
  toggleOpen
}) => {
  return (
    <div>
      {listValues && Array.isArray(listValues) ? (
        <div className='inner-list-values'>
          {listValues.map((li, j) => (
            <div
              onClick={() => handleClick(li, tag, index, toggleOpen)}
              key={j}
            >
              {li}
            </div>
          ))}
        </div>
      ) : (
        <div className='inline-input'>
          <div onClick={() => handleClick(listValues, tag, index, toggleOpen)}>
            {listValues}
          </div>
          <ListInputComponent
            setListValues={setListValues}
            toggleOpen={toggleOpen}
            handleClick={handleClick}
            index={0}
            tag={tag}
          />
        </div>
      )}
    </div>
  )
}

const ListInputComponent = ({
  setListValues,
  toggleOpen,
  handleClick,
  tag,
  index
}) => {
  const [ value, setValue ] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    setListValues(value)
    handleClick(value, tag, 0, toggleOpen)
  }
  return (
    <div className='list-input-component'>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          className='list-value-input'
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  )
}
