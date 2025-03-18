import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuestsPage from './pages/QuestsPage';
import ShopPage from './pages/ShopPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProductPage from './pages/ProductPage';
import OnboardingPage from './pages/OnboardingPage';
import { UserProvider } from './contexts/UserContext';
import { QuestProvider } from './contexts/QuestContext';
import { ShopProvider } from './contexts/ShopContext';

function App() {
  const [isNewUser, setIsNewUser] = useState(true);

  // Skip onboarding for development purposes
  // In production, this would be determined by checking if the user has completed onboarding
  const handleCompleteOnboarding = () => {
    setIsNewUser(false);
  };

  return (
    <UserProvider>
      <QuestProvider>
        <ShopProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
            {!isNewUser && <Navbar />}
            <main className="flex-grow">
              {isNewUser ? (
                <OnboardingPage onComplete={handleCompleteOnboarding} />
              ) : (
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/quests" element={<QuestsPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              )}
            </main>
            {!isNewUser && <Footer />}
          </div>
        </ShopProvider>
      </QuestProvider>
    </UserProvider>
  );
}

export default App;