// import {
//     Link
// } from 'react-router-dom'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
        username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                    id="username"
                />
            </div>
            <div>
        password
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                    id="password"
                />
            </div>
            <button type="submit" id="login-button">
        login
            </button>
        </form>
    )
}

export default LoginForm
