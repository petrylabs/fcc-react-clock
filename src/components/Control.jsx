export default function Control(props) {
    const timerControlStyles = [
        {
            key: 'background',
            value: 'bg-transparent'
        },
        {
            key: 'border',
            value: 'border-none hover:border-none focus:border-none'
        },
        {
            key: 'outline',
            value: 'outline-none hover:outline-none focus:outline-none'
        },
        {
            key: 'padding',
            value: 'p-2'	
        }
    ].map(style => style.value).join(' ')
    return(
        <button 
            id={props.id}
            className={`TimerControl ${timerControlStyles}`}
            onClick={props.clickHandler}>
            {props.children}
        </button>
    )
}