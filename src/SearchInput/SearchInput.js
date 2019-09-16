import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '../Tag'
import { FiPlusSquare, FiXSquare, FiX, FiFilter } from 'react-icons/fi'
import { labels } from '../labels'
import './search-input.css'

export const SearchInput = ({ placeholder }) => {
  const [ value, setValue ] = useState('')
  const [ labelsOpen, toggleLabels ] = useState(false)
  const innerPlaceholder = value || placeholder

  const clearAll = () => setValue('')

  return (
    <div className='input-filter-wrapper'>
      <FiFilter className='filter-icon' />
      <div className='input-filter'>
        <FiPlusSquare
          className='plus-icon'
          onClick={() => toggleLabels(!labelsOpen)}
        />
        {labelsOpen &&
          ReactDOM.createPortal(
            <div className='list-items-portal'>
              {labels.map((label, i) => (
                <span key={i}>{label.name}</span>
              ))}
            </div>, document.getElementById('list-values'))
        }
        <div className='inner-input'>
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
