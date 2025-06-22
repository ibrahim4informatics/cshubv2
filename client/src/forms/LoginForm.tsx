import { Box, Button, Heading, Text, Field, Input, InputGroup, IconButton } from "@chakra-ui/react";
import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle, FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { loginUser } from "@/services/auth";

const shcema = z.object({
    email: z.string().email({ message: "email is not valid" }),
    password: z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),

})

const LoginForm: React.FC = () => {
    const [passwordHidden, setPasswordHidden] = useState<boolean>(false);
    const navigate = useNavigate();



    const { register, formState: { isSubmitting, errors }, handleSubmit, setError } = useForm({ resolver: zodResolver(shcema) });
    const submitFnc: SubmitHandler<any> = async (data) => {

        const promise = loginUser(data);
        promise.then(() => {
            return navigate("/profile")
        })
            .catch(() => {
                setError("email", { message: "invalid email or password" });
                setError("password", { message: "invalid email or password" });
                return;
            })
        return promise;
    }


    return (

        <Box w={"full"} maxW={"620px"} rounded={3} p={4} shadow={"md"} as={"form"}>
            <Heading size={"2xl"} color={"blue.600"}>Login To Your Account!</Heading>
            <Text my={2} color={"gray.500"} fontSize={"sm"}>get linked to your account to start taking free courses and regain your progress you can register if youre new <Text as={"span"} display={"inline"} color={"blue.400"} fontWeight={"bold"}> <Link to={"/register"}>Here</Link></Text></Text>


            <Heading textAlign={"center"} my={2} fontWeight={"bold"} size={"md"}>Continue With</Heading>
            <Box w={"full"} display={"flex"} alignItems={"center"} gap={2} flexWrap={"wrap"}>
                <Button display={"flex"} alignItems={"center"} justifyContent={"center"} p={4} variant={"ghost"} my={4} colorPalette={"yellow"} shadow={"md"} size={"lg"} rounded={6} flex={1} gap={4}><FaGoogle color="#CA8A04" /> Google Login</Button>
                <Button display={"flex"} alignItems={"center"} justifyContent={"center"} p={4} variant={"ghost"} my={4} colorPalette={"gray"} shadow={"md"} size={"lg"} rounded={6} flex={1} gap={4}><FaGithub /> Github Login</Button>
            </Box>

            <Heading textAlign={"center"} my={2} fontWeight={"bold"} size={"md"}>Or</Heading>

            <Field.Root my={2} required invalid={errors.email?.message ? true : false} >
                <Field.Label>Email</Field.Label>
                <InputGroup colorPalette={"blue"} startElement={<MdOutlineAlternateEmail />}>
                    <Input {...register("email")} type="email" />
                </InputGroup>

                <Box display={errors.email?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Box>
            </Field.Root>



            <Field.Root my={2} required invalid={errors.password?.message ? true : false} >
                <Field.Label>Password</Field.Label>
                <InputGroup colorPalette={"blue"} endElementProps={{ margin: 0, padding: 0 }} endElement={<IconButton variant={"plain"} onClick={() => { setPasswordHidden(prev => !prev) }}>{passwordHidden ? <IoMdEye /> : <IoEyeOff />}</IconButton>} startElement={<FaLock />}>
                    <Input {...register("password")} type={passwordHidden ? "password" : "text"} />
                </InputGroup>


                <Box display={errors.password?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Box>
            </Field.Root>

            <Text color={"blue.400"}> <Link to={"/forgot"}>Forgot Password?</Link> </Text>

            <Button disabled={isSubmitting} loading={isSubmitting} onClick={handleSubmit(submitFnc)} w={"full"} size={"lg"} colorPalette={"blue"} my={4}>Login</Button>



        </Box>
    )
}

export default LoginForm