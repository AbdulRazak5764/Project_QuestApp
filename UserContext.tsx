import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  avatar: string;
  level: number;
  questCoins: number;
  interests: string[];
  completedQuests: string[];
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  addQuestCoins: (amount: number) => void;
  completeQuest: (questId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    name: 'Guest User',
    avatar: 'G',
    level: 1,
    questCoins: 100,
    interests: [],
    completedQuests: [],
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return userData as User;
      return { ...prevUser, ...userData };
    });
  };

  const addQuestCoins = (amount: number) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        questCoins: prevUser.questCoins + amount,
      };
    });
  };

  const completeQuest = (questId: string) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      // Only add the quest if it's not already completed
      if (prevUser.completedQuests.includes(questId)) {
        return prevUser;
      }
      
      return {
        ...prevUser,
        completedQuests: [...prevUser.completedQuests, questId],
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addQuestCoins, completeQuest }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};