import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


const MicroservicesContext = createContext({});

const SET_MICROSERVICES = 'SET_MICROSERVICES';
const UPDATE_MICROSERVICE = 'UPDATE_MICROSERVICE';

const microservicesReducer = (state, action) => {
    switch (action.type) {
        case SET_MICROSERVICES:
            return [...action.payload];
        case UPDATE_MICROSERVICE:
            return state.map(microservice => 
                microservice.id === action.payload.id ? { ...microservice, ...action.payload } : microservice
            );
        default:
            return state;
    }
}
export const MicroservicesProvider = ({ children }) => {
    const [microservices, dispatch] = useReducer(microservicesReducer, []);
    const [isLoading, setIsLoading] = useState(false);

    const getAllMicroservices = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/microservices/getAll`);
            dispatch({ type: SET_MICROSERVICES, payload: response.data.microservices });
        } catch (error) {
            console.error("Error fetching microservices", error);
        } finally {
            setIsLoading(false);
        }
    }, [axios]);
    
    

    const contextValue = useMemo(() => ({
        microservices,
        getAllMicroservices,
        isLoadingMicroservices: isLoading
    }), [microservices, getAllMicroservices, isLoading]);

    return (
        <MicroservicesContext.Provider value={contextValue}>
            {children}
        </MicroservicesContext.Provider>
    );
}

export default MicroservicesContext;
