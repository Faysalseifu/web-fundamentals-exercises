import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Counter from './components/Counter'
import LikeButton from './components/LikeButton'
import ProfileCard from './components/ProfileCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    {/* <Counter /> 
    <LikeButton /> */}

       {/* <div>

      <ProfileCard
        name="Faysal"
        role="Backend Developer"
        image="https://via.placeholder.com/150"
      />

      <ProfileCard
        name="Ahmed"
        role="UI Designer"
        image="https://via.placeholder.com/150"
      />

      <ProfileCard
        name="Ali"
        role="Video Editor"
        image="https://via.placeholder.com/150"
      />

    </div> */}
    {/* <button
  onClick={() =>
    console.log("Clicked")
  }
>
  Click Me
</button>

    <Counter />
    </div> */}
    
  )
}

export default App
