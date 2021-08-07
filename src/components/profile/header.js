import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from '../../services/firebase';

const Header = ({ 
    photosCount, 
    profile: { docId: profileDocId, userId: profileUserId, fullName, following = [], username: profileUsername}, 
    followerCount, 
    setFollowerCount 
}) => {
    const { user } = useUser();

    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user?.username && user?.username !== profileUsername;

    const handleToggleFollow = () => 1;

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                { profileUsername && (<img 
                    className="rounded-full h-40 w-40 flex" 
                    alt={`${profileUsername} profile picture`}
                    src={`/images/avatars/${profileUsername}.jpg`}
                />)}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4"> {profileUsername} </p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white
                            w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
      }).isRequired
}