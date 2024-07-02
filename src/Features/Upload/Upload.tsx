export default function UploadVideo() {
    return (
        <div className="container-fluid pt-5 pb-5">
            <div className="row">
                <div className="col-md-8 mx-auto text-center upload-video pt-5 pb-5">
                    <h1><i className="fas fa-file-upload text-primary"></i></h1>
                    <h4 className="mt-5">Select Video files to upload</h4>
                    <p className="land">or drag and drop video files</p>
                    <div className="mt-4">
                        <a className="btn btn-outline-primary">Upload Video</a>
                    </div>
                </div>
            </div>
        </div>
    );
}