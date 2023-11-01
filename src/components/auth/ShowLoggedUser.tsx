"use client"
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import React from 'react'

const ShowLoggedUser = () => {
    const { user } = useAuthenticatedUser();

    const loggedUser = user ? user.username : 'Utente non loggato'
    
    return (
        <h2>{loggedUser}</h2>
    )
}

export default ShowLoggedUser;
