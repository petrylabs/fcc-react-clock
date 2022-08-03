import Decrement from './Decrement'
import Increment from './Increment'

import {formatTime} from '../utils/Utils.js';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';

export default function ActivityControls(props) {
    const activityControlsStyles = [    
        {
            key: 'display',
            value: 'flex flex-row justify-center items-baseline'
        }
    ].map(style => style.value).join('')
    return (
        <div className={`ActivityControls ${activityControlsStyles}`}>
            <Decrement 
                clickHandler={props.decrementHandler}/>
            <span>
                {formatTime(props.length)}
            </span>
            <Increment
                clickHandler={props.incrementHandler}/>
        </div>
    )
}