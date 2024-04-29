import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Select, VStack } from "@chakra-ui/react";
import {getAllUsers} from "../../services/userProfile.js";
import UserUpdateModalButton from "./UserUpdateModalButton.jsx";

const UserProfileTable = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getAllUsers()
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const refreshData = () => {
        fetchUsers();
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = event => {
        setFilterStatus(event.target.value);
    };

    useEffect(() => {
        const filtered = users.filter(user => {
            const fullName = `${user.firstName} ${user.lastName} ${user.patronymic}`.toLowerCase();
            const email = user.email ? user.email.toLowerCase() : '';
            const status = user.userStatus ? user.userStatus.toLowerCase() : '';

            const searchTermMatches = fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
            const statusMatches = !filterStatus || status === filterStatus.toLowerCase();

            return searchTermMatches && statusMatches;
        });

        setFilteredUsers(filtered);
    }, [searchTerm, filterStatus, users]);

    const typeTranslation = {
        'LOGISTICIAN': {text: 'Логистика'},
        'TRANSPORT_COMPANY_REP': {text: 'Перевозки'},
        'WAREHOUSE_REP': {text: 'Хранение'},
        'ADMIN': {text: 'Администратор'},
    }

    const statusTranslation = {
        'INACTIVE': {text: 'Не активирован'},
        'ACTIVE': {text: 'Активирован'},
    }


    return (
        <VStack>
            <Input placeholder="Поиск по email или ФИО" value={searchTerm} onChange={handleSearchChange} />
            <Select placeholder="Фильтр по статусу" value={filterStatus} onChange={handleFilterChange}>
                <option value="">Все</option>
                <option value="active">Активирован</option>
                <option value="inactive">Не активирован</option>
            </Select>
            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>ФИО</Th>
                        <Th>Email</Th>
                        <Th>Тип пользователя</Th>
                        <Th>Статус</Th>
                        <Th>Телефон</Th>
                        <Th>Название компании</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredUsers.map(user => (
                        <Tr key={user.email}>
                            <Td>{((user.firstName || '') + ' ' + (user.lastName || '') + ' ' + (user.patronymic || '')).trim() || 'Не указано'}
                            </Td>
                            <Td>{user.email}</Td>
                            <Td>{typeTranslation[user.userType]?.text || 'Не указано'}</Td>
                            <Td>{statusTranslation[user.userStatus]?.text || 'Не указано'}</Td>
                            <Td>{user.phone || 'Не указано'}</Td>
                            <Td>{user.companyName || 'Не указано'}</Td>
                            <Td>
                                <UserUpdateModalButton user={user} refreshData={refreshData}/>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};

export default UserProfileTable;
