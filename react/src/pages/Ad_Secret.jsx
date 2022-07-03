import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';




function Ad_Secret() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const verifyAdmin = async () => {
            // console.log(cookie);
            if (!cookie.adminjwt) {
                // console.log('No token');
                navigate("/admin-login");
            }
            else {
                // console.log('I got Token');
                const { data } = await axios.post(
                    "http://localhost:3001/admin", {}, { withCredentials: true });

                // console.log('mmmm', data.usersList);



                if (!data.status) {
                    removeCookie("adminjwt");
                    navigate('/admin-login');
                }

                else {
                    toast('Welcome Admin')
                    setUsers(data.usersList);
                }
            }
        };

        // console.log('ddddddddddddd', users);

        verifyAdmin();
    }, [])


    const adminLogout = () => {
        removeCookie("adminjwt");
        navigate('/admin-register')
    }
    
    

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
        {
            id: 'phone',
            label: 'Phone',
            minWidth: 170,
            // align: 'right',
        },
        { id: 'edit', label: 'Edit'},
        { id: 'delete', label: 'Delete'},


    ];


    function createData(name, email, phone) {

        return { name, email, phone };
    }

    const rows = users;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (

        <div>

            <div className='container' style={{ "margin": "2rem", "width": "95%" }}>
                <h2>Admin Dashboard</h2>
                <button onClick={adminLogout} style={{ "float": "right", "margin": "-3rem 0rem 3rem 0rem" }}>Log Out</button>
                <ToastContainer />

                {/* <div style={{width: "100%"}}>
                    <button style={{"backgroundColor" : "rgb(85 91 140)", width: "11rem", margin: "0 0 1rem 38rem"}}
                    > Add User </button>
                </div> */}


                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>

        </div>
    )
}

export default Ad_Secret;