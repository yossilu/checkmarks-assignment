import './App.scss'
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
// import { ResourcesProvider } from './contexts/Resources/ResourcesProvider';
// import { MicroservicesProvider } from './contexts/Microservices/MicroservicesProvider';
import { GraphDataProvider } from './contexts/GraphData/GraphDataProvider';

function App() {

  return (
    <Routes>
      <Route index path="/" element={
        <GraphDataProvider>
          <Homepage></Homepage>
        </GraphDataProvider>
        // <MicroservicesProvider>
        //   <ResourcesProvider>
            
        //   </ResourcesProvider>
        // </MicroservicesProvider>
      } />
    </Routes>
  )
}

export default App;
