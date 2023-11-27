import React from 'react'

import './styles.scss'

export function SinistroPdf({FileName = '', url = '#'}) {
    return(
        <p className='c_sinister_pdf' href={url} target='_blank' rel='noopener noreferrer'>
            {FileName}
        </p>
    )
}