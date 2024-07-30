'use client';

import ProtectedRoute from "@/components/ProtectedRoute";


function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      Hello
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
