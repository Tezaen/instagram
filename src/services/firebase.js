import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.length > 0
}

// get user from the firestore where userId === userId (passed from AUTH)
export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

        const user = result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }));

        return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
        .firestore()
        .collection('users')
        .limit(10)
        .get();

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id}))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // current logged in user document ID
    profileId, // the user that I want to follow/unfollow
    isFollowingProfile // true or false, am I following this person now
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId) // update the current Users document
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId, // follower that current user follows/unfollows
    loggedInUserId, // the user that I want to follow
    isFollowingProfile // true or false, am I following this person now
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId) // update the current Users document
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserId)
                : FieldValue.arrayUnion(loggedInUserId)
        });
}

export async function getPhotos(userId, following) {

    // get's all photo Docs where the photo's userId is in the following array
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();
    
    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}