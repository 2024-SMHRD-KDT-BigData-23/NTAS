import React from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';

const ResultWardTable = ({ currentItems }) => {

    return (
        <>
            <div>
                <Table className="mb-0" >
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Staff</th>
                            <th>Disposition</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.resultWardId} className="align-middle" style={{ height: '45.05px' }}>
                                    <td>{`${item.resultWardUpdatedAt.month}.${item.resultWardUpdatedAt.day} ${item.resultWardUpdatedAt.hour}:${item.resultWardUpdatedAt.minute}`}</td>
                                    <td>{item.staffId}</td>
                                    <td>{item.resultWard}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-3">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ResultWardTable;