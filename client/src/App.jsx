import Canvas from './canvas'
import Customizer from './pages/Constomizer'
import Home from './pages/Home'
function App() {
  return (
    <main>
    <h1 className="head-text">ThreeJs</h1>
    <Home/>
    <Canvas/>
    <Customizer/>
    </main>
  )
}

export default App
