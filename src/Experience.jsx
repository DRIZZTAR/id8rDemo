import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
	Center,
	Environment,
	OrbitControls,
	Text3D,
	MeshReflectorMaterial,
} from '@react-three/drei';
import { useControls } from 'leva';
import ThreePanelDisplay from './components/ThreePanelDisplay.jsx';

export default function Experience() {
	const groupRef = useRef();

	// Leva controls for environment properties
	const { environmentPreset, titleText } = useControls('Controls', {
		environmentPreset: {
			value: 'apartment',
			options: [
				'forest',
				'city',
				'sunset',
				'night',
				'studio',
				'warehouse',
				'apartment',
				'lobby',
			],
		},
		titleText: { value: 'DIOR' },
	});

	useFrame((state, delta) => {
		// Custom animations or camera control logic can go here
	});

	return (
		<>
			<OrbitControls makeDefault enableDamping />
			<directionalLight
				position={[-3, 4, 8]}
				intensity={2.5}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-bias={-0.001}
			/>
			<ambientLight intensity={1.5} />
			<Environment background preset={environmentPreset} />
			<group ref={groupRef}>
				<Center position={[-0.0, 1.3, 0]} scale={0.45}>
					<Text3D
						letterSpacing={1}
						font='https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'
					>
						{titleText}
						<meshStandardMaterial
							color='black'
							metalness={1.0}
							roughness={0.0}
							
						/>
					</Text3D>
				</Center>
				{/* ThreePanelDisplay with Images */}
				<ThreePanelDisplay />
			</group>
			{/* Floor */}
			<mesh
				position={[0, 0, -3]}
				rotation-x={-Math.PI * 2}
				scale={10}
				receiveShadow
			>
				<planeGeometry />
				<MeshReflectorMaterial
					blur={[2560, 1080]} // Blur ground reflections (width, height), 0 skips blur
					mixBlur={1} // How much blur mixes with surface roughness (default = 1)
					mixStrength={1} // Strength of the reflections
					mixContrast={1} // Contrast of the reflections
					resolution={2056} // Off-buffer resolution, lower=faster, higher=better quality, slower
					mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
					minDepthThreshold={0} // Lower edge for the depthTexture interpolation (default = 0)
					maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
					depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
					reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
				/>
			</mesh>
		</>
	);
}
