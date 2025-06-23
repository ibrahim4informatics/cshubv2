import RegisterForm from '@/forms/RegisterForm'
import AppLayout from '@/layouts/AppLayout'
import { Box } from '@chakra-ui/react'

const Register = () => {
    return (
        <AppLayout>
            <Box w={"full"} h={"calc(100vh - 55px)"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <RegisterForm />
            </Box>
        </AppLayout>
    )
}

export default Register