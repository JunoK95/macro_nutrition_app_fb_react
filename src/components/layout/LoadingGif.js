import React from 'react'
import loadingGif from './loadingGif.gif'

export default () => {
    return(
        <div>
            <img src={loadingGif} alt="loading..." style={{width: '200px', margin: 'auto', display:'block'}} />
        </div>
    )
}