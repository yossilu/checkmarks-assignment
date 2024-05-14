import { useContext } from "react";
import resourcesContext from "../contexts/Resources/ResourcesProvider";

const useResources = () => {
    return useContext(resourcesContext);
}

export default useResources;