import React, { useEffect, useState } from 'react'
import Lockr from 'lockr'
import {URLS, api_auth} from './../../helpers/requisicao'
import UploadImagensDoSinistro from './../UploadImagensSinistro/index'
import Carregando from './../Carregando/index'
import './styles.scss'
export default function ImagensDeSinistro({chamado}) {
    const [apiPhotos, setApiPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function loadData() {
        const clientData = Lockr.get('ClientData')
        setIsLoading(true)
        const result = await api_auth
        .get(
            `${URLS.FOTOS}/${clientData.customerSelectedCar.contractInfo.nCtrId}/${chamado}`
        )
        .json()
        setApiPhotos(result || [])
        setIsLoading(false)
    }

    useEffect(() => {
        async function loadFotos() {
            const clientData = Lockr.get('ClientData')
            setIsLoading(true)
            const result = await api_auth
            .get(
                `${URLS.FOTOS}/${clientData.customerSelectedCar.contractInfo.nCtrId}/${chamado}`
            )
            .json()
            setApiPhotos(result || [])
            setIsLoading(false)
        }
        if(chamado){
            loadFotos()
        }
    }, [chamado])
    return(
        <div className='c_sinister_images'>
            {!isLoading && 
                apiPhotos.map((apiPhoto) => (
                    <UploadImagensDoSinistro 
                        key={apiPhoto.TipoFoto.Id}
                        details={apiPhoto}
                        onPhotoFinishedUploading={loadData}
                        chamado={chamado}
                    />
            ))}
            {isLoading && <Carregando />}
        </div>
    )
}