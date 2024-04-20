import React, { useState } from 'react';
import {RiCloseLine} from "react-icons/ri";
import {GoEyeClosed} from "react-icons/go";
import {MdCloseFullscreen} from "react-icons/md";
import {Button} from "@chakra-ui/react";

const PdfViewer = ({ pdfUrl }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Button onClick={toggleModal}
                    size='lg'
            >Открыть PDF</Button>
            {modalOpen && (
                <div className="modal-overlay">
                        <span className="close" onClick={toggleModal}><MdCloseFullscreen /></span>
                    <div className="modal">
                        <iframe src={pdfUrl} title="PDF Viewer" frameBorder="0" width="100%" height="100%" />
                    </div>
                </div>
            )}
        </>
    );
};

export default PdfViewer;
