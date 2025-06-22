import CourseSection from "@/components/custom/CourseSection";
import AppLayout from "@/layouts/AppLayout";
import { Box, Button, Container, FormatNumber, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaCartPlus, FaPlay, FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const SingleCourse = () => {

    const { id } = useParams();
    const [course, setCourse] = useState(
        {
            title: "Nestjs For Beginners:Ultimate Guide For Building Modern Web Solutions",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, perspiciatis dicta ex nam aliquam saepe ab impedit esse molestias vel sunt facilis amet quisquam maxime dolore obcaecati? Molestias unde sapiente quis modi ad sed labore blanditiis itaque obcaecati. Sed assumenda amet harum repudiandae a, incidunt aperiam natus id ut ab nihil velit necessitatibus magni eligendi vitae dolorem blanditiis commodi, veniam aspernatur, dolore sit modi. Corrupti mollitia iure numquam ad repellat, obcaecati dignissimos enim maiores temporibus nam ipsam necessitatibus voluptatum veniam in, vel quasi placeat ratione voluptatem consectetur error aspernatur, quisquam eligendi. Dignissimos architecto laudantium doloremque aliquid labore necessitatibus. Ipsam nam minus explicabo doloribus? Perferendis debitis error rerum maiores corporis quasi, doloribus deserunt autem totam sint fugit molestias, placeat quisquam voluptates illum accusamus recusandae architecto ad incidunt. Saepe nemo amet officia totam ad molestiae debitis, incidunt accusantium, enim iusto nam assumenda magnam! Iste obcaecati officiis doloremque aut fuga, ducimus, nostrum quas nihil accusantium quos quibusdam, veniam ipsum alias. Facere inventore odio architecto nisi, tempore commodi sit iste nam esse dignissimos vel modi eveniet dolores culpa molestiae exercitationem beatae illum! Assumenda nesciunt adipisci culpa dicta, explicabo distinctio nisi velit voluptates ea accusantium nam minus cupiditate ut neque sunt. Officiis incidunt dicta odit sequi quo exercitationem placeat mollitia necessitatibus a sunt alias quasi explicabo optio beatae est voluptate labore animi saepe, maiores provident quae ex? Ea recusandae ullam ipsam itaque voluptate ab cupiditate quibusdam illo, consequatur magnam eum voluptatum rem voluptatem omnis explicabo aut odio hic rerum repellendus. Quas iure laborum nam fuga reiciendis ab magnam temporibus consequatur eveniet qui voluptates explicabo cupiditate deleniti, neque, exercitationem minima corrupti ratione unde numquam molestias necessitatibus nesciunt maiores. Hic recusandae atque minus iusto tempora est similique, soluta architecto, doloremque cum vel, nihil delectus tempore vero exercitationem quidem illum reiciendis dolorum officia culpa. Dolor vel reiciendis, delectus, est quibusdam odio labore qui sapiente debitis totam et blanditiis nesciunt aliquid quis voluptate deserunt itaque modi neque. Praesentium, officiis. Modi magnam quibusdam est facere consequuntur. Libero et sed excepturi porro aliquid, aperiam distinctio itaque laborum modi molestias voluptate eum tempora doloribus nisi quas ea nostrum. Commodi laudantium distinctio cumque reprehenderit! Eum asperiores, quas recusandae modi corrupti maiores explicabo eligendi a possimus! Fugiat praesentium dolor nihil nobis amet necessitatibus rem ipsam consequuntur cumque deleniti ducimus, exercitationem explicabo harum consectetur ratione eveniet placeat, velit alias iste, hic veritatis quia. Eaque exercitationem, ducimus error officiis eius sunt itaque maxime doloribus voluptatum. Sunt sint ipsam officia quisquam aperiam ab! Voluptatibus harum perspiciatis nulla officiis dicta impedit recusandae adipisci aut! Velit natus, error suscipit omnis quibusdam deserunt unde id placeat repudiandae odio optio quas at expedita dolor assumenda ipsum illum doloribus facilis eum rerum nesciunt voluptatem. Ipsa repellendus eveniet quasi quaerat cumque, sapiente reiciendis perspiciatis corporis officia nemo perferendis nam impedit eligendi necessitatibus? Sunt, inventore. Esse, sequi magnam ipsa quasi voluptas tempora omnis fugit corporis dolorem quidem similique tempore facere natus et veniam. Aperiam veniam sed quisquam id, ab accusamus nisi inventore consequatur dolor minima vel ex neque modi excepturi, dolore dolorem non, illo blanditiis? Quisquam, nulla asperiores. Voluptatem qui incidunt corrupti voluptatum maiores, id iste doloribus inventore, pariatur reprehenderit laboriosam vel ex vero ab? Sunt hic cumque quod quaerat at, nam obcaecati nisi, quae quibusdam itaque aliquid, ut exercitationem! Molestiae sequi vel enim fuga illum eum earum distinctio cumque atque labore quam eius consequuntur dolorem laudantium esse, aut alias voluptate reiciendis, odit quod error obcaecati porro sunt voluptatibus. Recusandae laudantium praesentium similique eum cupiditate nostrum itaque velit doloribus repellat quod fugit, harum temporibus amet animi porro dolorem nam est modi iste? Explicabo reprehenderit assumenda veritatis aut perspiciatis amet incidunt possimus magni ut quaerat!",
            author: {
                username: "Ibrahim",
                avatar: null
            },

            rating: 4,
            price: 300,
            sections: 40,


        }
    )


    return (
        <AppLayout>


            <Box width={"100%"} bg={"gray.900"} p={8} color={"white"} position={"sticky"} top={0} left={0} zIndex={2000}>
                <Heading size={"4xl"}>{course.title} {id}</Heading>
                <Box display={"flex"} alignItems={"center"} gap={2} my={4}>
                    <Text fontSize={"xl"} color={"gray.300"}>{course.rating}</Text>
                    <FaStar color="#EAB308" size={20} />
                    <Text fontSize={"xl"}>32000 students</Text>
                    <Text fontSize={"xl"}>{course.sections} Section</Text>
                    <Text fontSize={"xl"} color={"green.400"} fontWeight={"bold"}><FormatNumber style="currency" currency="EUR" value={course.price} /></Text>
                </Box>

                <Box my={2} display={"flex"} alignItems={"center"} gap={4} flexWrap={"wrap"}>
                    <Button colorPalette={"blue"} size={"xl"}><FaCartPlus /> Add To Cart</Button>
                    <Button colorPalette={"teal"} size={"xl"}><FaBookmark />Add To Wishlist</Button>
                    <Button colorPalette={"red"} size={"xl"}><FaBookmark />Remove From Wishlist</Button>
                    <Button colorPalette={"green"} size={"xl"}><FaPlay />Start Course</Button>
                </Box>
            </Box>

            <Container my={4}>
                <Heading fontSize={"2xl"} color={"blue.700"} fontWeight={"extrabold"}>Course Description</Heading>
                <Text>{course.description}</Text>

                <Heading fontSize={"2xl"} color={"blue.700"} fontWeight={"extrabold"} my={4}>Course Content</Heading>
                <Box as={"ol"} listStyle={"numerique"} py={0} px={6} color={"gray.800"} fontWeight={"bold"}>
                    <li>What is NestJS and why use it?</li>
                    <li>Installing NestJS CLI</li>
                    <li>Project Structure Overview</li>
                    <li>Creating your first NestJS app</li>
                    <li>Creating Controllers</li>
                    <li>Route Parameters and Query Strings</li>
                    <li>HTTP Methods (GET, POST, PUT, DELETE)</li>
                    <li>Request and Response Objects</li>
                    <li>Understanding Providers</li>
                    <li>Creating and Injecting Services</li>
                    <li>Scopes: Default, Request, and Transient</li>
                    <li>What are Modules in NestJS?</li>
                    <li>Feature Modules and Shared Modules</li>
                    <li>Global Modules</li>
                    <li>Using TypeORM with NestJS</li>
                    <li>Connecting to PostgreSQL/MySQL</li>
                    <li>Entities and Repositories</li>
                    <li>Database CRUD Operations</li>
                    <li>What are DTOs and Why Use Them?</li>
                    <li>Creating and Validating DTOs</li>
                    <li>Class-validator and class-transformer</li>
                    <li>Introduction to Pipes</li>
                    <li>Built-in and Custom Pipes</li>
                    <li>Exception Handling in NestJS</li>
                    <li>Custom Exceptions and Filters</li>
                    <li>Middleware in NestJS</li>
                    <li>Guards and Role-Based Access</li>
                    <li>Authentication with JWT</li>
                    <li>Using Passport Strategies</li>
                    <li>Working with Interceptors</li>
                    <li>Logging and Monitoring</li>
                    <li>Introduction to WebSockets</li>
                    <li>Real-time Communication with Gateway</li>
                    <li>Testing with Jest in NestJS</li>
                    <li>Unit and E2E Testing Basics</li>
                    <li>Configuration and Environment Variables</li>
                    <li>Deploying NestJS to Production</li>
                </Box>
                <Heading fontSize={"2xl"} color={"blue.700"} fontWeight={"extrabold"} my={4}>Course Requirements</Heading>
                <Box as={"ol"} listStyle={"numerique"} py={0} px={6} color={"gray.800"} fontWeight={"bold"}>
                    <li>Basic knowledge of JavaScript or TypeScript</li>
                    <li>Familiarity with Node.js and npm</li>
                    <li>Understanding of REST APIs and HTTP methods</li>
                    <li>Basic experience with Express.js (helpful but not required)</li>
                    <li>A code editor like VS Code installed</li>
                    <li>Node.js (v14 or higher) installed on your system</li>
                    <li>Basic command line (CLI) usage skills</li>
                    <li>Internet connection for installing packages and dependencies</li>
                    <li>Optional: PostgreSQL or MySQL installed for database modules</li>
                </Box>

                <CourseSection/>
            </Container>

        </AppLayout>
    )
}


export default SingleCourse;