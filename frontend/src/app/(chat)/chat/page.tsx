"use client";
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";
import Link from "next/link";

export default function ChatDashboard() {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState<String[]>([]);

  const handleSaveNote = () => {
    if (notes.trim()) {
      setSavedNotes((prevNotes) => [...prevNotes, notes.trim()]);
      setNotes(""); // Clear input after saving
    }
  };

  return (
    <div className="h-screen max-h-screen bg-gray-800 flex flex-col w-full text-white">
      <DashboardHeader
        title="Study Buddy Dashboard"
        subtitle="Your gateway to smarter learning."
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col space-y-4 p-4 overflow-y-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold">Welcome to Study Buddy!</h1>
            <p className="text-sm mt-2">
              Boost your productivity and take your learning journey to the next
              level. Explore resources, stay motivated, and achieve your goals!
            </p>
          </div>

          {/* Content Sections */}
          <div className="flex flex-1 space-x-4">
            {/* Quick Tips */}
            <div className="w-1/4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg overflow-hidden p-4">
              <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>
                    Set small, achievable goals for each study session.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Take regular breaks to stay focused.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Use visual aids like mind maps and charts.</span>
                </li>
              </ul>
            </div>

            {/* Quick Notes */}
            <div className="w-1/2 bg-gray-900 rounded-lg border border-gray-700 shadow-lg overflow-hidden p-4">
              <h2 className="text-lg font-semibold mb-4">Quick Notes</h2>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm text-white focus:ring focus:ring-blue-500"
                rows={5}
                placeholder="Write your quick notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                onClick={handleSaveNote}
              >
                Save Note
              </button>
              {savedNotes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Saved Notes:</h3>
                  <ul className="space-y-2 text-gray-400">
                    {savedNotes.map((note, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-800 rounded-lg border border-gray-600"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-1/4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg overflow-hidden p-4">
              <h2 className="text-lg font-semibold mb-4">Did You Know?</h2>
              <ul className="space-y-2 text-blue-400">
                <li className="hover:underline">
                  <Link href="https://www.osmosis.org/blog/2022/02/21/active-recall-the-most-effective-highyield-learning-technique">
                    Active recall is one of the best study techniques.
                  </Link>
                </li>

                <li className="hover:underline">
                  <Link href="https://www.techtarget.com/whatis/definition/pomodoro-technique#:~:text=The%20Pomodoro%20Technique%20is%20a,tomato%20(plural%3A%20pomodori).">
                    {" "}
                    The Pomodoro Technique can enhance focus.
                  </Link>
                </li>

                <li className="hover:underline">
                  <Link href="https://www.scientificamerican.com/article/why-writing-by-hand-is-better-for-memory-and-learning/">
                    Writing by hand improves memory retention.
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
