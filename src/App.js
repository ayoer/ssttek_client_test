import 'antd/dist/antd.css';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import VendorList from 'pages/vendor/vendor-list';
import AddUpdateVendor from 'pages/vendor/add-update-vendor';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<VendorList />}></Route>
        <Route path='/addVendor' element={<AddUpdateVendor />}></Route>
        <Route path='/editVendor/:id' element={<AddUpdateVendor />}></Route>
      </Routes>
    </>
  );
}

export default App;
