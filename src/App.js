import './App.css';
import { Route, Routes } from 'react-router-dom';
import Join from './component/Join';
import Chat from './component/Chat';


function App() {


  return (
    <div>
     
     <Routes>
       <Route exact path="/" element={<Join />}/>
       <Route path="/chat" element={<Chat />} />
     </Routes>
    </div>
  );
}

export default App;
