import React from "react"
import axios from "axios";
import { useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import { about } from '../../portfolio'
import { autocropper } from '../../portfolio'
import './Upload.css'
import DragDropFile from "./DragDropFile";
import Preview from "./Preview";

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

const Upload = () => {
  const { title, description, subhead, socidal } = autocropper

  const [imageProcessing, setImageProcessing] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [processedImages, setProcessedImages] = useState(null)
  // const [inputImage, setInputImage] = useState(null)

if (!imageProcessing && !imageFailed && !processedImages) {
  return (

    <div className='about center'>
      <h1> {title} </h1>
      <h2 className='about__role'>{subhead} </h2>
      <p className='about__desc'>{description && description}</p>
      <DragDropFile setImageProcessing={setImageProcessing} setProcessedImages={setProcessedImages} setImageFailed={setImageFailed}/>
      {/* <Preview processedImages={processedImages} /> */}
    </div>
  )
} else if (imageProcessing) {
    return (

      <div className='about center'>
      <h1> {title} </h1>
      <h2 className='about__role'>{subhead} </h2>
      <p className='about__desc'>{description && description}</p>

      <div className="upload-container">
          <div id="label-file-upload">
            <i class="fa fa-download" aria-hidden="true"></i>
            <div className="upload-btn-wrapper">
            <div align="center" className='output-container-detail-loading'>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            </div>
          </div>
      </div>

    </div>
    )
} else if (imageFailed) {
    return (
        <div className='about center'>
      <h1> {title} </h1>
        <h2 className='about__role'>upload failed... insert try again button </h2>
      </div>         
    )
} else if (processedImages){
    return (
    <div className='about center'>
      <h1> {title} </h1>
      <h2 className='about__role'>{subhead} </h2>
      <p className='about__desc'>{description && description}</p>
      <DragDropFile setImageProcessing={setImageProcessing} setProcessedImages={setProcessedImages} setImageFailed={setImageFailed}/>

    <h2 className='about__role'> {processedImages.length} images found </h2>

    <div>
    {processedImages.map(test => {
                console.log("yoyoyoyo")
                        return (

    <section className='output-container'>
        <div className='output-container-detail'>
            <div className="row">
                {test.map(item => {
                        return (
                            <div className="method-col">
                                <img src={item} alt="" />
                                <a className="download-image-button" href={`${item}`} download="output.jpg"><button >Download</button></a>
                            </div>
                            
                            )
                    })}
            </div>
        </div>
    </section>
                        ) })}
    </div>

  </div>       
    )
} else {
    <h1>unsure how you got here</h1>
}
}

export default Upload
