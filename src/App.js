import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
