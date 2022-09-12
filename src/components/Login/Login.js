import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo/Logo";
import './Login.css';

function Login() {
    return(
        <section className="login">
            <Logo />
            <h1 className="login__title">Рады видеть!</h1>
            <AuthForm
                formType="login"
                buttonText="Войти"
                text="Ещё не зарегистрированы? "
                linkText="Регистрация"
                link="/signup"
            />
        </section>
    )
}

export default Login;