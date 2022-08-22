import React from "react"
import axios from "axios";
import { useState, useEffect} from 'react'
import ReactGA from "react-ga4";

const GAevent = (categoryName, eventName) => {
  ReactGA.event({       
      category: categoryName,  // Required
      action: eventName,       // Required
      label: 'labelName',       
      value: 10,       
      nonInteraction: false     
  });   
}

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

const DragDropFile = (props) => {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFileChange(e.target.files);
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };

    // fake sleep function
    const sleep = ms => new Promise(r => setTimeout(r, ms));


    const handleFileChange2 = function(e) {
      previewFile()
    }
    // uploads
    const handleFileChange = function(e) {
      props.setImageProcessing(true);
      const images = e
      const outputArray = []

      for (let i = 0; i < images.length; i++) { 
          console.log("hi")

          GAevent('User','upload_photo');
          var data = new FormData();    
          data.append('image', images[i])
      
          axios({
              method: "POST",
              url: "https://scanned-photo-split.herokuapp.com/getscans",
              data: data,
              headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                outputArray.push(response.data.images)

                if (i == (images.length)-1) {
                  props.setProcessedImages(outputArray)
                  props.setImageProcessing(false);
                  console.log(outputArray)
                }
              }).catch(function (response) {
                //handle error
                props.setImageProcessing(false);
                props.setImageFailed(true)
                console.log("error");
              });
        }
  }
    
    return (
      <form
        className="upload-container"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <i class="fa fa-download" aria-hidden="true"></i>
            <p>Select a file or drag here</p>
            <div className="upload-btn-wrapper">
              <button className="btn-upload" onClick={onButtonClick}>
                Upload scan
              </button>
            </div>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    );
  };
  
  export default DragDropFile;