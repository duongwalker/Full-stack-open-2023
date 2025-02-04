const Notification = ({ noti, type }) => {
    if (noti === null) {
        return null
    } else {
        return <div className={type}>{noti}</div>
    }
}

export default Notification
