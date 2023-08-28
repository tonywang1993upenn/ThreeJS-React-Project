import React from 'react'
import CustomButton from "./CustomButton"


const AIPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {
  
  
  
  return (
    <div className="aipicker-container">
    <textarea
      placeholder='Ask Ai...'
      row ={5}
      value ={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className = "aipicker-txtarea"
      />

      <div className='flex flex-wrap gap-3'>
      {generatingImg? (
        <CustomButton
          type = "outline"
          title = "asking AI..."
          customStyles = "text-xs"
      />
      ) : //if not
      (<>
        <CustomButton 
          type = "outline"
          title = "AI logo"
          handleClick = {() => handleSubmit('logo')}
          customStyles = "text-xs"
        />
          <CustomButton 
          type = "filled"
          title = "AI full"
          handleClick = {() => handleSubmit('full')}
          customStyles = "text-xs"
        />
      </>)
      }
      </div>
    </div>
  )
}

export default AIPicker
