import Navbar from "@/components/custom/Navbar";
import  React from "react";

type Props= {
    children:React.ReactNode
}



const AppLayout:React.FC<Props> =  ({children}) =>{
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default AppLayout