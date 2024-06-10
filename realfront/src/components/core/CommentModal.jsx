import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../assets/scss/commentmodal.scss';

const CommentModal = (patientData) => {

    const { id } = useParams();
    const [selectedDisposition, setSelectedDisposition] = useState(patientData && patientData.length > 0 ? patientData[0].admissionResultWard : '');
    const [selectedComment, setSelectedComment] = useState(patientData && patientData.length > 0 ? patientData[0].admissionDiagnosis : '');

    const changeComment = (event) => {
        setSelectedComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedDisposition);
        console.log(selectedComment);
        axios.patch(`http://localhost:8080/api/ER/set/medical-patients/${id}`, {
            admissionResultWard: selectedDisposition,
            admissionComment: selectedComment
        })
            .then(response => {
                console.log('DB 업데이트 성공:', response.data);
            })
            .catch(error => {
                console.error('DB 업데이트 실패:', error);
            });
    };

    return (
        <div>
            <button type="button" className="btn btn-sm btn-warning modalBtn" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Disposition:</label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-outline-dark dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {selectedDisposition}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <a className="dropdown-item">DISCHARGE</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item">WARD</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item">ICU</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="message-text" className="col-form-label">Comment</label>
                                    <textarea className="form-control" id="message-text" onChange={changeComment} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onSubmit={() => handleSubmit} className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;