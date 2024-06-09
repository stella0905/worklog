import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const Main = () => {
  const [addList, setAddList] = useState('')
  const [list, SetList] = useState([])
  const [timerBtn, setTimerBtn] = useState(true)
  const [selectBtn, setSelectBtn] = useState(true)
  const [timer, setTimer] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [inProgress, setInProgress] = useState({ id: null, status: false })
  const [count, setCount] = useState(0)

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('List')) || []
    SetList(savedList)
    // console.log(savedList)
  }, [])

  const onChangeList = (e) => {
    setAddList(e.target.value)
  }
  const onChangeCount = (e) => {
    setCount(e.target.value)
  }
  const ListAddBtnHandler = () => {
    const newItem = { id: uuidv4(), content: addList, totalTime: 0, totalCount: 0 }
    const newList = [...list, newItem]
    SetList(newList)
    localStorage.setItem('List', JSON.stringify(newList))
    setAddList('')
  }
  const listItemDeleteBtnHandler = (choiceItem) => {
    const upDateList = list.filter((item) => item.id !== choiceItem)
    localStorage.setItem('List', JSON.stringify(upDateList))
    SetList(upDateList)
  }
  const timerBtnHandler = (itemId) => {
    setSelectBtn(!selectBtn)
    console.log('sdsdsd')
    console.log(timerBtn)
    if (!inProgress.status) {
      //진행중이 아니라면
      setInProgress({ id: itemId, status: true })
      setTimerBtn(false)
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      setTimer(timeString)
      setStartTime(now)
    }
    if (inProgress.status) {
      if (inProgress.id === itemId) {
        // 진행중 + 동일한 아이디
        setTimerBtn(true)
        setInProgress({ id: null, status: false })
        const end = new Date()
        const difference = end - startTime
        const totalMinutesCalculate = Math.ceil(difference / 1000 / 60)
        const updatedList = list.map((item) => {
          if (item.id === itemId) {
            return { ...item, totalTime: item.totalTime + totalMinutesCalculate }
          }
          return item
        })

        // 수정된 리스트를 로컬 스토리지에 저장
        localStorage.setItem('List', JSON.stringify(updatedList))
        SetList(updatedList)
      } else {
        return
      }
    }
  }
  const countHandler = (itemId) => {
    if (inProgress.status) {
      return
    }
    const userInput = prompt('건수를 입력하세요:', '')
    setCount(userInput)
    const updatedCount = list.map((item) => {
      if (item.id === itemId) {
        return { ...item, totalCount: userInput }
      }
      return item
    })
    window.location.reload()

    // 수정된 리스트를 로컬 스토리지에 저장
    localStorage.setItem('List', JSON.stringify(updatedCount))
  }
  return (
    <Section>
      <ListAddBox>
        <ListInput id="add-list-input" name="addList" value={addList} onChange={onChangeList}></ListInput>
        <ListAddButton onClick={ListAddBtnHandler}>추가</ListAddButton>
      </ListAddBox>
      {list.map((item) => (
        <ListBox>
          <ListTitle key={item.id}>
            {item.content}
            <DeleteButton onClick={() => listItemDeleteBtnHandler(item.id)}>x</DeleteButton>
          </ListTitle>
          <StartBtn onClick={() => timerBtnHandler(item.id)} disabled={!inProgress.status && inProgress.id === item.id}>
            {inProgress.id === item.id ? '중지' : '시작'}
          </StartBtn>
          <Timer>{inProgress.id === item.id ? timer : ''}</Timer>
          <TotalTime>총 {item.totalTime}분</TotalTime>
          <CountBox>
            {/* <CountInput id="add-count-input" name="count" value={count} onChange={onChangeCount} />
            <button onClick={() => countBtnHandler(item.id)}>입력</button>  */}
            <p onClick={() => countHandler(item.id)}>{item.totalCount} 건</p>
          </CountBox>
        </ListBox>
      ))}
    </Section>
  )
}

export default Main

const CountBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-size: 15px;
  }
  button {
    background-color: #369fb2;
    color: white;
    margin-left: 5px;
    margin-right: 10px;
    width: 40px;
    cursor: pointer;
  }
`
const CountInput = styled.input`
  width: 40px;
  font-size: 15px;
`

const Section = styled.section`
  margin: 20px;
`
const ListAddBox = styled.div`
  margin-bottom: 20px;
  height: 30px;
  display: flex;
`
const ListInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid black;
  width: 300px;
`
const ListAddButton = styled.button`
  background-color: #369fb2;
  color: white;
  margin-left: 10px;
  width: 80px;
  cursor: pointer;
`

const ListBox = styled.div`
  font-size: 15px;
  width: 700px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  border-bottom: 1px solid gray;
`
const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`
const ListTitle = styled.p`
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;

  position: relative;
`
const StartBtn = styled.button`
  cursor: pointer;
  background-color: #369fb2;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  height: 30px;
  width: 50px;
`
const Timer = styled.div`
  font-size: 15px;
  width: 100px;
`
const TotalTime = styled.div`
  font-size: 15px;
  margin-right: 10px;
  width: 70px;
`
