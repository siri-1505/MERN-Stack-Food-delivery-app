import Home from '../components/Home'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <Home></Home>
      <Outlet></Outlet>
    </div>
  )
}
