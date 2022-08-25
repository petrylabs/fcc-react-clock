import Activity from "./Activity"

export default function ActivitiesPane(props) {

    const activitiesPaneStyles = [
        {
            key: 'display',
            value: 'flex flex-row justify-center'
        }
    ].map(style => style.value).join(' ')
    
    return (
        <div 
            className={`ActivitiesPane ${activitiesPaneStyles}`}>
            {props.activities.length > 0 && props.activities.map((activity, index) => (
                <Activity
                    key={`activity-${index}`}
                    incrementHandler={props.incrementHandler}
                    decrementHandler={props.decrementHandler}
                    title={activity.title}
                    length={activity.duration}
                />
            ))}
        </div>
    )
}