import React from "react";
import './Register.css';
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
    return(
        <section className="register">
            <Logo />
            <h1 className="register__title">Добро пожаловать!</h1>
            <AuthForm
                formType="registration"
                buttonText="Зарегистрироваться"
                text="Уже зарегистрированы? "
                linkText="Войти"
                link="/signin"
            />
        </section>
    )
}

export default Register;