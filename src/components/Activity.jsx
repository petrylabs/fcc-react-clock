
import ActivityControls from './ActivityControls'

export default function Activity(props) {
    const {title} = props;
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
    ].map(style => style.value).join(' ');
    const labelId = props.title.toLowerCase() + '-label';
    return (
        <div className={`Activity ${activityStyles}`}>
            <label 
                id={labelId}
                className='text-center'>
                {`${props.title} Length:`}
            </label>
            <ActivityControls
                acitivityTitle={props.title}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                length={props.length}/>
        </div>
    )
}