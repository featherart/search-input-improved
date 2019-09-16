import React from 'react'
import { SearchInput } from './SearchInput'

function App() {
  return (
    <div className='App'>
      <header className='header'>Searchville Part III</header>
      <div className='content'>
        <SearchInput placeholder={'search ...'} />
      </div>
    </div>
  )
}

export default App
