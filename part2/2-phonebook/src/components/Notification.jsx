const Notification = ({ message }) => {


    return (
        <div className="notification-container">
            {message && (
                <div className="notification">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Notification;