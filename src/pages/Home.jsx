import Hero from '../components/Hero'
import Currently from '../components/Currently'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

const Home = ({ onNavigate }) => (
  <>
    <Hero onNavigate={onNavigate} />
    <Currently />
    <Experience />
    <Gallery />
    <Contact />
  </>
)

export default Home
