import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Heading from './components/Heading'
import Timer from './components/Timer'
import ControlPanel from './components/ControlPanel'
import ActivitiesPane from './components/ActivitiesPane'

function App() {
  const [state, setState] = useState({})

  const activities = [
    {
      title: 'Session',
      length: 25*60*1000
    },
    {
      title: 'Break',
      length: 5*60*1000
    }
  ]

  const incrementHandler = (target) => {
    console.log(`increment ${target}`);
  }

  const decrementHandler = (target) => {
    console.log(`decrement ${target}`);
  }

  const startStopHandler = () => {
    console.log('start stop...')
  }

  const resetHandler = () => {
    console.log('resetting...')
  }

  const appStyles = [
    {
      key: 'display',
      value: 'flex flex-col items-center'
    },
    {
      key: 'padding',
      value: 'pt-16 pb-16 pl-4 pr-4'
    },
    {
      key: 'text-color',
      value: 'text-white'
    },
    {
      key: 'border',
      value: 'border-2 border-solid border-black'
    },
    {
      key: 'background',
      value: 'bg-red-500'	
    }
  ].map(style => style.value).join(' ')

  return (
    <div className={`App ${appStyles}`}>
      <Heading
        title="25 + 5 CLock"/>
      <ActivitiesPane 
        activities={activities}
        incrementHandler={incrementHandler}
        decrementHandler={decrementHandler}
      />
      <Timer 
        title="Session" 
        timeLeft="15000"
      />
      <ControlPanel
        resetHandler={resetHandler}
        startStopHandler={startStopHandler}
      />
    </div>
  )
}

export default App
