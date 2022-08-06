import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRefresh, faForward } from '@fortawesome/free-solid-svg-icons';
import Control from './Control';

export default function ControlPanel(props) {
    const controlStyles = [
        {
            key: 'display',
            value: 'flex justify-center'
        },
        {
            key: 'padding',
            value: 'p-2'
        }
    ].map(style => style.value).join(' ')
    return (
        <div className={`Controls ${controlStyles}`}>
            <Control 
                id="start-stop"
                clickHandler={props.startStopHandler}>
                <FontAwesomeIcon icon={faPlay}/>
                <FontAwesomeIcon icon={faPause}/>
            </Control>
            <Control
                id="skip"
                clickHandler={props.skipHandler}>
                <FontAwesomeIcon icon={faForward}/>
            </Control>
            <Control 
                id="reset"
                clickHandler={props.resetHandler}>
                <FontAwesomeIcon icon={faRefresh}/>
            </Control>
        </div>
    )
}