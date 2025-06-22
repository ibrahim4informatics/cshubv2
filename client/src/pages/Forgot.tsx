import ForgotPassword from "@/forms/ForgotPassword";
import AppLayout from "@/layouts/AppLayout";
import { Box } from "@chakra-ui/react";
import React from "react";

const Forgot: React.FC = () => {
    return (

        <AppLayout>
            <Box w="full" h={"calc(100vh - 46px)"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <ForgotPassword />
            </Box>
        </AppLayout>
    )

}


export default Forgot;