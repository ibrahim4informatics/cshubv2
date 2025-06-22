import LoginForm from "@/forms/LoginForm";
import AppLayout from "@/layouts/AppLayout";
import { Box } from "@chakra-ui/react";

const Login = () => {
    return (
        <AppLayout>

            <Box w={"full"} h={"calc(100vh - 46px)"} display={"flex"} alignItems={"center"} justifyContent={"center"}>

                <LoginForm />

            </Box>
        </AppLayout>
    )
}


export default Login;