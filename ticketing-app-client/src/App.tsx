import axios from "axios";
import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Header from "./components/Header";

const Home = lazy(() => import('./pages/Home'));
const TicketHome = lazy(() => import('./pages/TicketPage'));

export default function App() {

  axios.defaults.baseURL = 'http://localhost:8080';


  return (
    <Router>
      <Suspense fallback={ <Spinner /> }>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<TicketHome />} />
        </Routes>
      </Suspense>
    </Router>
  )
}