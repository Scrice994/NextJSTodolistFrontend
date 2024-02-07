"use client"
import { Spinner } from "@/components/bootstrap";
import RedirectButton from "@/components/utils/RedirectButton";
import { useVerifyUserQuery } from "@/lib/features/api/userSlice";
import { notFound } from "next/navigation";
import { BsCheckCircleFill } from "react-icons/bs";
import style from "./page.module.css";

interface PageProps{
    searchParams: { 
        userId: string
        verificationCode: string 
    }
}

export default function Page({ searchParams: { userId, verificationCode }}: PageProps){
    const { data, isLoading, error } = useVerifyUserQuery({ userId, verificationCode });

    if(isLoading) return <Spinner />

    if(error){
        notFound();
    }

    if(data){
        return (
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
        )
    }

    return(<></>);
}