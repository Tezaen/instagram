import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

const Timeline = () => {
    // we need to get the curr user's photos
    const { photos } = usePhotos();
    // on loading the photos, we need to use react skeleton
    // if we have photos, render them (create a post component cuz we need things like comments)
    // if the user has no photos, tell em to create some photos

    return (
        <div className="container col-span-2">
            <p>I AM THE TIMELINE</p>
        </div>
    )
}

export default Timeline;
