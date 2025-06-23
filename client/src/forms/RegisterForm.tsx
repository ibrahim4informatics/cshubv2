import { useState } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, createListCollection, Field, Heading, IconButton, Input, InputGroup, Portal, Select, Text, Textarea } from '@chakra-ui/react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { IoEyeOff } from 'react-icons/io5';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/auth';
import { Toaster, toaster } from '@/components/ui/toaster';

const RegisterForm = () => {
    const schema = z.object({
        first_name: z.string().min(5, { message: "the first name should contain at least 5 chars" }).max(35, { message: "the first name is too long" }),
        last_name: z.string().min(5, { message: "the last name should contain at least 5 chars" }).max(35, { message: "the last name is too long" }),
        bio: z.string().min(10, { message: "the bio is too short" }).max(500, { message: "bio is too long" }).optional(),
        email: z.string().email({ message: "email is not valid" }),
        password: z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),
        confirm: z.string(),
        role: z.enum(["STUDENT", "INSTRUCTOR"]).optional()
    }).refine((data) => data.password === data.confirm, {
        path: ["confirm"],
        message: "password doesn't match"
    })

    type FormFields = z.infer<typeof schema>;
    const [passwordHidden, setPasswordHidden] = useState(false);
    const roles = createListCollection({
        items: [
            { label: "Student", value: "STUDENT" },
            { label: "Instructor", value: "INSTRUCTOR" },
        ]
    })

    const { control, register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(schema) });

    const navigation = useNavigate();
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        const promise = registerUser(data);

        promise.then(res => {

            console.log(res);

        }).catch(err => {
            if (err === 400) {
                setError("email", { message: "email is already in use" });
                return;
            }

            else {
                setError("root", { message: "Internal Error Try Again Later" });
                return;
            }
        })

        toaster.promise(promise, {
            success: {
                title: "User Register Success",
                description: "your account created just now",
                closable: true,
                action: {
                    label: "Login",
                    onClick: () => navigation("/login")
                }
            },


            loading: {
                title: "Please Wait!",
                description: "creating your account in a moment",
                closable: false
            },

            error: {
                title: "User Register Fails",
                description: "the account is not created to a problems with your request",
                closable: true
            }
        })
        return promise;
    }

    return (
        <Box w={"full"} maxW={"650px"} as={"form"} shadow={"md"} p={4} rounded={4} h={"80%"} overflowY={"auto"}>
            <Heading as={"h3"} size={"2xl"} fontWeight={"bold"} color={"blue.600"}>Create An Account For Free!</Heading>
            <Box w={"full"} my={2} pt={4} display={"flex"} gap={2}>
                <Field.Root invalid={errors.first_name?.message ? true : false} required>
                    <Field.Label>First Name <Field.RequiredIndicator /></Field.Label>
                    <Input {...register("first_name")} type='text' size={"lg"} colorPalette={"blue"} />

                    {errors.first_name?.message && <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Field.ErrorIcon color={"red.400"} size={"sm"} />
                        <Text color={"red.400"} fontSize={"sm"}>{errors.first_name?.message}</Text>
                    </Box>}
                </Field.Root>


                <Field.Root invalid={errors.last_name?.message ? true : false} required>
                    <Field.Label>Last Name <Field.RequiredIndicator /></Field.Label>
                    <Input {...register("last_name")} type='text' size={"lg"} colorPalette={"blue"} />

                    {errors.last_name?.message && <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Field.ErrorIcon color={"red.400"} size={"sm"} />
                        <Text color={"red.400"} fontSize={"sm"}>{errors.last_name?.message}</Text>
                    </Box>}
                </Field.Root>
            </Box>


            <Field.Root my={2} pt={4} invalid={errors.bio?.message ? true : false} >
                <Field.Label>Bio</Field.Label>
                <Textarea {...register("bio")} colorPalette={"blue"} size={"lg"} />

                {errors.bio?.message && <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Field.ErrorIcon color={"red.400"} size={"sm"} />
                    <Text color={"red.400"} fontSize={"sm"}>{errors.bio?.message}</Text>
                </Box>}
            </Field.Root>

            <Field.Root my={4} invalid={errors.role?.message ? true : false}>

                <Controller name='role' control={control} render={({ field }) => {
                    return (
                        <Select.Root name={field.name} onValueChange={({ value }) => field.onChange(value[0])} onInteractOutside={() => field.onBlur()} collection={roles} size="sm" width="320px">
                            <Select.HiddenSelect />
                            <Select.Label>Role <Field.RequiredIndicator /></Select.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select Role" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {roles.items.map((role) => (
                                            <Select.Item item={role} key={role.value}>
                                                {role.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>

                    )
                }} />

                <Box display={errors.role?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
                </Box>

            </Field.Root>

            <Field.Root my={2} required invalid={errors.email?.message ? true : false} >
                <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                <InputGroup colorPalette={"blue"} startElement={<MdOutlineAlternateEmail />}>
                    <Input {...register("email")} type="email" />
                </InputGroup>

                <Box display={errors.email?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Box>
            </Field.Root>



            <Field.Root my={2} required invalid={errors.password?.message ? true : false} >
                <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
                <InputGroup colorPalette={"blue"} endElementProps={{ margin: 0, padding: 0 }} endElement={<IconButton variant={"plain"} onClick={() => { setPasswordHidden(prev => !prev) }}>{passwordHidden ? <IoMdEye /> : <IoEyeOff />}</IconButton>} startElement={<FaLock />}>
                    <Input {...register("password")} type={passwordHidden ? "password" : "text"} />
                </InputGroup>


                <Box display={errors.password?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Box>
            </Field.Root>




            <Field.Root my={2} required invalid={errors.confirm?.message ? true : false} >
                <Field.Label>Confirm Password <Field.RequiredIndicator /></Field.Label>
                <InputGroup colorPalette={"blue"} endElementProps={{ margin: 0, padding: 0 }} endElement={<IconButton variant={"plain"} onClick={() => { setPasswordHidden(prev => !prev) }}>{passwordHidden ? <IoMdEye /> : <IoEyeOff />}</IconButton>} startElement={<FaLock />}>
                    <Input {...register("confirm")} type={passwordHidden ? "password" : "text"} />
                </InputGroup>


                <Box display={errors.confirm?.message ? "flex" : "none"} alignItems={"center"} gap={2}>
                    <Field.ErrorIcon w={3} h={3} color={"red.600"} />
                    <Field.ErrorText>{errors.confirm?.message}</Field.ErrorText>
                </Box>
            </Field.Root>

            <Text fontSize={"sm"} color={"gray.400"}>Already have an account <Text color={"blue.600"} fontWeight={"bold"} as={"span"}><Link to={"/login"}>Login Here</Link></Text></Text>
            <Button colorPalette={"blue"} my={4} size={"lg"} w={'full'} onClick={handleSubmit(onSubmit)}>Create Now</Button>

            <Toaster />
        </Box>
    )
}

export default RegisterForm