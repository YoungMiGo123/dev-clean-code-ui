import VideoPlayer from "./Components/VideoPlayer";
import CoursePlayer from "./Components/CoursePlayer";
export default function Dashboard(){
    const videoUrl = "https://classiadsstorage.blob.core.windows.net/clean-code-container-music/seeddata|b1518f55-d885-42cb-bef6-c6b5d14cc3f0|b627fe80-9e08-4126-99c8-ad03fd5f6c10.mp4";

    return (
        <div className="App">
            <h1>React Video Player</h1>
            <CoursePlayer />
        </div>
    );
}