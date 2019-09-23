import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '../Tag'
import { FiPlusSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import { labels } from '../labels'
import { useLocalStorage } from '../useLocalStorage'
import './search-input.css'

export const SearchInput = ({ placeholder }) => {
  const [ value, setValue ] = useState('')
  const [ listValues, setListValues ] = useState([])
  const [ labelsOpen, toggleLabels ] = useState(false)
  const [ listValuesOpen, toggleListValues ] = useState(false)

  const [ addDisabled, toggleDisabled ] = useState(false)

  const innerPlaceholder = value || placeholder

  // values get set in local storage in an array
  const [ searchValues, setSearchValues ] = useLocalStorage(
    'ngc::searchvalues'
  )
  const [ tags, setTags ] = useState([...searchValues])

  const clearAll = () => {
    setValue('')
    setTags([])
    toggleDisabled(false)
  }

  // removes tag from input when x clicked
  const removeFromTags = (tag, i) => {
    toggleDisabled(false)
    tags.splice(i, 1)
    setTags([ ...tags ])
    setSearchValues([ ...tags ])
  }

  const addToTags = label => {
    if (!tags.includes(label)) setTags([ label, ...tags ])
    toggleLabels(false)
    toggleDisabled(true)
    setSearchValues([ label, ...tags ])
  }

  const handleListClick = (listItem, tag, index, toggleOpen) => {
    tags.forEach((item, i) => {
      if (item === tag) {
        removeFromTags(item, i)
        if (!tags.includes(`${tag} : ${listItem}`)) {
          setTags([ `${tag} : ${listItem}`, ...tags ])
          setSearchValues([ `${tag} : ${listItem}`, ...tags ])
        }
      }
    })
    toggleOpen(false)
  }

  // opens the inner list of values
  // index is used to make sure list is opened for the correct tag
  const handleTagList = (tag) => {
    addToTags(tag)
    const val = labels.find(label => label.name === tag)
    setListValues(val && val.value)
    toggleListValues(!listValuesOpen)
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
            <div key={i} className='tag-size-container'>
              <Tag
                id={i}
                close={() => removeFromTags(tag, i)}
                listValues={listValues}
                setListValues={setListValues}
                handleClick={handleListClick}
                isFirst={i === 0}
                tags={tags}
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

const ListItemsComponent = ({ labels, handleTagList }) => {
  return (
    <div className='list-items-portal'>
      {labels.map((label, i) => (
        <span key={i} onClick={() => handleTagList(label.name)}>
          <FiSmile className='label-icon' />
          {label.name}
        </span>
      ))}
    </div>
  )
}
