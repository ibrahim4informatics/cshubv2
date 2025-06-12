import { Box, Button, Heading, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { CiMenuFries } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <Box position={"sticky"} top={0} left={0} zIndex={400}  width={"100%"} py={2} px={3} bg={"white"} shadow={"sm"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Heading color={"blue.600"}>CSHUB</Heading>
            {/* urls for large screens */}
            <Box color={"black"} display={{ base: "none", lg: "flex" }} alignItems={"center"} gap={2}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/"}>Courses</NavLink>
                <NavLink to={"/"}>Login</NavLink>
                <NavLink to={"/"}>Register</NavLink>
                <NavLink to={"/"}>Profile</NavLink>
                <NavLink to={"/"}>Dashboard</NavLink>
                <NavLink to={"/"}>Logout</NavLink>
            </Box>
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <Button display={{ base: "block", lg: "none" }} variant={"ghost"} onClick={() => console.log("open menu")}>
                        <CiMenuFries />
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Context>
                                {() => (
                                    <Drawer.Body pt="6" spaceY="3">
                                        <Heading>
                                            Menu
                                        </Heading>

                                        <Box>
                                            <Box my={2}><NavLink to={"/"}>Home</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Documents</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Login</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Register</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Profile</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Dashboard</NavLink></Box>
                                            <Box my={2}><NavLink to={"/"}>Logout</NavLink></Box>
                                        </Box>
                                    </Drawer.Body>
                                )}
                            </Drawer.Context>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>

        </Box>
    )
}

export default Navbar;