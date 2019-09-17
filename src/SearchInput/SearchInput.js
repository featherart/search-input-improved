import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '../Tag'
import { FiPlusSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import { labels } from '../labels'
import './search-input.css'

export const SearchInput = ({ placeholder }) => {
  const [ value, setValue ] = useState('')
  const [ listValues, setListValues ] = useState([])
  const [ labelsOpen, toggleLabels ] = useState(false)
  const [ listValuesOpen, toggleListValues ] = useState(false)
  const [ tags, setTags ] = useState([])
  const [ addDisabled, toggleDisabled ] = useState(false)

  // this is initialized with a null string but it will be set to the
  // index value of the tag with a list that is currently open
  const [ listIndexOpen, setListIndexOpen ] = useState('')

  const innerPlaceholder = value || placeholder

  const clearAll = () => {
    setValue('')
    setTags([])
    setListIndexOpen('')
  }

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

  const handleListClick = (listItem, tag, index) => {
    tags.forEach((item, i) => {
      if (item === tag) {
        removeFromTags(item, i)
        const before = tags.slice(0, i)
        const after = tags.slice(i, tags.length)
        if (!tags.includes(`${tag} : ${listItem}`))
          setTags([ ...before, `${tag} : ${listItem}`, ...after ])
      }
    })
    setListIndexOpen('')
  }

  // opens the inner list of values
  // index is used to make sure list is opened for the correct tag
  const handleTagList = (tag, i) => {
    const val = labels.find(label => label.name === tag)
    setListValues(val && val.value)
    toggleListValues(!listValuesOpen)
    return listIndexOpen === i ? setListIndexOpen('') : setListIndexOpen(i)
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
            <div key={i}>
              <Tag
                id={i}
                onClick={() => handleTagList(tag, i)}
                onMouseEnter={() => handleTagList(tag, i)}
                close={() => removeFromTags(tag, i)}
              >
                {tag}
              </Tag>
              {listIndexOpen === i &&
                document.getElementById(i) &&
                ReactDOM.createPortal(
                  <ListValuesComponent
                    handleClick={handleListClick}
                    tag={tag}
                    index={i}
                    listValues={listValues}
                  />,
                  document.getElementById(i)
                )}
            </div>
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
