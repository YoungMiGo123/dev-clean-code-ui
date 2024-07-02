import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    return (
        <div className="video-player-wrapper">
            <ReactPlayer
                url={url}
                controls={true}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default VideoPlayer;
