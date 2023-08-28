
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'


//use the config to set up the URl from the back end 
import config from '../config/config'
import state from '../store'
import { download, logoShirt, stylishShirt } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'
import { fadeAnimation, slideAnimation } from '../config/motion'

const Constomizer = () => {
    const snap = useSnapshot(state)
    // show tab content depending on the active tab 

    const [file, setFile] = useState("");
    const [prompt, setPrompt] = useState("");

    const [generatingImg, setGenerateingImg] = useState("");
    const [activeEditorTab, setActiveEditorTab] = useState("")
    const [activeFilterTab, setActiveFilterTab] = useState(

        {
            logoShirt: true,
            stylishShirt: false,
        }

    );

    //show tab content depending on the acitveTab 
    const generateTabContent = () => {

        switch (activeEditorTab) {

            case "colorpicker":
                return <ColorPicker/>
            case "filepicker":
                return <FilePicker 
                file = {file}
                setFile={setFile}
                readFile = {readFile}/>
            case "aipicker":
                return <AIPicker
                prompt = {prompt}
                setPrompt ={setPrompt}
                generatingImg = {generatingImg}
                handleSubmit ={handleSubmit} />
            default:
                return null;
        }

    }

    const handleSubmit = async (type) => {

        if(!prompt ) return alert ("please enter a prompt");
        
        try{
            //generate the Ai
            setGenerateingImg(true);

            const response = await fetch ("http://localhost:8080/api/v1/dalle", {

                method: 'POST',
                headers :{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json();
            handleDecals(type, `data:image/png; base64, ${data.photo}`)

        }catch(error){
            alter(error)
        }finally{
            setGenerateingImg(false);
            setActiveEditorTab("");
        }

    }


    const handleDecals = (type, result) =>{

        const decalType = DecalTypes[type];

        //decalType.stateProperty returns fulldecal or logodecal 
        //result is the path to the image. we use state to udpates that
        state[decalType.stateProperty] =result;

        if(!activeFilterTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab);
        }

    }


    const handleActiveFilterTab = (tabName) => {
        switch (tabName){

            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];

            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
        }

        //after setting the state, activeFilterTab to update the UI
        setActiveFilterTab((prevState) => {
            return {
                //spread the prevState
                ...prevState,
                //updates the tabName to its opposite
                [tabName] :!prevState [tabName]

            }

        })
    }
    //read file 

    const readFile = (type) => {
        reader(file)
        .then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("")
        })

    }
    return (
        <AnimatePresence>
            {/* if not at the home page*/}
            {!snap.intro && (
                <>
                    <motion.div key="custom"
                        className='absolute top-0 left-0 z-10'
                        {...slideAnimation('left')}>
                        <div className='flex items-center min-h-screen'>
                            <div className='editortabs-container tabs'>

                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name) && console.log()}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className='absolute z-10 top-5 right-5'
                        {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title="Go back"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
                    </motion.div>


                    <motion.div className="filtertabs-container"
                        {...slideAnimation('up')}>
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab=""
                                handleClick={() => {handleActiveFilterTab(tab.name) }} />
                        ))}
                    </motion.div>
                </>
            )}


        </AnimatePresence>
    )
}

export default Constomizer
