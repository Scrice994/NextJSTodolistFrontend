import { ReactNode } from "react";
import { ButtonProps } from "react-bootstrap";
import { Spinner } from "@/components/bootstrap";

interface LoadingButtonProps{
    isLoading: boolean
    children: ReactNode
    style?: string
}

const LoadingButton = ({ isLoading, children, style, ...props }: LoadingButtonProps & ButtonProps) => {
  return (
    <button 
        {...props}
        disabled={isLoading}
        className={style}
    >
    {isLoading &&
        <>
            <Spinner 
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            {" "}
        </> 
    }
        {children}
    </button>
  )
}

export default LoadingButton;
