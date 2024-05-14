import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, ReactFlowProvider, Background } from 'react-flow-renderer';
import { 
    FaJava, 
    FaPython, 
    FaJs, 
    FaNodeJs, 
    FaDatabase, 
    FaCode, FaDocker, 
    FaAws, 
    FaMicrosoft, 
    FaGlobe, 
    FaLock,
    FaQuestion
 } from 'react-icons/fa';
import { RiDatabase2Fill, RiCloudLine } from 'react-icons/ri';
import { BiNetworkChart } from 'react-icons/bi';
import CircleNode from '../GraphUI/CircleNode/CircleNode';
import RectangleNode from '../GraphUI/RectangleNode/RectangleNode';
import './Homepage.scss';
import useGraphData from '../../hooks/useGraphData';

import cSharp from '../../assets/c-sharp.png';
import publicIcon from '../../assets/publicIcon.png';

const gridSpacing = 250;

const Homepage = () => {
    const {
        resources,
        microservices,
        getAllResources,
        getAllMicroservices,
        loadingResources,
        loadingMicroservices
    } = useGraphData();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [layout, setLayout] = useState('grid');

    const nodeTypes = useMemo(() => ({
        circle: (props) => <CircleNode {...props} layout={layout} />,
        rectangle: (props) => <RectangleNode {...props} layout={layout} />,
    }), [layout]);

    useEffect(() => {
        getAllResources();
        getAllMicroservices();
    }, [getAllResources, getAllMicroservices]);

    const gridLayout = useCallback((index, type) => {
        const columns = 4;
        const x = (index % columns) * gridSpacing;
        const y = Math.floor(index / columns) * gridSpacing + (type === 'microservice' ? 0 : gridSpacing);
        return { x, y };
    }, []);

    const hierarchicalLayout = useCallback((index, type) => {
        const y = index * gridSpacing;
        const x = type === 'microservice' ? 0 : gridSpacing;
        return { x, y };
    }, []);

    useEffect(() => {
        if (resources.length > 0 && microservices.length > 0) {
            const newNodes = [];
            const newEdges = [];

            microservices.forEach((ms, index) => {
                const icon = getLanguageIcon(ms.language);
                const position = layout === 'grid' ? gridLayout(index, 'microservice') : hierarchicalLayout(index, 'microservice');
                newNodes.push({
                    id: ms.microserviceId,
                    type: 'circle',
                    position: position,
                    data: {
                        label: (
                            <div data-tip={`Microservice: ${ms.language}`}>
                                {icon}
                                {/* <br />{ms.language} */}
                            </div>
                        )
                    }
                });
            });

            resources.forEach((resource, index) => {
                const icon = getResourceIcon(resource.type);
                const accessIcon = getAccessIcon(resource.access)
                const position = layout === 'grid' ? gridLayout(index, 'resource') : hierarchicalLayout(index, 'resource');
                newNodes.push({
                    id: resource.name,
                    type: 'rectangle',
                    position: position,
                    data: {
                        label: (
                            <div data-tip={`Resource: ${resource.name}`}>
                                {resource.name}<br />{accessIcon}<br />{icon}
                            </div>
                        )
                    }
                });

                resource.microservices.forEach(msId => {
                    newEdges.push({
                        id: `e-${resource.name}-${msId}`,
                        source: msId,
                        target: resource.name,
                        animated: true,
                        label: 'Has connection',
                        style: { stroke: '#f6ab6c' },
                        labelStyle: { fill: '#000', fontWeight: 700 },
                    });
                });
            });

            setNodes(newNodes);
            setEdges(newEdges);
        }
    }, [resources, microservices, gridLayout, hierarchicalLayout, layout]);

    useEffect(() => {
        const handleWheelEvent = (event) => {
        };

        window.addEventListener('wheel', handleWheelEvent, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheelEvent);
        };
    }, []);


    if (loadingResources || loadingMicroservices) return <div>Loading...</div>;
    if (!resources.length || !microservices.length) return <div>No data available</div>;

    const nodeClassName = (node) => node.type;

    return (
        <div className='homepage-main'>
            <div className="layout-buttons">
                <button onClick={() => setLayout('grid')}>Grid Layout</button>
                <button onClick={() => setLayout('hierarchical')}>Hierarchical Layout</button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                panOnScroll={true}
                panOnScrollMode="free"
            >
                <MiniMap zoomable pannable nodeClassName={nodeClassName} />
                <Controls />
                <Background color="#aaa" gap={16} />

            </ReactFlow>
        </div>
    );
}

const getAccessIcon = (access) => {
    switch (access) {
        case 'public':
            return <FaGlobe style={{ color: 'green' }} />;
        case 'private':
            return <FaLock style={{ color: 'red' }} />;
        case 'unknown':
        default:
            return <FaQuestion style={{ color: 'grey' }} />;
    }
};

const getLanguageIcon = (language) => {
    switch (language) {
        case 'Java': return <FaJava />;
        case 'Python': return <FaPython />;
        case 'JavaScript': return <FaJs />;
        case 'NodeJS': return <FaNodeJs />;
        case 'Docker': return <FaDocker />;
        case 'Csharp': return <img alt='c-sharp' className='lang-icon' src={cSharp}/>;
        default: return <FaCode />;
    }
}

const getResourceIcon = (type) => {
    switch (type) {
        case 'aws_mq_broker': return <BiNetworkChart />;
        case 'aws_elasticache_cluster': return <RiCloudLine />;
        case 'aws_rds_instance': return <RiDatabase2Fill />;
        case 'database': return <FaDatabase />;
        case 'aws_s3_bucket': return <FaAws />;
        default: return <FaCode />;
    }
}

function HomePageWithProvider(props) {
    return (
        <ReactFlowProvider>
            <Homepage {...props} />
        </ReactFlowProvider>
    );
}

export default HomePageWithProvider;
