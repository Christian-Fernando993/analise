import React from 'react'

import './styles.css'

export function Carregando({color = "#5b74ff", size = "20"}) {
    return(
        <div className="c_loader_inline">
            <div 
                className="c_loader_inline__loader" 
                style={{
                    borderTop: color,
                    borderRightColor: color,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        </div>
    )
}