import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Heading from './components/Heading'
import Timer from './components/Timer'
import ControlPanel from './components/ControlPanel'
import ActivitiesPane from './components/ActivitiesPane'

const DEFAULT_VALUES = {
  activities: [
    {
      title: 'Session',
      duration: 25*60*1000
    },
    {
      title: 'Break',
      duration: 5*60*1000
    }
  ],
  clockInterval: 1000,
  activityInterval: 1*60*1000,
  minDuration: 1*60*1000,
  maxDuration: 60*60*1000
} 

function App() {
  const [currentActivityId, setCurrentActivityId] = useState(0);
  const [activities, setActivities] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [clockTimeInterval, setClockTimeInterval] = useState(()=>{});

  const incrementHandler = (activityTitle) => {
    const isActivityWithinBoundsFn = targetActivity => targetActivity && targetActivity.duration < DEFAULT_VALUES.maxDuration;
    changeActivityDuration(activities, activityTitle, running, isActivityWithinBoundsFn, interval)
  }

  const decrementHandler = (activityTitle) => {
    const isActivityWithinBoundsFn = targetActivity => targetActivity && targetActivity.duration > DEFAULT_VALUES.minDuration;
    changeActivityDuration(activities, activityTitle, running, isActivityWithinBoundsFn, interval)
  }

  const changeActivityDuration = (activities, activityTitle, running, isActivityWithinBoundsFn) => {
    if (running == true)
      return;
    const targetActivity = activities.find(activity => activity.title == activityTitle);
    if(isActivityWithinBoundsFn(targetActivity)) {
      const updatedActivity = {
        ...targetActivity,
        duration: targetActivity.duration + interval
      }
    }
  }

  const updateActivities = () => {
    const updatedActivities = activities.map(activity => {
      return activity == targetActivity
      ? {
        ...activity,
        duration: activity.duration += DEFAULT_VALUES.activityInterval
      }
      : activity
    })
    setActivities(updatedActivities);
  }

  const startStopHandler = () => {
    if(running) {
      clearInterval(clockTimeInterval);
      setClockTimeInterval(0);
      setRunning(false);
    }
    else {
      const newclockTimeInterval = setInterval(clockTick, DEFAULT_VALUES.clockInterval);
      setClockTimeInterval(newclockTimeInterval);
      setRunning(true);
    }
  }

  const resetHandler = () => {
    if(running == false) 
      return;
    clearInterval(clockTimeInterval);
    setClockTimeInterval(0);
    setActivities(DEFAULT_VALUES.activities);
    setTimeLeft(DEFAULT_VALUES.activities.at(0).duration);
  }

  const skipHandler = () => {
    switchActivities();
  }

  const switchActivities = () => {
    const newCurrentActivityId = getNextActivityId(activities, currentActivityId);
    const newActivity = activities.at(newCurrentActivityId);
    setCurrentActivityId(newCurrentActivityId);
    setTimeLeft(newActivity.duration);
  }

  const getNextActivityId = (activities, currentActivityId) => {
    return currentActivityId < activities.length - 1
    ? currentActivityId + 1
    : 0;
  }

  const clockTick = () => {
    if(timeLeft > 0) {
      setTimeLeft(prevTimeLeft => prevTimeLeft - DEFAULT_VALUES.clockInterval);
    } else {
      switchActivities();
    }
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

  useEffect(() => {
    setActivities(DEFAULT_VALUES.activities);
    setTimeLeft(DEFAULT_VALUES.activities.at(0).duration);
  }, [])

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
        title={activities.length > 0 && activities.at(currentActivityId).title}
        timeLeft={timeLeft}
      />
      <ControlPanel
        resetHandler={resetHandler}
        startStopHandler={startStopHandler}
        skipHandler={skipHandler}
      />
      <p>Current Activity Id: {currentActivityId}</p>
    </div>
  )
}

export default App
