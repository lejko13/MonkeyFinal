import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PageNotFound from './lib/PageNotFound';
// import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LangProvider } from './lib/LangContext';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsPage from './pages/ProjectsPage';

const AuthenticatedApp = () => {
  // const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  // if (isLoadingPublicSettings || isLoadingAuth) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center">
  //       <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  // // Handle authentication errors
  // if (authError) {
  //   if (authError.type === 'user_not_registered') {
  //     return <UserNotRegisteredError />;
  //   } else if (authError.type === 'auth_required') {
  //     // Redirect to login automatically
  //     navigateToLogin();
  //     return null;
  //   }
  // }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/sluzby/:id" element={<ServiceDetail />} />
      <Route path="/:id" element={<ProjectDetail />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};


function App() {

  return (
    // <AuthProvider>
      <LangProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </LangProvider>
    // </AuthProvider>
  )
}

export default App