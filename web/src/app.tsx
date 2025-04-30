import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LinkWidget } from './components/link-widget';
import { NotFoundWidget } from './components/not-found-widget';
import RedirectWidget from './components/redirect-widget';

export function App() {

  return (
    <>
      <main className="h-dvh flex flex-col items-center justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<LinkWidget />} />
            <Route path="/not-found" element={<NotFoundWidget />} />
            <Route path="/:link" element={<RedirectWidget />} />
          </Routes>
        </Router>
      </main>
      <Toaster position="top-right" expand={true} richColors />
    </>
  )
}

export default App
