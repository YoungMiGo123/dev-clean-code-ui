import { AuthApi, CleanCodeServicesApi, LoginRequest, AccessTokenResponse, PlaybackApi, UploadApi } from '../../api';
import axios from 'axios';

export function createApiServices(){
    const basePath = 'https://localhost:7149';
    const authApi = new CleanCodeServicesApi(undefined, basePath, axios);
    const playbackApi = new PlaybackApi(undefined, basePath, axios);
    const uploadApi = new UploadApi(undefined, basePath, axios);
    return {
        authApi,
        playbackApi,
        uploadApi
    };
}