import React from "react"
import axios from "axios";
import { useState, useEffect} from 'react'

const Preview = (props) => {
  React.useEffect(() => {
    
    console.log("yoo")
  }, [props.processedImages]);

    return (

    <div>
    {props.processedImages.map(test => {
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

      // <div className="upload-container">
      //     <div id="label-file-upload">
      //       <i class="fa fa-download" aria-hidden="true"></i>
      //       <div className="upload-btn-wrapper">
      //       <img src="" height="200" alt="Image preview..."></img>
      //       </div>
      //     </div>
      // </div>
    );
  };
  
  export default Preview;