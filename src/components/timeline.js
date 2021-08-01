import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

const Timeline = () => {
    // we need to get the curr user's photos
    const { photos } = usePhotos();
    
    return (
        <div className="container col-span-2">
            {!photos ? (
                // on loading the photos, we need to use react skeleton
                <> 
                    <Skeleton count={4} width={640} height={800} className="mb-5"/>
                </>
            ) : photos?.length > 0 ? (
                // if we have photos, render them (create a post component cuz we need things like comments)
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : (
                // if the user has no photos, tell em to create some photos
                <p className="text-center text-2xl">Follow people to see photos!</p>
            )}
        </div>
    )
}

export default Timeline;
