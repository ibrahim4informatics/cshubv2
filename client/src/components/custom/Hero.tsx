import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import heroJpg from "../../assets/hero.jpg";

const Hero = () => {
    return (
        <Box pos={"relative"} width={"100%"} height={{ base: "calc(100dvh - 56px)", lg: "calc(100vh - 46px)" }} p={8} display={"flex"}  justifyContent={"center"} flexDir={"column"} gap={4}>
            <Heading size={{ base: "3xl", lg: "6xl" }} color={"gray.800"} w={'100%'} maxW={"650px"} textAlign={"left"}>
                Welcome To <span style={{ color: "#2563EB" }}>CSHUB</span> Plateform
            </Heading>
            <Text w={"full"} maxW={"650px"} textAlign={"left"} color={"gray.700"}>
                Welcome to your go-to companion for computer science studies. No more wasting time searching through endless forums or heavy research. Here, you’ll find everything you need in one place—lecture notes, exam guides, project ideas, and more—fast and organized.
                Built for students by students, it’s all about learning smarter and saving time. If this resource helps you, consider making a small donation to keep it free and growing for others like you.
            </Text>
            <Image pos={"absolute"} top={0} left={0} src={heroJpg} width={"100%"} height={"100%"} zIndex={-2} />
            <Box pos={"absolute"} top={0} left={0} bg={"rgba(252,252,252,.7)"} w={"100%"} height={"100%"} zIndex={-1}></Box>
            <Box display={"flex"} alignItems={"center"} gap={4}>
                <Button colorPalette={"blue"}>Courses</Button>
                <Button variant={"ghost"}>Profile</Button>
            </Box>
        </Box>
    )
}

export default Hero;