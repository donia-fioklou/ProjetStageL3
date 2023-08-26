import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
    const HandleFileUpload = () => {
        //const [selectedFile, setSelectedFile] = useState(null);
        const [loading, setLoading] = useState(false)

        const handleFileUpload = async (event) => {
            const file = event.target.files[0];
            const allowedExtensions = /(\.xlsx|\.xls)$/i; // Regular expression to match Excel file extensions
            if (!allowedExtensions.exec(file.name)) {
                alert('Type de fichier invalide. Veuillez sélectionner un fichier Excel.');
                return;
            }
            const url = 'http://127.0.0.1:8000/api/upload-excel/';
            const formData = new FormData();
            formData.append('filePath', file);

            try {
                setLoading(true); // Enable loader
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                console.log(data);
                if (response.status === 201){
                    
                    alert("fichier chargé avec succès");
                    console.log(data);
                }
                setLoading(false); // Disable loader
                
                
                //window.location.reload();
                //
                
            } catch (error) {
                setLoading(false); // Disable loader
                console.error(error);
            }
        };

        return (
            <div>
                {loading ? (
                <div className="container py-8">
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                        <ClipLoader color="#52bfd9" size={100}/>
                        </div>
                    </div>
                </div>
                ) : ( 
            
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input " id="customFile" onChange={handleFileUpload} />
                            <label className="custom-file-label" htmlFor="customFile">
                                Nouveau fichier
                            </label>
                        </div>
                    </div> 
                )}
    </div> 
        );

        
    };

    


export default HandleFileUpload;
