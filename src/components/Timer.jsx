import {formatTime} from '../utils/Utils.js';

export default function Timer(props) {
    const timerStyles = [
        {
            key: 'display',
            value: 'flex flex-col'
        },
        {
            key: 'border',
            value: 'border-4 border-solid border-gray-800 rounded-full'
        },
        {
            key: 'text',
            value: 'text-center'
        },
        {
            key: 'padding',
            value: 'p-8'
        }
    ].map(style => style.value).join(' ')
    return (
        <div className={`Timer ${timerStyles}`}>
            <label id="timer-label">
                {props.title}
                </label>
            <div id="time-left">
                {formatTime(props.timeLeft, 'mm:ss')}	
            </div>
        </div>
    )
}