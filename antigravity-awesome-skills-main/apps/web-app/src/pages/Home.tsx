import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, AlertCircle, RefreshCw, Command, Terminal, Sparkles } from 'lucide-react';
import { VirtuosoGrid } from 'react-virtuoso';
import debounce from 'lodash.debounce';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkills } from '../context/SkillContext';
import { SkillCard } from '../components/SkillCard';
import type { SyncMessage, CategoryStats } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';
import { APP_HOME_CATALOG_COUNT, buildHomeMeta } from '../utils/seo';

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick, disabled }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export function Home(): React.ReactElement {
  const { skills, stars, loading, error, refreshSkills } = useSkills();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<SyncMessage | null>(null);
  const [commandCopied, setCommandCopied] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const installCommand = 'npx antigravity-awesome-skills';

  usePageMeta(buildHomeMeta(skills.length));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandPalette((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCommandCopied(true);
    window.setTimeout(() => setCommandCopied(false), 2000);
  };

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  const filteredSkills = useMemo(() => {
    let result = [...skills];
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(lowerSearch) ||
        skill.description.toLowerCase().includes(lowerSearch)
      );
    }
    if (categoryFilter !== 'all') {
      result = result.filter(skill => skill.category === categoryFilter);
    }
    if (sortBy === 'stars') {
      result = [...result].sort((a, b) => (stars[b.id] || 0) - (stars[a.id] || 0));
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (b.date_added || '').localeCompare(a.date_added || ''));
    } else if (sortBy === 'az') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [debouncedSearch, categoryFilter, sortBy, skills, stars]);

  const { categories } = useMemo(() => {
    const stats: CategoryStats = {};
    skills.forEach(skill => {
      stats[skill.category] = (stats[skill.category] || 0) + 1;
    });
    const cats = ['all', ...Object.keys(stats).filter(cat => cat !== 'uncategorized').sort((a, b) => stats[b] - stats[a]), ...(stats['uncategorized'] ? ['uncategorized'] : [])];
    return { categories: cats, categoryStats: stats };
  }, [skills]);

  const topSkills = useMemo(() => {
    return [...skills].sort((a, b) => (stars[b.id] || 0) - (stars[a.id] || 0)).slice(0, 3);
  }, [skills, stars]);

  const showBento = !debouncedSearch && categoryFilter === 'all' && sortBy === 'default' && !loading;

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch('/api/refresh-skills', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncMsg({ type: data.upToDate ? 'info' : 'success', text: data.upToDate ? 'ℹ️ Skills are already up to date!' : `✅ Synced ${data.count} skills!` });
        if (!data.upToDate) await refreshSkills();
      } else {
        setSyncMsg({ type: 'error', text: `❌ ${data.error}` });
      }
    } catch (err) {
      setSyncMsg({ type: 'error', text: '❌ Network error' });
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMsg(null), 5000);
    }
  };

  const titleWords = "Discover, install, and use trusted AI skills in minutes".split(" ");

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Command Palette Overlay */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-24"
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center px-4 py-3 border-b border-slate-800">
                <Search className="w-5 h-5 text-indigo-400 mr-3" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search skills globally..." 
                  className="flex-1 bg-transparent border-none outline-none text-slate-100 text-lg placeholder-slate-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs text-slate-400 font-mono">ESC</kbd>
              </div>
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredSkills.slice(0, 10).map(skill => (
                  <div key={skill.id} className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center transition-colors">
                    <div>
                      <h4 className="text-slate-200 font-medium">{skill.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{skill.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-md">{skill.category}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="flex-none pb-6">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Sparkles className="w-32 h-32 text-indigo-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 flex flex-wrap gap-2">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mb-8">
            Antigravity Awesome Skills is a discoverable catalog of installable capabilities for AI assistants.
            Search, filter, then copy a ready-to-run prompt in one pass.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <MagneticButton
              onClick={copyInstallCommand}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              <Terminal className="w-5 h-5" />
              {commandCopied ? 'Copied!' : 'Copy install command'}
            </MagneticButton>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300 text-sm font-mono cursor-pointer" onClick={() => setShowCommandPalette(true)}>
              <Command className="w-4 h-4" /> + K to search
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-2 px-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide py-2 flex-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors z-10 ${categoryFilter === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {categoryFilter === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat === 'all' ? 'All Skills' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync'}</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main Grid Area (Internally Scrollable) */}
      <div className="flex-1 overflow-hidden min-h-0 relative">
        
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-1 py-1">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-slate-800/50 p-6 h-48 bg-slate-900/40"></div>
             ))}
          </div>
        ) : error && skills.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center">
            <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-100">Unable to load skills</h3>
            <p className="text-slate-400 mt-2">{error}</p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center">
            <Search className="h-12 w-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-100">No skills found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-y-auto scrollbar-hide pb-12 pr-2">
            
            {showBento && topSkills.length === 3 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" /> Featured & Top Rated</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topSkills.map((skill, index) => (
                    <div key={skill.id} className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                      <SkillCard skill={skill} starCount={stars[skill.id] || 0} index={index} featured={index === 0} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold text-slate-100 mb-4">All Skills</h3>
            <VirtuosoGrid
              useWindowScroll={false}
              totalCount={filteredSkills.length}
              listClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              itemContent={(index) => {
                const skill = filteredSkills[index];
                return <SkillCard key={skill.id} skill={skill} starCount={stars[skill.id] || 0} index={index} />;
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
