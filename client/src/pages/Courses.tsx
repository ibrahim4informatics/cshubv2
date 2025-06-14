import CourseCard from "@/components/custom/CourseCard";
import Filters from "@/components/custom/Filters";
import AppLayout from "@/layouts/AppLayout"
import { Box, ButtonGroup, Heading, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

const Courses = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <AppLayout>
            <Filters />

            <Heading textAlign={"center"} color={"blue.700"} my={4} size={"3xl"}>Our Courses</Heading>

            <Box p={4} w={"full"} maxW={1024} mx={"auto"} display={"grid"} placeItems={"center"} gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gapY={4}>

                <CourseCard
                id={1}
                    title="Nest js Beginner:The Ultimate Guide to Modern Web Solutions"
                    author={{
                        avatar: "",
                        username: "ibrahim"
                    }}
                    description="Master backend development with NestJS, a powerful Node.js framework built with TypeScript. This course guides you through building efficient, scalable server-side applications using modern architectural patterns. You'll learn about modules, controllers, services, dependency injection, middleware, and working with databases. Whether you're building RESTful APIs or microservices, this course provides the tools and best practices you need. Ideal for developers looking to advance their Node.js and TypeScript skills with real-world projects and hands-on examples."
                    price={120}
                    rating={3.5}
                    thumbnail_url="https://i.ytimg.com/vi/juNVinepwKA/maxresdefault.jpg"
                />


                <CourseCard
                    id={2}
                    title="Nest js Beginner:The Ultimate Guide to Modern Web Solutions"
                    author={{
                        avatar: "",
                        username: "ibrahim"
                    }}
                    description="Master backend development with NestJS, a powerful Node.js framework built with TypeScript. This course guides you through building efficient, scalable server-side applications using modern architectural patterns. You'll learn about modules, controllers, services, dependency injection, middleware, and working with databases. Whether you're building RESTful APIs or microservices, this course provides the tools and best practices you need. Ideal for developers looking to advance their Node.js and TypeScript skills with real-world projects and hands-on examples."
                    price={120}
                    rating={3.5}
                    thumbnail_url="https://i.ytimg.com/vi/juNVinepwKA/maxresdefault.jpg"
                />


                <CourseCard
                id={3}
                    title="Nest js Beginner:The Ultimate Guide to Modern Web Solutions"
                    author={{
                        avatar: "",
                        username: "ibrahim"
                    }}
                    description="Master backend development with NestJS, a powerful Node.js framework built with TypeScript. This course guides you through building efficient, scalable server-side applications using modern architectural patterns. You'll learn about modules, controllers, services, dependency injection, middleware, and working with databases. Whether you're building RESTful APIs or microservices, this course provides the tools and best practices you need. Ideal for developers looking to advance their Node.js and TypeScript skills with real-world projects and hands-on examples."
                    price={120}
                    rating={3.5}
                    thumbnail_url="https://i.ytimg.com/vi/juNVinepwKA/maxresdefault.jpg"
                />


                <CourseCard
                    id={4}
                    title="Nest js Beginner:The Ultimate Guide to Modern Web Solutions"
                    author={{
                        avatar: "",
                        username: "ibrahim"
                    }}
                    description="Master backend development with NestJS, a powerful Node.js framework built with TypeScript. This course guides you through building efficient, scalable server-side applications using modern architectural patterns. You'll learn about modules, controllers, services, dependency injection, middleware, and working with databases. Whether you're building RESTful APIs or microservices, this course provides the tools and best practices you need. Ideal for developers looking to advance their Node.js and TypeScript skills with real-world projects and hands-on examples."
                    price={120}
                    rating={3.5}
                    thumbnail_url="https://i.ytimg.com/vi/juNVinepwKA/maxresdefault.jpg"
                />

            </Box>


            <Box w={"full"} maxW={1024} mx={'auto'} py={4}>
                <Pagination.Root count={400} pageSize={10} defaultPage={Number.parseInt(searchParams.get("page") || "1")}>
                    <ButtonGroup variant="ghost" size={"md"}>
                        <Pagination.PrevTrigger asChild>
                            <IconButton onClick={() => {
                                searchParams.set("page", (Number.parseInt(searchParams.get("page") || "1") - 1).toString());
                                setSearchParams(searchParams);
                            }}>
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => {
                                    searchParams.set("page", page.value.toString())
                                    setSearchParams(searchParams);
                                }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton onClick={() => {

                                searchParams.set("page", (Number.parseInt(searchParams.get("page") || "1") + 1).toString());
                                setSearchParams(searchParams);
                            }}>
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </Box>




        </AppLayout>
    )

}

export default Courses;
