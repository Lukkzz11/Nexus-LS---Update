import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UpdateModule from './components/UpdateModule';
import LicenseModule from './components/LicenseModule';
import ActivationGuide from './components/ActivationGuide';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { DEFAULT_VERSIONS } from './data/defaults';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('updates');
  const [darkMode, setDarkMode] = useState(false);
  const [versions, setVersions] = useState(DEFAULT_VERSIONS);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load versions from Firestore in real-time
  useEffect(() => {
    let unsubscribe = null;

    try {
      const q = query(collection(db, 'atualizacoes'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setDbConnected(true);
          setLoading(false);

          if (!snapshot.empty) {
            const remoteVersions = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));

            // Merge with local fallback to ensure user always sees full list
            const combined = [...remoteVersions];
            DEFAULT_VERSIONS.forEach(def => {
              if (!combined.some(v => v.version === def.version)) {
                combined.push(def);
              }
            });
            setVersions(combined);
          } else {
            // Load custom stored versions if any
            const localCustom = JSON.parse(localStorage.getItem('nexus_custom_versions') || '[]');
            setVersions([...localCustom, ...DEFAULT_VERSIONS]);
          }
        },
        (error) => {
          console.warn('Firestore offline ou permissão de leitura pendente:', error);
          setDbConnected(false);
          setLoading(false);
          const localCustom = JSON.parse(localStorage.getItem('nexus_custom_versions') || '[]');
          setVersions([...localCustom, ...DEFAULT_VERSIONS]);
        }
      );
    } catch (err) {
      console.warn('Falha ao inicializar listener do Firestore:', err);
      setDbConnected(false);
      setLoading(false);
      const localCustom = JSON.parse(localStorage.getItem('nexus_custom_versions') || '[]');
      setVersions([...localCustom, ...DEFAULT_VERSIONS]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const localCustom = JSON.parse(localStorage.getItem('nexus_custom_versions') || '[]');
      setVersions((prev) => {
        const unique = [...prev];
        localCustom.forEach(item => {
          if (!unique.some(u => u.version === item.version)) {
            unique.unshift(item);
          }
        });
        return unique;
      });
      setLoading(false);
    }, 600);
  };

  const handleVersionPublished = (newVer) => {
    setVersions(prev => [newVer, ...prev.filter(v => v.version !== newVer.version)]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Background ambient decorative glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl opacity-60" />
      </div>

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        dbConnected={dbConnected}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'updates' && (
          <UpdateModule 
            versions={versions} 
            loading={loading} 
            onRefresh={handleRefresh} 
          />
        )}

        {activeTab === 'license' && (
          <LicenseModule />
        )}

        {activeTab === 'guide' && (
          <ActivationGuide onGoToLicense={() => setActiveTab('license')} />
        )}
      </main>

      {/* Admin Publish Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onVersionPublished={handleVersionPublished}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
