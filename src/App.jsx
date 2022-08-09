import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { useInterval } from './hooks/useInterval';

import Heading from './components/Heading'
import Timer from './components/Timer'
import ControlPanel from './components/ControlPanel'
import ActivitiesPane from './components/ActivitiesPane'

const DEFAULT_VALUES = {
  activities: [
    {
      title: 'Session',
      duration: 1*60*1000
    },
    {
      title: 'Break',
      duration: 1*60*1000
    }
  ],
  running: false,
  currentActivityId: 0,
  clockInterval: 1000,
  activityInterval: 1*60*1000,
  minDuration: 1*60*1000,
  maxDuration: 60*60*1000,
  userMessage: ''
} 

function App() {
  const [currentActivityId, setCurrentActivityId] = useState(DEFAULT_VALUES.currentActivityId);
  const [activities, setActivities] = useState(DEFAULT_VALUES.activities);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_VALUES.activities.at(DEFAULT_VALUES.currentActivityId).duration);
  const [running, setRunning] = useState(DEFAULT_VALUES.running);
  const [userMessage, setUserMessage] = useState(DEFAULT_VALUES.userMessage);
  const [activityInterval, setActivityInterval] = useState(DEFAULT_VALUES.activityInterval);
  const [clockInterval, setClockInterval] = useState(DEFAULT_VALUES.clockInterval);

  const incrementHandler = (activityTitle) => {
    if(running) {
      setUserMessage(`Cannot increment ${activityTitle} duration while timer is running!`);
      return;
    }
    const targetActivity = activities.find(activity => activity.title == activityTitle);
    if(targetActivity == false) {
      setUserMessage(`Activity called "${activityTitle}" does not exist!`);
      return;
    }
    if(targetActivity.duration >= DEFAULT_VALUES.maxDuration) {
      setUserMessage(`${targetActivity.title} duration is already at maximum!`);
      return;
    }
    const updatedActivity = updateActivity(targetActivity, 'duration');
    if(updatedActivity == false) {
      setUserMessage(`${targetActivity.title} duration could not be updated.`);
      return;
    }
    const updatedActivities = updateActivities(activities, updatedActivity);
    if(updatedActivities.length < 1) {
      setUserMessage(`Activities could not be updated.`);
      return;
    }
    setActivities(updatedActivities)
  }

  const decrementHandler = (activityTitle) => {
    if(running) {
      setUserMessage(`Cannot decrement ${activityTitle} duration while timer is running!`);
      return;
    }
    const targetActivity = activities.find(activity => activity.title == activityTitle);
    if(targetActivity == false) {
      setUserMessage(`Activity called "${activityTitle}" does not exist!`);
      return;
    }
    if(targetActivity.duration <= DEFAULT_VALUES.minDuration) {
      setUserMessage(`${targetActivity.title} duration is already at minimum!`);
      return;
    }
    const updatedActivity = updateActivity(targetActivity, 'duration',  0 - DEFAULT_VALUES.activityInterval);
    if(updatedActivity == false) {
      setUserMessage(`${targetActivity.title} duration could not be updated.`);
      return;
    }
    const updatedActivities = updateActivities(activities, updatedActivity);
    if(updatedActivities.length < 1) {
      setUserMessage(`Activities could not be updated.`);
      return;
    }
    setActivities(updatedActivities)
  } 

  const updateActivity = (targetActivity, prop, value) => {
    if(targetActivity == false || targetActivity.hasOwnProperty(prop) == false)
      return;
    const updatedActivity = {
      ...targetActivity,
      [prop]: targetActivity[prop] + value
    }
    return updatedActivity;
  }

  const updateActivities = (activities, updatedActivity) => {
    return activities.map(activity => 
        activity.title == updatedActivity.title 
        ? updatedActivity 
        : activity
    );
  }

  const startStopHandler = () => {
    if(running)
      stopClock()
    else 
      startClock()
  }

  const startClock = () => {
    setUserMessage('Clock started.')
    setRunning(true);
  }

  const stopClock = () => {
    setUserMessage('Clock stopped.')
    setRunning(false);
  }

  const resetHandler = () => {
    setCurrentActivityId(DEFAULT_VALUES.currentActivityId);
    setActivities(DEFAULT_VALUES.activities);
    setTimeLeft(DEFAULT_VALUES.activities.at(DEFAULT_VALUES.currentActivityId).duration);
    setRunning(DEFAULT_VALUES.running);
    setUserMessage(DEFAULT_VALUES.userMessage);
    setActivityInterval(DEFAULT_VALUES.activityInterval);
    setClockInterval(DEFAULT_VALUES.clockInterval);
  }

  const skipHandler = () => {
    switchActivities(activities, currentActivityId);
  }

  const switchActivities = (activities, currentActivityId) => {
    console.log('Current Activity Id', currentActivityId);
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

  useInterval(() => {
    if(timeLeft > 0) {
      setTimeLeft(prevTimeLeft => prevTimeLeft - DEFAULT_VALUES.clockInterval);
    } else {
      switchActivities(activities, currentActivityId);
    }
  }, running ? clockInterval : null)

  useEffect(() => {
    if(userMessage.length > 0)
      console.warn(userMessage);
  }, [userMessage]);

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
        title={activities.length > 0 && activities.at(currentActivityId).title}
        timeLeft={timeLeft}
      />
      <ControlPanel
        resetHandler={resetHandler}
        startStopHandler={startStopHandler}
        skipHandler={skipHandler}
      />
      <p>Current Activity Id: {currentActivityId}</p>
      <p>{userMessage}</p>
    </div>
  )
}

export default App
