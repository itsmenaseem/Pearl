import React, { useState, useRef, useEffect } from 'react';
import './Projectile.css';

function Projectile() {
    const canvasRef = useRef(null);
    const [gravity, setGravity] = useState(9.8);
    const [speed, setSpeed] = useState(60);
    const [angle, setAngle] = useState(45);
    const [height, setHeight] = useState(6);
    const [distance, setDistance] = useState(0);
    const [simulation, setSimulation] = useState(null);
    const [trajectory, setTrajectory] = useState([]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const drawCannon = (angle) => {
            ctx.save();
            ctx.translate(50, canvasRef.current.height - 50);
            ctx.rotate(-angle);
            ctx.fillStyle = '#333';
            ctx.fillRect(0, -10, 50, 20);  // Cannon barrel
            ctx.restore();

            // Cannon base
            ctx.beginPath();
            ctx.arc(50, canvasRef.current.height - 50, 20, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawTrajectory = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawCannon(angle * Math.PI / 180);

            // Draw the trajectory path
            ctx.beginPath();
            ctx.moveTo(50, canvasRef.current.height - height - 50);
            trajectory.forEach((pos) => {
                ctx.lineTo(50 + pos.x, canvasRef.current.height - pos.y - 50);
            });
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            // Draw the projectile
            ctx.beginPath();
            ctx.arc(50 + trajectory[trajectory.length - 1]?.x || 0, canvasRef.current.height - (trajectory[trajectory.length - 1]?.y || 0) - 50, 5, 0, Math.PI * 2);
            ctx.fill();
        };

        if (simulation) {
            const interval = setInterval(() => {
                const t = trajectory.length * 0.05;
                const v0x = speed * Math.cos(angle * Math.PI / 180);
                const v0y = speed * Math.sin(angle * Math.PI / 180);
                const x = v0x * t;
                const y = height + v0y * t - 0.5 * gravity * t * t;

                if (y <= 0) {
                    clearInterval(interval);
                    setDistance(Math.round(x));
                    return;
                }

                setTrajectory((prev) => [...prev, { x, y }]);
                drawTrajectory();
            }, 20);

            return () => clearInterval(interval);
        }
    }, [simulation, trajectory, angle, speed, height, gravity]);

    const handleLaunch = () => {
        setTrajectory([]);
        setDistance(0);
        setSimulation(true);
    };

    const handleClear = () => {
        setSimulation(false);
        setTrajectory([]);
        setDistance(0);
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    return (
        <div className="App mt-10">
            <div className="controls">
                <div className="slider">
                    <label htmlFor="gravity">Gravity:</label>
                    <input
                        type="range"
                        id="gravity"
                        min="1"
                        max="20"
                        value={gravity}
                        onChange={(e) => setGravity(parseFloat(e.target.value))}
                    />
                    <span>{gravity}</span> m/s²
                </div>
                <div className="slider">
                    <label htmlFor="speed">Speed:</label>
                    <input
                        type="range"
                        id="speed"
                        min="10"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    />
                    <span>{speed}</span> m/s
                </div>
                <div className="slider">
                    <label htmlFor="angle">Angle:</label>
                    <input
                        type="number"
                        id="angle"
                        value={angle}
                        onChange={(e) => setAngle(parseFloat(e.target.value))}
                    /> °
                </div>
                <div className="slider">
                    <label htmlFor="height">Height:</label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value))}
                    /> m
                </div>
                <div>
                    <button id="launch" onClick={handleLaunch}>Launch</button>
                    <button id="clear" onClick={handleClear}>Clear</button>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width="800"
                height="400"
                style={{
                    border: '2px solid #333',
                    backgroundColor: '#fff',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}
                className='mx-auto'
            ></canvas>

            <div className="distance-display text-center">
                Distance Traveled: <span>{distance}</span> m
            </div>
        </div>
    );
}

export default Projectile;