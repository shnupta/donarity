import { Provider } from 'next-auth/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider session={pageProps.session} >
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
