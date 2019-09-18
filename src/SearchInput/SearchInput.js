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

  const handleListClick = (listItem, tag, index, toggleOpen) => {
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
    toggleOpen(false)
  }

  // opens the inner list of values
  // index is used to make sure list is opened for the correct tag
  const handleTagList = (tag, i) => {
    addToTags(tag)
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
            <ListItemsComponent
              labels={labels}
              addToTags={addToTags}
              handleTagList={handleTagList}
            />,
            document.getElementById('list-values')
          )}
        <div className='inner-input'>
          {tags.map((tag, i) => (
            <div key={i} className='test'>
              <Tag
                id={i}
                close={() => removeFromTags(tag, i)}
                listValues={listValues}
                setListValues={setListValues}
                handleListClick={handleListClick}
                handleClick={handleListClick}
                tag={tag}
              >
                {tag}
              </Tag>
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

const ListItemsComponent = ({ labels, addToTags, handleTagList }) => {
  return (
    <div className='list-items-portal'>
      {labels.map((label, i) => (
        <span key={i} onClick={() => handleTagList(label.name, i)}>
          <FiSmile className='label-icon' />
          {label.name}
        </span>
      ))}
    </div>
  )
}
