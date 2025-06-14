import { Box } from "@chakra-ui/react"
import type React from "react"

type Props= {

}


const CourseSection:React.FC<Props> = ()=>{
    return (
        <Box>
            <div dangerouslySetInnerHTML={{__html:"<strong>HI</strong>"}}></div>
        </Box>
    )
}

export default CourseSection;