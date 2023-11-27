import React, { useState } from 'react'
import Lockr from 'lockr'

import FotoUpload from './../Painel/index'

import './styles.scss'
import { URLS, api_auth } from './../../helpers/requisicao'
import Carregando from './../Carregando/index'
import SinistroPdf from './../SinistroPdf/index'

export default function UploadImagensDoSinistro({
    details,
    onSubmit,
    onPhotoFinishedUploading,
    chamado 
}) {
    const clientData = Lockr.get('ClientData');
    const [selectedFile, setSelectedFile] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpload() {
        if (!selectedFile) {
            return;
        }

        const fileType = selectedFile.includes('/pdf;') ? 'pdf' : 'jpg'

        setIsLoading(true)
        const result = await api_auth
            .put(
                `${URLS.FOTOS}/upload/${clientData.customerSelectedCar.contractInfo.nCtrId}/${details.TipoFoto.Id}/${fileType}/${chamado}`,
                {
                    body: selectedFile.split(',')[1]
                }
            )
            .finally()

        if (!result.ok) {
            setIsLoading(false)
            window.alert('Erro ao fazer upload de foto. Tente Novamente')
            return
        }

        if (onSubmit) {
            onSubmit()
        }

        if (onPhotoFinishedUploading) {
            onPhotoFinishedUploading()
        }

        setIsLoading(false)
    }

    console.log('wololo', details)

    if (!details) {
        return <></>
    }

    return (
        <div className='c_sinister_image_uploader'>
            <div className='hint'>
                <div className='hint__text'>
                    <p>{details.TipoFoto.Titulo}</p>
                    {(!!details.Foto &&  details.Foto.Aprovacao !== undefined && !details.Foto.Aprovacao) && (
                        <p className="hint__rejected">Foto enviada reprovada, favor enviar nova foto.</p>
                    )}
                    {details.TipoFoto.Descricao && (
                        <p className='hint_desciption'>{details.TipoFoto.Id}</p>
                    )}
                </div>
                <img
                    src={`/img/sinisters/${details.TipoFoto.Id}.png`}
                    alt={details.TipoFoto.Id}
                    className='hint__image'
                />
            </div>
            {!!details.Foto && (details.Foto.Aprovacao === undefined || details.Foto.Aprovacao) && (
                <>
                    {details.Foto.Formato === "jpg" && (
                        <img 
                            className='preview'
                            alt={details.TipoFoto.Id}
                            src={details.Foto.Url}
                        />
                    )}
                    {details.Foto.Formato === 'pdf' && (
                        <SinistroPdf
                            fileName={`${details.Foto.Tipo}.pdf`}
                            url={details.Foto.Url}
                        />
                    )}
                </>
            )}
            {(!details.Foto || (!!details.Foto && details.Foto.Aprovacao !== undefined && details.Foto.Aprovacao === false)) && (
                <>
                    <FotoUpload
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        accept='.jpg, .jpeg, .pdf'
                    />
                    <button
                        className='loovi-button'
                        onClick={handleUpload}
                        disabled={isLoading}
                    >
                        {!isLoading && 'Enviar'}
                        {isLoading && <Carregando />}
                    </button>
                </>
            )}
        </div>
    )
}