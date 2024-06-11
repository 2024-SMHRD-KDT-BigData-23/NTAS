import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';

const Role = ({ users, setEdit, setEditUser, setDeleteId, showDeleteSuccessModal, setShowDeleteSuccessModal, showDeleteFailModal, setShowDeleteFailModal }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // 한 페이지에 표시할 항목 수

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지를 변경하는 함수입니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserEditModal, setUserEditModal] = useState(false);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [roles, setRoles] = useState([
        { id: 1, name: 'Doctor', description: 'Responsieble for patient care' },
        { id: 2, name: 'Nurse', description: 'Assists doctors in patient care' }
    ]);
    const [newRole, setNewRole] = useState({ name: '', description: '' });

    const handleShowUserEdit = (user) => {
        setSelectedUser(user);
        setEditUser(user);
        setUserEditModal(true);
    };

    const handleShowUserModal = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleShowDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    //
    const handleCloseUseEditModal = () => setUserEditModal(false);
    //

    const handleCloseUserModal = () => setShowUserModal(false);

    const handleShowRoleModal = () => setShowRoleModal(true);

    const handleCloseRoleModal = () => setShowRoleModal(false);

    const handleRoleChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
    };

    const handleAddRole = () => {
        setRoles((prevRoles) => [...prevRoles, { ...newRole, id: prevRoles.length + 1 }]);
        setNewRole({ name: '', description: '' });
        setShowRoleModal(false);
    };


    // 수정 모달창 관련
    const [editFilter, setEditFilter] = useState({
        name: '',
        role: ''
    })
    const handleEditChange = (e) => {
        const{name, value} = e.target;
        setEditFilter({ ...editFilter, [name]:value });
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        setEdit(editFilter)
    }

    return (
        <Container fluid>
            {/* 상단 섹션 */}
            <Row className="mb-3">
            <Col>
                <h2>User Management</h2>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="search">
                                <Form.Control type="text" placeholder="Search..." />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="roleFilter">
                                <Form.Control as="select">
                                    <option>All Roles</option>
                                    <option>Doctor</option>
                                    <option>Nurse</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="statusFilter">
                                <Form.Control as="select">
                                    <option>All Statuses</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            </Row>

            {/* 중간 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Id</th>
                                <th>Role</th>
                                <th>Last Login</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(user => (
                                <tr key={user.id}>
                                    <td>{user.staffName}</td>
                                    <td>{user.staffId}</td>
                                    <td>{user.staffRole}</td>
                                    <td>{user?.activityDate ? `${user.activityDate.year}.${user.activityDate.month}.${user.activityDate.day} ${user.activityDate.hour}:${user.activityDate.minute}` : "N/A"}</td>
                                    <td>{user.staffStatus}</td>
                                    <td>
                                        <Button variant="warning" className="mx-2" onClick={()=> handleShowUserEdit(user)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleShowDeleteModal(user)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination justify-content-center" >
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number)} className="page-link" >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>

            {/* 사용자 상세 보기 모달 >DB연결필요*/}
            {selectedUser && (
                <Modal show={showUserModal} onHide={handleCloseUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Activity Log:</strong></p>
                        <ul>
                            <li>Logged in on 2024-06-01</li>
                            <li>Updated profile on 2024-05-25</li>
                            <li>Logged out on 2024-05-20</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUserModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* staff정보 수정 모달*/}
            {selectedUser && (
                <Modal show={showUserEditModal} onHide={handleCloseUseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={selectedUser.staffName}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={selectedUser.staffRole}
                                onChange={handleEditChange}
                            >
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                type="id"
                                name="id"
                                value={selectedUser.staffId}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPw">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                type="pw"
                                name="pw"
                                placeholder="새 비밀번호를 입력하세요"
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            )}

            {/* 삭제 확인 모달 */}
            {selectedUser && (
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedUser.staffId} 계정을 정말 삭제 하시겠습니까?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal} >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={ () => {setDeleteId(selectedUser.staffId); handleCloseDeleteModal();}}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {/* 삭제 성공 모달 */}
            <Modal show={showDeleteSuccessModal} onHide={() => setShowDeleteSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    삭제가 성공적으로 완료되었습니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 실패 모달 */}
            <Modal show={showDeleteFailModal} onHide={() => setShowDeleteFailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Fail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    삭제를 실패했습니다. 다시 시도해주세요.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteFailModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>







            {/* 역할 추가 모달 */}
            <Modal show={showRoleModal} onHide={handleCloseRoleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRoleName">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newRole.name}
                                onChange={handleRoleChange}
                                placeholder="Enter role name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRoleDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newRole.description}
                                onChange={handleRoleChange}
                                placeholder="Enter role description"
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleAddRole}>
                            Add Role
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Role;
