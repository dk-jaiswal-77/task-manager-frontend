import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Tasks from './components/tasks/Tasks';

import {Routes, Route} from "react-router-dom";

//backend_url = https://task-manager-dkjaiswal77.herokuapp.com/

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Login />} />
        <Route path='/register' element={< Register />} />
        <Route path='/tasks/*' element={< Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
