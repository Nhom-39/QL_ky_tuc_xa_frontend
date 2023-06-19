import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feedback from './pages/feedback';
import Home from './pages/Home';
import Notification from './pages/Notification';
import SummaryPayment from './pages/summarypayment';
import Header from './layouts/components/Header/Header';
import DetaiPayment from './pages/DetailPayment';

function App() {
    return (
        <Router>
            <ToastContainer />
            <Header />
            <div className="App">
                <Routes>
                    {/* {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })} */}
                    <Route path='/' element={<Home />} />
                    <Route path='/admin/quan-ly-thong-bao' element={<Notification />} />
                    <Route path='/admin/phan-hoi-y-kien' element={<Feedback />} />
                    <Route path='/admin/quan-ly-tai-chinh' element={<SummaryPayment />} />
                    <Route path='/admin/detail-payment/:username' element={<DetaiPayment />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
