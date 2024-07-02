export function Content(children: any) {
    return (
 <></>
    );
}

export function Footer() {
    return (
        <footer className="sticky-footer">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-lg-6 col-sm-6">
                        <p className="mt-1 mb-0"><strong className="text-dark">Vidoe</strong>.
                            <small className="mt-0 mb-0"><a className="text-primary" target="_blank" href="https://templatespoint.net/">TemplatesPoint</a>
                            </small>
                        </p>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-right">
                        <div className="app">
                            <a href="#"><img alt="" src="img/google.png"/></a>
                            <a href="#"><img alt="" src="img/apple.png"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}