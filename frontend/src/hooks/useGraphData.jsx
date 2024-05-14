import { useContext } from "react";
import GraphDataContext from "../contexts/GraphData/GraphDataProvider";

const useGraphData = () => {
    return useContext(GraphDataContext);
}

export default useGraphData;