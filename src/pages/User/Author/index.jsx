import { useContext } from "react"
import { isHomeContext } from "../../../utils/context"


function Author() {
    
    const {setIsHome} = useContext(isHomeContext)
    setIsHome(false)

    return(
        <div>page de listing des auteurs</div>
    )
}

export default Author