import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/style.scss'

const MyApp = ({ Component, props }) => {
    return (
        <div className="MyApp">
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