import { changePassword, checkValidOtp, resetPasswordOtpSender } from "@/services/auth";
import { Box, Button, Field, Heading, Input, InputGroup, PinInput, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { z } from "zod";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";




const SendOtpForm: React.FC<{ disabled: boolean, setIsOtpSent: React.Dispatch<React.SetStateAction<boolean>>, setEmail: React.Dispatch<React.SetStateAction<string>> }> = ({ disabled, setIsOtpSent, setEmail }) => {

    const shcema = z.object({
        email: z.string().email(),
    })

    const { register, formState: { isSubmitting, errors }, handleSubmit, setError } = useForm({ resolver: zodResolver(shcema) });

    const onSubmit: SubmitHandler<any> = (data) => {
        const promise = resetPasswordOtpSender(data);

        promise.then((res: any) => {
            if (res.status === 200) {
                setEmail(data.email);
                setIsOtpSent(true);
            }
        })

            .catch((err: any) => {
                if (err.status === 404) {

                    setError("email", { message: "email does not belongs to any user!" });

                }

                else {
                    setError("root", { message: "Otp was not sent due to internal problem" })
                }
            })
        return promise;
    }

    return (
        <Field.Root my={4} required invalid={errors.email?.message ? true : false} disabled={disabled}>
            {errors.root?.message && <Text color={"red.600"} my={2}>{errors.root.message}</Text>}
            <Field.Label>Email</Field.Label>
            <InputGroup endElementProps={{ margin: 0, padding: 0 }} colorPalette={"blue"} startElement={<MdOutlineAlternateEmail />} endElement={<Button loading={isSubmitting} disabled={disabled || isSubmitting} onClick={handleSubmit(onSubmit)} colorPalette={"blue"}>Send Verification Code</Button>} >
                <Input {...register("email")} type="email" />
            </InputGroup>

            <Box display={errors.email?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Box>
        </Field.Root>
    )

}


const VerifyOtpForm: React.FC<{ disabled: boolean, email: string, setIsOtpVerified: React.Dispatch<React.SetStateAction<boolean>>, setOtp: React.Dispatch<React.SetStateAction<string>> }> = ({ disabled, email, setIsOtpVerified, setOtp }) => {

    const schema = z.object({
        code: z
            .array(z.string().min(1), { required_error: "Pin is required" })
            .length(4, { message: "Pin must be 4 digits long" })
    }
    )
    const { control, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm({ resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<any> = (data) => {
        const d = { email, code: data.code.join("") };
        const promise = checkValidOtp(d);
        promise.then((res: any) => {
            if (res.status === 200) {
                setOtp(d.code);
                setIsOtpVerified(true);
            }
        }).catch(err => {
            if (err.status === 401) {
                setError("code", { message: "invalid otp" })
            }
        })
        return promise;

    }
    return (

        <Field.Root invalid={errors.code?.message ? true : false} my={4} disabled={disabled}>
            <Field.Label>Code</Field.Label>

            <Box display={"flex"} alignItems={"center"} gap={2}>

                <Controller control={control} name="code" render={({ field }) => {

                    return (
                        <PinInput.Root value={field.value} onValueChange={(e) => field.onChange(e.value)} disabled={disabled || isSubmitting} type="numeric">
                            <PinInput.HiddenInput />
                            <PinInput.Control>
                                <PinInput.Input index={0} />
                                <PinInput.Input index={1} />
                                <PinInput.Input index={2} />
                                <PinInput.Input index={3} />
                            </PinInput.Control>
                        </PinInput.Root>
                    )

                }} />
                <Button disabled={disabled || isSubmitting} loading={isSubmitting} colorPalette={"blue"} onClick={handleSubmit(onSubmit)}>Verify</Button>
            </Box>

            <Box display={errors.code?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                <Field.ErrorText>{errors.code?.message}</Field.ErrorText>
            </Box>


        </Field.Root>
    )
}


const ChangePassword: React.FC<{ email: string, otp: string }> = ({ otp, email }) => {
    const navigation = useNavigate();

    const schema = z.object({
        new_password: z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),
        confirm_new_password: z.string(),

    }).refine(data => data.new_password === data.confirm_new_password, { message: "the passwords does not match", path: ["confirm_new_password"] });

    type Fields = z.infer<typeof schema>;

    const { register, formState: { isSubmitting, errors }, handleSubmit } = useForm({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<Fields> = async (data) => {
        const d = { ...data, email, otp };
        const promise = changePassword(d);

        toaster.promise(promise, {
            success: {
                title: "Password Reset Done",
                description: "your password changed successfully",
                closable: true,
                action: {
                    label: "Login Now",
                    onClick: () => navigation("/login")
                },
                duration: 2000
            },
            error: {
                title: "Paassword Reset Fails",
                description: "the password is not changed due to server or otp validity",
                duration: 2000,
                closable: true
            },
            loading: {
                title: "Please Wait.",
                description: "Changing password now!",
                closable: false
            }
        })



        return promise;
    }
    return (
        <>
            <Toaster />
            <Field.Root my={4} required invalid={errors.new_password?.message ? true : false} disabled={isSubmitting}>
                <Field.Label>New Password</Field.Label>
                <InputGroup colorPalette={"blue"} startElement={<FaLock />} >
                    <Input {...register("new_password")} type="password" />
                </InputGroup>

                <Box display={errors.new_password?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.new_password?.message}</Field.ErrorText>
                </Box>
            </Field.Root>

            <Field.Root my={4} required invalid={errors.confirm_new_password?.message ? true : false} disabled={isSubmitting} >
                <Field.Label>Confirm New Password</Field.Label>
                <InputGroup colorPalette={"blue"} startElement={<FaLock />} >
                    <Input {...register("confirm_new_password")} type="password" />
                </InputGroup>

                <Box display={errors.confirm_new_password?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.confirm_new_password?.message}</Field.ErrorText>
                </Box>
            </Field.Root>

            <Button my={2} colorPalette={"gray"} variant={"ghost"} size={"lg"} w={"full"}>Send Code Again</Button>
            <Button colorPalette={"blue"} size={"lg"} w={"full"} disabled={isSubmitting} onClick={handleSubmit(onSubmit)} loading={isSubmitting}>Change Password</Button></>
    )
}
const ForgotPassword = () => {


    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");


    return (
        <Box as={"form"} w={"full"} maxW={"600px"} shadow={"md"} rounded={4} p={4}>

            <Heading color={"blue.600"} size={"2xl"} fontWeight={"bold"}>Forgot Your Password!</Heading>

            <SendOtpForm setEmail={setEmail} disabled={isOtpSent} setIsOtpSent={setIsOtpSent} />



            {isOtpSent &&
                <VerifyOtpForm setIsOtpVerified={setIsOtpVerified} email={email} disabled={isOtpVerified} setOtp={setOtp} />
            }


            {isOtpSent && isOtpVerified && <ChangePassword email={email} otp={otp} />
            }


        </Box>
    )
}


export default ForgotPassword;