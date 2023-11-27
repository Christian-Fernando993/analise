import React, {useState} from 'react'
import './styles.scss';
import {SinistroPdf} from '../SinistroPdf/index'

const FotoUpload = ({ 
    selectedFile,  
    setSelectedFile, 
    accept = ".jpg, .jpeg, .png, .webp",
}) => {
    const [file, setFile] = useState();
    const [isPDF, setIsPDF] = useState(false);

    const onFileChange = (event) => {
        const file = event.target.files[0]

        alert('CSH onFileChange: ')

        if(file) {
            setFile(file)
            setIsPDF(file.type === 'application/pdf')

            const reader = new FileReader()
            reader.onloadend = (e) => {
                setSelectedFile(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return(
        <div>
            <div className='imageinputcontainer'>
                <input 
                    style={{display:'none'}}
                    type='file'
                    accept={accept}
                    multiple
                    onChange={onFileChange}
                />
                Clique para selecionar imagem do veiculo
            </div>
            {selectedFile && (
                <div style={{maxWidth: '700px'}}>
                    {isPDF && <SinistroPdf FileName={file.name}/>}
                    {!isPDF && <img src={selectedFile} alt='Imagem selecionada'/>}
                </div>
            )}
        </div>
    )
}