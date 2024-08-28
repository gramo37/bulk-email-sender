// src/App.tsx
import React from "react";
import EmailForm from "./components/EmailForm";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <EmailForm />
      </div>
    </QueryClientProvider>
  );
};

export default App;
