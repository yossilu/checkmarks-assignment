import { useContext } from "react";
import MicroservicesContext from "../contexts/Microservices/MicroservicesProvider";

const useMicroservices = () => {
    return useContext(MicroservicesContext);
}

export default useMicroservices;