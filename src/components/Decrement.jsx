import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Control from './Control';

export default function Decrement(props) {
    const decrementId = props.activityTitle.toLowerCase() + '-decrement';
    return (
        <Control
            id={decrementId}
            clickHandler={props.clickHandler}>
            <FontAwesomeIcon 
                icon={faArrowDown}/>
        </Control>
    )
}