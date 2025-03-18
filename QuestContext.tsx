import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from './UserContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  timeLimit?: number;
  participants?: number;
  image?: string;
  progress?: number;
  isCompleted?: boolean;
}

interface QuestContextType {
  quests: Quest[];
  featuredQuests: Quest[];
  completedQuests: Quest[];
  startQuest: (questId: string) => void;
  completeQuest: (questId: string) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, addQuestCoins, completeQuest: markQuestCompleted } = useUser();
  
  // Mock quest data
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Daily Shopping Spree',
      description: 'Browse through 5 different product categories in the shop.',
      type: 'daily',
      difficulty: 'easy',
      reward: 50,
      timeLimit: 15,
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80',
    },
    {
      id: '2',
      title: 'Product Hunt',
      description: 'Find the hidden discount code in the tech section.',
      type: 'daily',
      difficulty: 'medium',
      reward: 100,
      timeLimit: 30,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '3',
      title: 'Social Shopper',
      description: 'Invite 3 friends to join QuestMart and earn bonus coins.',
      type: 'social',
      difficulty: 'medium',
      reward: 150,
      participants: 4,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
    },
    {
      id: '4',
      title: 'Fashion Expert',
      description: 'Complete the fashion quiz with at least 80% correct answers.',
      type: 'exclusive',
      difficulty: 'hard',
      reward: 200,
      timeLimit: 10,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '5',
      title: 'Tech Trivia Challenge',
      description: 'Answer 10 questions about the latest tech products.',
      type: 'daily',
      difficulty: 'medium',
      reward: 120,
      timeLimit: 20,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '6',
      title: 'Group Shopping Event',
      description: 'Join the live shopping event with other users to unlock special deals.',
      type: 'social',
      difficulty: 'easy',
      reward: 80,
      participants: 12,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '7',
      title: 'Limited Edition Hunt',
      description: 'Find and unlock the limited edition product hidden in the shop.',
      type: 'exclusive',
      difficulty: 'hard',
      reward: 250,
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80',
    },
    {
      id: '8',
      title: 'Review Champion',
      description: 'Write thoughtful reviews for 3 products you\'ve purchased.',
      type: 'daily',
      difficulty: 'easy',
      reward: 75,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '9',
      title: 'Home Decor Challenge',
      description: 'Create a wishlist of 10 home decor items that match a specific theme.',
      type: 'daily',
      difficulty: 'medium',
      reward: 100,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
    },
  ]);

  // Get featured quests (first 3 for demo purposes)
  const featuredQuests = quests.slice(0, 3);

  // Get completed quests
  const completedQuests = quests.filter(quest => 
    user?.completedQuests.includes(quest.id)
  ).map(quest => ({ ...quest, isCompleted: true }));

  // Start a quest
  const startQuest = (questId: string) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId ? { ...quest, progress: 0 } : quest
      )
    );
  };

  // Complete a quest
  const completeQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    
    if (quest) {
      // Add quest coins to user
      addQuestCoins(quest.reward);
      
      // Mark quest as completed
      markQuestCompleted(questId);
      
      // Update quest state
      setQuests(prevQuests => 
        prevQuests.map(q => 
          q.id === questId ? { ...q, progress: 100, isCompleted: true } : q
        )
      );
    }
  };

  return (
    <QuestContext.Provider value={{ quests, featuredQuests, completedQuests, startQuest, completeQuest }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
};