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
    ].map(style => style.value).join('');
    const activityLengthId = props.acitivityTitle.toLowerCase() + '-length';
    return (
        <div className={`ActivityControls ${activityControlsStyles}`}>
            <Decrement 
                activityTitle={props.acitivityTitle}
                clickHandler={props.decrementHandler}/>
            <span
                id={activityLengthId}>
                {formatTime(props.length)}
            </span>
            <Increment
                activityTitle={props.acitivityTitle}
                clickHandler={props.incrementHandler}/>
        </div>
    )
}