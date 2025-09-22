import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NLPSearchForm from '@/components/NLPSearchForm';
import AdvancedSearchForm from '@/components/AdvancedSearchForm';
import { RecentProperties } from '@/components/RecentProperties';
import { UserDashboard } from '@/components/UserDashboard';
import { AuthModal } from '@/components/AuthModal';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { User, LogOut } from 'lucide-react';
import "./App.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const handleLogout = async () => {
    await logout();
    setActiveTab('search');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                CancelScout
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.firstName}!
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login / Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-ocean text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Never Miss a <span className="text-sunset">Vacation</span> Cancellation
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get instant notifications when vacation rentals become available in your dream location
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="search">New Search</TabsTrigger>
            <TabsTrigger value="monitoring" disabled={!user}>
              My Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-12">
            {/* Search Interface */}
            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              <Tabs defaultValue="nlp" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                  <TabsTrigger value="nlp">🤖 Natural Language</TabsTrigger>
                  <TabsTrigger value="advanced">⚙️ Advanced Search</TabsTrigger>
                </TabsList>

                <TabsContent value="nlp">
                  <NLPSearchForm />
                </TabsContent>

                <TabsContent value="advanced">
                  <AdvancedSearchForm />
                </TabsContent>
              </Tabs>
            </div>

            {/* Recent Properties */}
            <RecentProperties />
          </TabsContent>

          <TabsContent value="monitoring">
            {user ? (
              <UserDashboard />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Please log in to view your monitoring dashboard.</p>
                <Button onClick={() => setShowAuthModal(true)}>
                  Login / Register
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
