
const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    const notificationStyles = {
        background: '#c1c7c3',
        border: '2px solid green',
        borderRadius: '10px',
        color: 'green',
        fontSize: '24px'
    }
    
    return (
        <div style={notificationStyles}>{message}</div>
    )
}

export default Notification