import { createContext, ReactNode, useContext, useState } from 'react';

interface AddTrainingModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AddTrainingModalContext = createContext<AddTrainingModalContextType | undefined>(undefined);

export function AddTrainingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AddTrainingModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AddTrainingModalContext.Provider>
  );
}

export function useAddTrainingModal() {
  const context = useContext(AddTrainingModalContext);
  if (context === undefined) {
    throw new Error('useAddTrainingModal must be used within AddTrainingModalProvider');
  }
  return context;
}
