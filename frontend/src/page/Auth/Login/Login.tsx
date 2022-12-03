import Link from "next/link";
import type {FC} from "react";
import { ToastContainer as AlertContainer } from "react-toastify";
import {ROUTES} from "src/constants";
import classes from "./Login.module.scss";

export const Login: FC = () => {
    return (
        <section className={classes.Login}>
            <AlertContainer />
            <div className={classes.SectionCenter}>
                <div className={classes.SectionCenter_Content}>
                    <h1 className={classes.SectionCenterContent_Title}>Вход</h1>
                    <form>Форма</form>
                    <div className={classes.SectionCenter_Registration}>
                        <span>Нет аккаунта?</span>
                        <Link href={ROUTES.REGISTRATION}>
                            <span>Зарегистрироваться</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}