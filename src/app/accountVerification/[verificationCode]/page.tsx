import { verifyUser } from "@/network/api/users";
import { NotFoundError } from "@/network/http-errors";
import { notFound } from "next/navigation";
import { BsCheckCircleFill } from "react-icons/bs"
import style from "./page.module.css";
import { User } from "@/models/user";
import { Spinner } from "@/components/bootstrap";
import RedirectButton from "@/components/RedirectButton";

interface PageProps{
    params: { verificationCode: string }
}

export default async function Page({ params: { verificationCode }}: PageProps){
    console.log(verificationCode);
    let user: User;
    try {
        user = await verifyUser(verificationCode);
        console.log(user);
    } catch (error) {
        if(error instanceof NotFoundError){
            notFound();
        } else {
            throw error;
        }
    }

    if(!user) return <Spinner />

    return(
        <div className={style.canvas}>
            <div className={style.container}>
                <BsCheckCircleFill size={100} className={style.icon}/>
                <h1>Verified!</h1>
                <p>You have successfully verified your acoount.</p>
                <RedirectButton className={style.button}>
                    Return to App
                </RedirectButton>
            </div>
        </div>
    );
}