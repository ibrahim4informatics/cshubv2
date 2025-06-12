import { Box, Input, InputGroup, Drawer, CloseButton, Portal, Button, Heading, NativeSelect } from "@chakra-ui/react";
import { useState } from "react";
import { CiFilter, CiSearch, CiStar } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchParams, setSearhParams] = useSearchParams();
    const [filters, setFilters] = useState({
        search: searchParams.get("search") || "",
        type: searchParams.get("type") || "",
        category: searchParams.get("category") || "",
        lang: searchParams.get("lang") || "",
        min: searchParams.get("min") || "",
        max: searchParams.get("max") || "",
        rating: searchParams.get("rating") || ""
    })
    const submitFilter = () => {
        const keys = Object.keys(filters) as (keyof typeof filters)[];
        keys.forEach(key => {
            if (filters[key]) {
                searchParams.set(key, filters[key]);
            }
        })
        setSearhParams(searchParams);
        setOpen(false);
    }
    return (
        <Box w={"100%"} maxW={"720px"} mx={"auto"} my={2} py={4} px={2} display={"flex"} alignItems={"center"} gap={4} >

            <InputGroup colorPalette={"blue"} endElement={<Button onClick={submitFilter} variant={"surface"} borderLeftRadius={0} colorPalette={"blue"} color={"gray.700"}><CiSearch /></Button>} endElementProps={{ margin: 0, padding: 0 }}>
                <Input value={filters.search} onChange={(e) => setFilters(prev => { return { ...prev, search: e.target.value } })} size={"lg"} placeholder={"type some title."} />

            </InputGroup>


            <Drawer.Root open={open} onOpenChange={(e) => { setOpen(e.open) }}>
                <Drawer.Trigger asChild>
                    <Button variant="outline" size="lg">
                        <CiFilter />
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Context>
                                {() =>
                                    <Drawer.Body pt="6" spaceY="3">
                                        <Heading>Filters</Heading>

                                        <Box w={"100%"} p={3} display={"flex"} flexDir={"column"} gap={4}>



                                            <NativeSelect.Root my={4} colorPalette={"black"}>
                                                <NativeSelect.Field value={filters.type} placeholder="Select Type." onChange={(e) => { setFilters((prev) => { return { ...prev, type: e.target.value } }) }}>
                                                    <option value="">All</option>
                                                    <option value="free">Free</option>
                                                    <option value="paid">Paid</option>
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>



                                            <NativeSelect.Root my={4} colorPalette={"black"}>
                                                <NativeSelect.Field value={filters.category} onChange={(e) => { setFilters((prev) => { return { ...prev, category: e.target.value } }) }} placeholder="Select Category.">
                                                    <option value="">All</option>
                                                    <option value="ai">Ai</option>
                                                    <option value="web">Web Development</option>
                                                    <option value="android">Android Development</option>
                                                    <option value="iphone">IOS Development</option>
                                                    <option value="corss">Mobile Development</option>
                                                    <option value="os">Operating System</option>
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>


                                            <NativeSelect.Root my={4} colorPalette={"black"}>
                                                <NativeSelect.Field value={filters.lang} placeholder="Select Language." onChange={(e) => { setFilters(prev => { return { ...prev, lang: e.target.value } }) }}>
                                                    <option value="">All</option>
                                                    <option value="en">English</option>
                                                    <option value="fr">French</option>
                                                    <option value="ar">Arabic</option>
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>


                                            <InputGroup startAddon="€" my={4}>
                                                <Input type="number" value={filters.min} onChange={(e) => { setFilters((prev) => { return { ...prev, min: e.target.value } }) }} placeholder="minimum price." />
                                            </InputGroup>



                                            <InputGroup startAddon="€" my={4}>
                                                <Input type="number" value={filters.max} onChange={(e) => { setFilters((prev) => { return { ...prev, max: e.target.value } }) }} placeholder="maximum price." />
                                            </InputGroup>


                                            <InputGroup startElement={<Box display={"flex"} alignItems={"center"} gap={1}>{filters.rating || 0} <CiStar color="orange" size={20} /></Box>} my={4}>
                                                <Input value={filters.rating} onChange={(e) => setFilters(prev => { return { ...prev, rating: e.target.value } })} type="range" min={0} max={5} placeholder="Rating." />
                                            </InputGroup>


                                        </Box>


                                        <Button colorPalette={"blue"} w={"full"} onClick={submitFilter}>Filter</Button>
                                    </Drawer.Body>
                                }
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

export default Filters;