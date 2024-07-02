import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';

interface Video {
    videoId: string;
    userId: string;
    videoUrl: string;
    videoTitle: string;
    videoDescription: string;
}

interface ApiResponse {
    data: Video[];
    message: string;
    isSuccess: boolean;
    errors: string[];
}

const CoursePlayer: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            const response = await fetch('https://localhost:7149/api/Playback/UserVideoUploads?UserId=b1518f55-d885-42cb-bef6-c6b5d14cc3f0');
            const result: ApiResponse = await response.json();
            if (result.isSuccess) {
                setVideos(result.data);
                setSelectedVideo(result.data[0]);
            }
        };

        fetchCourseData();
    }, []);

    return (
        <div className="course-player">
            <div className="video-list">
                {videos.map((video) => (
                    <div
                        key={video.videoId}
                        className={`video-item ${selectedVideo?.videoId === video.videoId ? 'selected' : ''}`}
                        onClick={() => setSelectedVideo(video)}
                    >
                        <h3>{video.videoTitle}</h3>
                        <p>{video.videoDescription}</p>
                    </div>
                ))}
            </div>
            <div className="video-player-wrapper">
                {selectedVideo && (
                    <ReactPlayer
                        url={selectedVideo.videoUrl}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                )}
            </div>
        </div>
    );
};

export default CoursePlayer;

