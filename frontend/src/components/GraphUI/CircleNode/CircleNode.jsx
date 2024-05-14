import React from 'react';
import { Handle } from 'react-flow-renderer';

const CircleNode = ({ data, layout }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#ADD8E6',
        borderRadius: '50%',
        border: '2px solid #333',
        color: '#333',
        padding: '10px',
        textAlign: 'center',
    }}>
        {layout !== 'grid' &&<Handle type="target" position="left" style={{ borderRadius: 10 }} />}
        {layout === 'grid' && <Handle type="target" position="top" style={{ borderRadius: 10 }} />}
        {layout === 'grid' && <Handle type="source" position="bottom" style={{ borderRadius: 10 }} />}
        {layout !== 'grid' && <Handle type="source" position="right" style={{ borderRadius: 10 }} />}
        {data.label}
    </div>
);

export default CircleNode;
