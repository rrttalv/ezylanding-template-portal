import App from 'next/app';

const MyApp = ({ Component, props }) => {
    return (
        <div className="MyApp">
            <p>_app.js file</p>
            <Component {...props} />
        </div>
    );
};

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
};

export default App;