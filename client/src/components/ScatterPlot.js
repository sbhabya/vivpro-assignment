import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { title, danceability } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
                <p>{`Title: ${title}`}</p>
                <p>{`Danceability: ${danceability}`}</p>
            </div>
        );
    }
    return null;
};

const ScatterPlot = ({ chartdata }) => {
    return (
        <ScatterChart width={300} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="index" />
            <YAxis type="number" dataKey="danceability" />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={chartdata} fill="green" />
        </ScatterChart>
    );
}

export default ScatterPlot;
