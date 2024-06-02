import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Offcanvas, Container, Row, Col } from 'react-bootstrap';
import menuWhite from '../../assets/images/menuwhite.png'; // 메뉴 아이콘 이미지
import '../../assets/scss/header.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {

    const [show, setShow] = useState(false); // offCanvas 상태를 저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar bg="secondary" expand="lg" className="header-bg">
            <Container fluid>
              
                {/* 로고 */}
                <Row className="w-100">
                    <Col xs="auto">
                        <Navbar.Brand onClick={handleShow} style={{ cursor: 'pointer' }}>
                            <img src={menuWhite} className="menuimg" width="30px" height="30px" alt="Menu" />
                        </Navbar.Brand>
                    </Col>

                {/* 햄버거 메뉴 (반응형) */}
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

                {/* Offcanvas 메뉴 */}
                <Offcanvas placement="start" show={show} id="offcanvasNavbar" onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>메뉴</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/List" onClick={handleClose}>Present Patient</Nav.Link>
                            <Nav.Link as={Link} to="/AllList" onClick={handleClose}>All Patient</Nav.Link>
                            <Nav.Link as={Link} to="/Search" onClick={handleClose}>Search Patient</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* 메인 타이틀 중앙 배치 */}
                    <Col className="d-flex justify-content-center align-items-center">
                        <div className="titleSet d-flex">
                            <div className="MainTitle">
                                <Link to='/List' className='MainLogoLink'>
                                    NCDSS
                                </Link>
                            </div>
                            <div className="SubTitle">
                              by NAMNAM
                            </div>
                        </div>
                    </Col>

                {/* 오른쪽 병원이름 드롭다운 */}
                    <Col xs="auto" className="d-flex justify-content-end align-items-center">
                    <div class="dropdown">
                    <button class="btn hopitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        스마트병원
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                    </div>
                    </Col>


                </Row>

            </Container>
        </Navbar>
    );
};

export default Header;
