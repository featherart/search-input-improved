import React, { useState } from 'react'
import { Tag } from '../Tag'
import { FiPlusSquare, FiXSquare, FiX, FiFilter } from 'react-icons/fi'
import './search-input.css'

export const SearchInput = ({ placeholder }) => {
  const [ value, setValue ] = useState('')
  const innerPlaceholder = value || placeholder

  const clearAll = () => setValue('')

  return (
    <div className='input-filter-wrapper'>
      <FiFilter className='filter-icon' />
      <div className='input-filter'>
        <FiPlusSquare
          className='plus-icon'
          //onClick={() => toggleLabels(!labelsOpen)}
        />
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
    </div>
  )
}
