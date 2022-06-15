const Notification = ({ type, message }) => {
    if(message === null) {
        return null
    } 

    // success notification
    else if(type === 'success') {
        return(
            <div className='success'>{message}</div>
        )
    // error notification
    } else if(type === 'error') {
        return(
            <div className='error'>{message}</div>
        )
    // type not specified
    } else {
        return null
    }
}

export default Notification