import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import { useNavigate } from 'react-router-dom';
import ActionModal from './ActionModal';
import CopyButton from '../../views/sections/CopyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const MainTable = ({ patients, setAction }) => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수
    const totalPages = Math.ceil(patients.length / itemsPerPage);

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPagination = () => {
        const pageNumbers = [];
        let startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateObj) => {
        return `${String(dateObj.year).padStart(2, '0')}.${String(dateObj.month).padStart(2, '0')}.${String(dateObj.day).padStart(2, '0')} ${String(dateObj.hour).padStart(2, '0')}:${String(dateObj.minute).padStart(2, '0')}:${String(dateObj.second).padStart(2, '0')}`;
    };

    const renderDeepNcdssLink = (patient) => {
        let color = 'inherit';
        if (patient.deepNcdss === 'Discharge') {
            color = 'rgb(130, 130, 236)';
        } else if (patient.deepNcdss === 'Ward') {
            color = 'rgb(100, 200, 100)';
        } else if (patient.deepNcdss === 'ICU') {
            color = 'rgb(221, 102, 102)';
        }

        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <span style={{ color }}>
                    {patient.deepNcdss}
                </span>
            </td>
        );
    };

    const renderPatientId = (patient) => {
        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <Row className="justify-content-center align-items-center">
                    <Col md={7} className="p-0">
                        <span className="">{patient.patientId}</span>
                    </Col>
                    <Col md={1} className="p-0">
                        <CopyButton text={patient.patientId} />
                    </Col>
                </Row>
            </td>
        );
    };

    const renderPatientName = (patient) => {
        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <Row className="justify-content-center align-items-center">
                    <Col md={6} className="p-0">
                        <span>{patient.patientName}</span>
                    </Col>
                    <Col md={1} className="p-0">
                        <CopyButton text={patient.patientName} />
                    </Col>
                </Row>
            </td>
        );
    };

    const renderLink = (patient, field, label, suffix = '') => {
        if (field === 'deepNcdss') {
            return renderDeepNcdssLink(patient);
        } else if (field === 'patientId') {
            return renderPatientId(patient);
        } else if (field === 'patientName') {
            return renderPatientName(patient);
        } else {
            return (
                <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                    <span>{label}{suffix}</span>
                </td>
            );
        }
    };

    // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patients.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div>
            <main className="ourcontent">
                <div className="mainContent">
                    <table className="table table-hover" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                {[
                                    "In Time", "MT(Measurement)", "Patient ID", "Name", "Sex", "Temp",
                                    "HR", "RR", "SPO2", "SBP", "DBP", "Section", "NCDSS", "Decision"
                                ].map((header, index) => (
                                    <th key={index} scope="col">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(patient => (
                                <tr key={patient.id} className='align-middle' style={{ height: '3rem', cursor: 'pointer' }}>
                                    {renderLink(patient, 'admissionInTime', formatDate(patient.admissionInTime))}
                                    {renderLink(patient, 'patientVitalCreatedAt', formatDate(patient.patientVitalCreatedAt))}
                                    {renderLink(patient, 'patientId', patient.patientId)}
                                    {renderLink(patient, 'patientName', patient.patientName)}
                                    {renderLink(patient, 'patientSex', patient.patientSex)}
                                    {renderLink(patient, 'patientVitalTemperature', patient.patientVitalTemperature, '°C')}
                                    {renderLink(patient, 'patientVitalHr', patient.patientVitalHr)}
                                    {renderLink(patient, 'patientVitalRespiratoryRate', patient.patientVitalRespiratoryRate)}
                                    {renderLink(patient, 'patientVitalSpo2', patient.patientVitalSpo2)}
                                    {renderLink(patient, 'patientVitalNibpS', patient.patientVitalNibpS)}
                                    {renderLink(patient, 'patientVitalNibpD', patient.patientVitalNibpD)}
                                    {renderLink(patient, 'bedWard', patient.bedWard)}
                                    {renderLink(patient, 'deepNcdss', patient.deepNcdss)}
                                    {patient && patient.resultWard ? (
                                        renderLink(patient, 'resultWard', patient.resultWard)
                                    ) : (
                                        <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                                            <ActionModal admissionId={patient.admissionId} setAction={setAction} />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(1)} className="page-link">
                                    <FontAwesomeIcon icon={faAnglesLeft} />
                                </button>
                            </li>
                            <li className="page-item">
                                <button onClick={handlePrev} className="page-link">
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </li>
                            {getPagination().map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number)} className="page-link">{number}</button>
                                </li>
                            ))}
                            {totalPages > 10 && currentPage + 4 < totalPages && (
                                <li className="page-item disabled">
                                    <button className="page-link">...</button>
                                </li>
                            )}
                            <li className="page-item">
                                <button onClick={handleNext} className="page-link">
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </li>
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(totalPages)} className="page-link">
                                    <FontAwesomeIcon icon={faAnglesRight} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainTable;
