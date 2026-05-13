import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
