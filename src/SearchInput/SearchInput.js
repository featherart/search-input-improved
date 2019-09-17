import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '../Tag'
import { FiPlusSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import { labels } from '../labels'
import './search-input.css'

export const SearchInput = ({ placeholder }) => {
  const [ value, setValue ] = useState('')
  const [ labelsOpen, toggleLabels ] = useState(false)
  const [ listValuesOpen, toggleListValues ] = useState(false)
  const [ tags, setTags ] = useState([])
  const [ addDisabled, toggleDisabled ] = useState(false)

  const innerPlaceholder = value || placeholder

  const clearAll = () => setValue('')

  // removes tag from input when x clicked
  const removeFromTags = (tag, i) => {
    toggleDisabled(false)
    tags.splice(i, 1)
    setTags([ ...tags ])
  }

  const addToTags = label => {
    if (!tags.includes(label)) setTags([ ...tags, label ])
    toggleLabels(false)
    toggleDisabled(true)
  }

  return (
    <div className='input-filter-wrapper'>
      <FiFilter className='filter-icon' />
      <div className='input-filter'>
        {addDisabled ? (
          <FiPlusSquare className='plus-icon-disabled' />
        ) : (
          <FiPlusSquare
            className='plus-icon'
            onClick={() => toggleLabels(!labelsOpen)}
          />
        )}
        {labelsOpen &&
          ReactDOM.createPortal(
            <ListItemsComponent labels={labels} addToTags={addToTags} />,
            document.getElementById('list-values')
          )}
        <div className='inner-input'>
          {tags.map((tag, i) => (
            <>
              <Tag
                id={i}
                key={i}
                onClick={() => toggleListValues(!listValuesOpen)}
                close={() => removeFromTags(tag, i)}
              >
                {tag}
              </Tag>
              {listValuesOpen &&
                document.getElementById(i) &&
                ReactDOM.createPortal(
                  <div className='test'>hi</div>,
                  document.getElementById(i)
              )}
            </>
          ))}
          <input
            value={value}
            onChange={e => setValue(e && e.target && e.target.value)}
            placeholder={innerPlaceholder}
          />
        </div>
        <FiX
          className='close-icon'
          onClick={() => clearAll()}
          name='close-fill'
        />
      </div>
      <span id='list-values' />
    </div>
  )
}

const ListItemsComponent = ({ labels, addToTags }) => {
  return (
    <div className='list-items-portal'>
      {labels.map((label, i) => (
        <span key={i} onClick={() => addToTags(label.name)}>
          <FiSmile className='label-icon' />
          {label.name}
        </span>
      ))}
    </div>
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
