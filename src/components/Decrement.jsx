import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Control from './Control';
export default function Decrement(props) {
    return (
        <Control
            id={props.id}
            clickHandler={props.clickHandler}>
            <FontAwesomeIcon 
                icon={faArrowDown}/>
        </Control>
    )
}