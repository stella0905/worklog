import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyles from '../style/GlobalStyle'
import Layout from '../component/Layout'
import Home from '../component/Home'

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path={''} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
