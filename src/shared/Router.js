import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyles from '../style/GlobalStyle'
import Layout from '../component/Layout'
import Main from '../component/Main'

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path={''} element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
