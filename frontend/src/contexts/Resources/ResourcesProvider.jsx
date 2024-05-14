import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


const ResourcesContext = createContext({});

const SET_RESOURCES = 'SET_RESOURCES';
const UPDATE_RESOURCE = 'UPDATE_RESOURCE';

const resourcesReducer = (state, action) => {
    switch (action.type) {
        case SET_RESOURCES:
            return [...action.payload];
        case UPDATE_RESOURCE:
            return state.map(resource => 
                resource.id === action.payload.id ? { ...resource, ...action.payload } : resource
            );
        default:
            return state;
    }
}
export const ResourcesProvider = ({ children }) => {
    const [resources, dispatch] = useReducer(resourcesReducer, []);
    const [isLoading, setIsLoading] = useState(false);

    const getAllResources = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/resources/getAll`);
            dispatch({ type: SET_RESOURCES, payload: response.data.resources });
        } catch (error) {
            console.error("Error fetching resources", error);
        } finally {
            setIsLoading(false);
        }
    }, [axios]);
    
    

    const contextValue = useMemo(() => ({
        resources,
        getAllResources,
        isLoadingResources: isLoading
    }), [resources, getAllResources, isLoading]);

    return (
        <ResourcesContext.Provider value={contextValue}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourcesContext;
