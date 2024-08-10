import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import Experience from './Experience.jsx';
import { Loader } from '@react-three/drei';
import { useEffect } from 'react';

const CameraControls = () => {
	const { camera } = useThree();

	const { fov, near, far, positionX, positionY, positionZ } = useControls(
		'Camera',
		{
			fov: { value: 35, min: 10, max: 100 },
			near: { value: 0.1, min: 0.01, max: 10 },
			far: { value: 200, min: 10, max: 1000 },
			positionX: { value: 3, min: -10, max: 10 },
			positionY: { value: 2, min: -10, max: 10 },
			positionZ: { value: 6, min: -10, max: 10 },
		}
	);

	useEffect(() => {
		camera.position.set(positionX, positionY, positionZ);
		camera.fov = fov;
		camera.near = near;
		camera.far = far;
		camera.updateProjectionMatrix();
	}, [camera, fov, near, far, positionX, positionY, positionZ]);

	return null;
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
	<>
		<Leva />
		<Loader />
		<Canvas
			shadows
			camera={{ position: [3, 2, 6] }} // Initial camera position
		>
			<CameraControls />
			<Experience />
		</Canvas>
	</>
);
