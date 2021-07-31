import React, { memo } from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

const Sidebar = () => {
    const { 
        user: { docId, fullName, username, userId, following } 
    } = useUser();
    
    console.log(docId);

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    )
}

export default Sidebar;

// Sidebar.whyDidYouRender = true;