import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import {store} from "../redux/store"
import NavbarComponent from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return   <>
  <Provider store={store}>
    <NavbarComponent/>
   <Component {...pageProps} />;
  </Provider>
  </>
}
