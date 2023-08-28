import React from 'react'
import state from '../store/index'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from 'react-color/lib/helpers/color'

const CustomButton = ({ type, title, customStyles, handleClick }) => {

    const snap = useSnapshot(state)
    const generateStyle = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        }else if(type === "outline"){
            return{
                borderWidth: "1px",
                borderColor: snap.color,
                color:snap.color,

            }
        }
    }

    return (

        // px -2 padding horizontal direction left-right by 
        //1=0.5rem = 4px
        <button className={`px-2 py-1.5 flex-1 
        rounded-md ${customStyles}`}
        style={generateStyle(type)}
        onClick = {handleClick}
        > {title}
        </button>
    )
}

export default CustomButton
