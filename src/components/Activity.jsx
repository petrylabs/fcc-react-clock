
import ActivityControls from './ActivityControls'

export default function Activity(props) {
    const incrementHandler = () => {
        props.incrementHandler(props.title);
    }
    const decrementHandler = () => {
        props.decrementHandler(props.title);
    }
    const activityStyles = [
        {
            key: 'display',
            value: 'flex flex-col'
        },
        {
            key: 'padding',
            value: 'p-2'
        }
    ].map(style => style.value).join(' ')
    return (
        <div className={`Activity ${activityStyles}`}>
            <label 
                className='text-center'>
                {`${props.title} Length:`}
            </label>
            <ActivityControls
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                length={props.length}/>
        </div>
    )
}