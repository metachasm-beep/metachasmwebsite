import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Github } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const SkillDetail = lazy(() => import('./pages/SkillDetail'));

function App(): React.ReactElement {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <div className="h-screen w-screen overflow-hidden text-slate-50 relative">
        <div className="mesh-bg" />
        <header className="absolute top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/40 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/20">
          <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
            <Link to="/" className="mr-8 flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden font-bold sm:inline-block">Antigravity Skills</span>
            </Link>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">

              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a
                  href="https://github.com/sickn33/antigravity-awesome-skills"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-slate-300 transition-colors hover:text-indigo-400"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub Repository
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="pt-[4rem] h-full flex flex-col container max-w-screen-2xl mx-auto px-4 pb-4">
          <Suspense
            fallback={
              <div
                className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500 dark:text-slate-400"
              >
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skill/:id" element={<SkillDetail />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
