import React from "react";

type DashboardHaderProps = {
  title: string;
  subtitle: string;
};

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHaderProps) {
  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Action Section */}
        <div>
          <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm font-semibold shadow">
            Explore Features
          </button>
        </div>
      </div>
    </header>
  );
}
