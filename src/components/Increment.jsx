import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Control from './Control';

export default function Increment(props) {
    return (
        <Control 
            id={props.id}
            clickHandler={props.clickHandler}>
            <FontAwesomeIcon 
                icon={faArrowUp}/>
        </Control>
    )
}