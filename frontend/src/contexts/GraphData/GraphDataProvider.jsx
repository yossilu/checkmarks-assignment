import { createContext, useReducer, useMemo, useCallback, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

const GraphDataContext = createContext({});

// Define action types
const SET_RESOURCES = 'SET_RESOURCES';
const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
const SET_MICROSERVICES = 'SET_MICROSERVICES';
const UPDATE_MICROSERVICE = 'UPDATE_MICROSERVICE';

// Define combined reducer
const graphReducer = (state, action) => {
    switch (action.type) {
        case SET_RESOURCES:
            return { ...state, resources: [...action.payload] };
        case UPDATE_RESOURCE:
            return {
                ...state,
                resources: state.resources.map(resource => 
                    resource.id === action.payload.id ? { ...resource, ...action.payload } : resource
                )
            };
        case SET_MICROSERVICES:
            return { ...state, microservices: [...action.payload] };
        case UPDATE_MICROSERVICE:
            return {
                ...state,
                microservices: state.microservices.map(microservice => 
                    microservice.id === action.payload.id ? { ...microservice, ...action.payload } : microservice
                )
            };
        default:
            return state;
    }
}

export const GraphDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(graphReducer, { resources: [], microservices: [] });
    const [loadingResources, setLoadingResources] = useState(false);
    const [loadingMicroservices, setLoadingMicroservices] = useState(false);

    const getAllResources = useCallback(async () => {
        setLoadingResources(true);
        try {
            const response = await axios.get(`${BASE_URL}/resources/getAll`);
            dispatch({ type: SET_RESOURCES, payload: response.data.resources });
        } catch (error) {
            console.error("Error fetching resources", error);
        } finally {
            setLoadingResources(false);
        }
    }, []);

    const getAllMicroservices = useCallback(async () => {
        setLoadingMicroservices(true);
        try {
            const response = await axios.get(`${BASE_URL}/microservices/getAll`);
            dispatch({ type: SET_MICROSERVICES, payload: response.data.microservices });
        } catch (error) {
            console.error("Error fetching microservices", error);
        } finally {
            setLoadingMicroservices(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        resources: state.resources,
        microservices: state.microservices,
        getAllResources,
        getAllMicroservices,
        loadingResources,
        loadingMicroservices,
    }), [
        state.resources,
        state.microservices,
        getAllResources,
        getAllMicroservices,
        loadingResources,
        loadingMicroservices
    ]);

    return (
        <GraphDataContext.Provider value={contextValue}>
            {children}
        </GraphDataContext.Provider>
    );
}

export default GraphDataContext;
