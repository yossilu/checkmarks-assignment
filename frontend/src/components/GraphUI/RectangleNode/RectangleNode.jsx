import React from 'react';
import { Handle } from 'react-flow-renderer';

const RectangleNode = ({ data, layout }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 'auto',
        backgroundColor: '#90EE90',
        border: '2px solid #333',
        color: '#333',
        padding: '10px',
        textAlign: 'center',
    }}>
        {layout !== 'grid' && <Handle type="target" position="left" style={{ borderRadius: 10 }} />}
        {layout === 'grid' && <Handle type="target" position="top" style={{ borderRadius: 10 }} />}
        {layout === 'grid' && <Handle type="source" position="bottom" style={{ borderRadius: 10 }} />}
        {layout !== 'grid' && <Handle type="source" position="right" style={{ borderRadius: 10 }} />}
        {data.label}
    </div>
);

export default RectangleNode;
