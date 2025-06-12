import { Avatar, Box, Heading, Image, Text, Link, Button, FormatNumber } from "@chakra-ui/react"
import type React from "react"
import { FaStar } from "react-icons/fa"



type Props = {
    title: string
    description: string
    author: { avatar: string, username: string }
    thumbnail_url: string
    price: number
    rating: number
}
const CourseCard: React.FC<Props> = ({ thumbnail_url, title, description, author, rating, price }) => {
    return (

        <Box w={"300px"} bg={"white"} shadow={"xs"} cursor={"pointer"} _hover={{scale:1.05}}  transition="scale 150ms linear" borderTopRadius={5}>

            <Image borderTopRadius={5} src={thumbnail_url} w={"full"} />

            <Box p={2}>
                <Heading my={1}>{title.slice(0, 45) + (title.length > 45 ? "..." : "")}</Heading>
                <Text color={"gray.700"} >{description.slice(0, 70) + (description.length > 70 ? "..." : "")}</Text>
                <Box my={2} display={"flex"} alignItems={"center"} gap={1}>
                    <Avatar.Root size={"xs"} variant={"subtle"}>
                        <Avatar.Image src={author.avatar} />
                        <Avatar.Fallback name={author.username} />
                    </Avatar.Root>
                    <Link href={"/"}>{author.username}</Link>

                    <Box display={"flex"} gap={1} >
                        <Text color={"gray.800"} fontWeight={"bold"}>{rating}</Text>
                        <FaStar size={15} color="#eab308" />

                    </Box>

                    <Box ms={"auto"} mr={2}>
                        <Text color={"green.600"} fontWeight={"bold"}>
                            <FormatNumber value={price} currency="EUR" style="currency" />
                        </Text>
                    </Box>


                </Box>

                <Link as={Button} colorPalette={"blue"} color={"white"} my={2} rounded={4} >Enroll</Link>

            </Box>
        </Box>
    )
}


export default CourseCard