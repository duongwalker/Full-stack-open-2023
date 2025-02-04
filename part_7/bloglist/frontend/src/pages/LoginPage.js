/* eslint-disable no-unused-vars */
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'

const LoginPage = ({
    user,
    username,
    password,
    handleLogin,
    noti,
    handleUsernameChange,
    handlePasswordChange,
}) => {
    return (
        <div>
            <h2>blogs</h2>
            <Notification noti={noti.noti} type={noti.type} />
            {!user && (
                <Togglable buttonLabel="log in">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={handleUsernameChange}
                        handlePasswordChange={handlePasswordChange}
                        handleLogin={handleLogin}
                    />
                </Togglable>
            )}
        </div>
    )
}

export default LoginPage
