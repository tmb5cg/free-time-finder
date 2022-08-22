import React from "react"
import axios from "axios";
import { useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import { about } from '../../portfolio'
import { autobid } from '../../portfolio'
import './Autobidder.css'


const Autobidder = () => {
  const { title, description, subhead, socidal } = autobid

  const [imageProcessing, setImageProcessing] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [processedImages, setProcessedImages] = useState(null)

  return (

    <div className='about center'>
      <h1> {title} </h1>
      <h2 className='about__role'>{subhead} </h2>
      <p className='about__desc'>{description && description}</p>
    <div>
    

    </div>
    </div>
  )
}

export default Autobidder
