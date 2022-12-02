import Link from "next/link";
import type {FC} from "react";
import { ToastContainer as AlertContainer } from "react-toastify";
import {ROUTES} from "src/constants";
import {Button} from "src/uikit";
import classes from "./Registration.module.scss";

export const Registration: FC = () => {
    return (
        <section className={classes.Registration}>
            <AlertContainer />
            <div className={classes.SectionCenter}>
                <div className={classes.SectionCenter_Content}>
                    <h1 className={classes.SectionCenterContent_Title}>Регистрация</h1>
                    <form>
                        Форма
                        <div className={classes.FormFieldGroup}></div>
                        <div className={classes.SectionCenter_Control}>
                            <Button
                                className={classes.SectionCenter_Button}
                                type="submit"
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                    <div className={classes.SectionCenter_Registration}>
                        <span>Есть аккаунт?</span>
                        <Link href={ROUTES.LOGIN}>
                            <span>Войти</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}