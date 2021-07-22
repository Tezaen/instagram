import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

const useUser = () => {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUserObjByUserId = async () => {
            // we need a func that can call (firebase srevice) that gets user data based on the id
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if (user?.uid) {
            getUserObjByUserId();
        }
    }, [user])

    return { user: activeUser }
}

export default useUser
