import {useSelector} from 'react-redux'

const Notification = () => {
    let notification = useSelector(notification => notification.notification);

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        display: notification ? '' : 'none'
    }

    return (
        <div style={style}>
            You voted for '{notification}'.
        </div>
    )
}

export default Notification