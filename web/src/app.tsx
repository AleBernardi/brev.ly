import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LinkWidget } from './components/link-widget';
import RedirectWidget from './components/redirect-widget';

export function App() {

  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<LinkWidget />} />
          <Route path="/*" element={<RedirectWidget />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
