import { usePathname, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import style from "../../styles/googleSignInbutton.module.css";

export default function GoogleSignInButton() {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div>
      <p className={style.textBetweenLines}>or</p>
        <a 
          className={style.googleButton}
          href={process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login/google?returnTo=" +
          encodeURIComponent(pathname + (searchParams?.get('size') ? "?" + searchParams : ""))
        }>
            <FcGoogle 
              size={"28px"}
            />
            <p className={style.googleText}>Sign in with Google</p>
        </a>
      <hr/>
    </div>
  )
}
