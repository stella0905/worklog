import React from 'react'
import { styled } from 'styled-components'

function Header() {
  return (
    <HeaderBackground>
      <HeaderText>GPA 업무 시간통계</HeaderText>
    </HeaderBackground>
  )
}

export default Header

const HeaderBackground = styled.div`
  width: 100%;
  height: 70px;
  background-color: #b2cb51;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid gray;
`
const HeaderText = styled.p`
  font-size: 20px;
  /* color: #359fb2; */

  font-weight: 800;
`
