import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Control from './Control';

export default function Increment(props) {
    const incrementId = props.activityTitle.toLowerCase() + '-increment';
    return (
        <Control 
            id={incrementId}
            clickHandler={props.clickHandler}>
            <FontAwesomeIcon 
                icon={faArrowUp}/>
        </Control>
    )
}