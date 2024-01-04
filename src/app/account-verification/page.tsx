import { verifyUser } from "@/network/services/UserService";
import { NotFoundError } from "@/network/http-errors";
import { notFound } from "next/navigation";
import { BsCheckCircleFill } from "react-icons/bs"
import style from "./page.module.css";
import { User } from "@/models/user";
import { Spinner } from "@/components/bootstrap";
import RedirectButton from "@/components/RedirectButton";

interface PageProps{
    searchParams: { 
        userId: string
        verificationCode: string 
    }
}

export default async function Page({ searchParams: { userId, verificationCode }}: PageProps){

    let user: User;
    try {
        user = await verifyUser(userId, verificationCode);
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