//import React, { useState } from 'react';

    const HandleFileUpload = () => {
        //const [selectedFile, setSelectedFile] = useState(null);

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
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                console.log(response);
                alert("fichier uploadé avec succès");
                window.location.reload();
                //
                
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                {/* ... votre code JSX existant ... */}
    
                {/* Ajoutez le bouton d'upload de fichier ici */}
                <div className="custom-file">
                    <input type="file" className="custom-file-input " id="customFile" onChange={handleFileUpload} />
                    <label className="custom-file-label" htmlFor="customFile">
                        Nouveau fichier
                    </label>
                </div>
            </div>
        );

        
    };

    


export default HandleFileUpload;
