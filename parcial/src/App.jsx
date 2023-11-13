import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home/Home';
import Level from './assets/components/Level/Level';
import Easy from './assets/components/Level/Easy/Easy';
import Medium from './assets/components/Level/Medium/Medium';
import Hard from './assets/components/Level/Hard/Hard';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Level" element={<Level/>} />
          <Route path="/Easy" element={<Easy/>} />
          <Route path="/Medium" element={<Medium/>} />
          <Route path="/Hard" element={<Hard/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
