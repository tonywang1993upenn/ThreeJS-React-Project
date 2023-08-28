import React from 'react'

import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store';

const Shirt = () => {

    //get the original state from 
    const snap = useSnapshot(state);

    //get the 3d file 

    const { nodes, materials } = useGLTF('./shirt_baked.glb');

    //get the name of files 
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
    
    //create the stat of current state
    const stateString = JSON.stringify(snap);

    return (
        <group
        key ={stateString}>
            <mesh
                castShadow
                /** */
                geometry={nodes.T_Shirt_male.geometry}

                /*material used for the shirt*/
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >

                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}

                {snap.isLogoTexture && (
                    <Decal
                        position = {[0, 0.04, 0.15]}
                        rotation = {[0, 0, 0]}
                        scale ={0.15}
                        map = {logoTexture}
                        //map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}

            </mesh>
        </group>
    )
}

export default Shirt
