"use client";
import React, { useEffect, useState } from "react";
import NavButton from "./NavButton";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`navbar px-4 md:px-8  fixed z-50 top-0 w-full transition-all duration-300 ${
          isScrolled ? "bg-zinc-900/70 backdrop-blur-md" : "bg-zinc-900"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white  bg-zinc-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/chat">Study Buddy</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            href="/"
            className="btn btn-ghost text-[16px] md:text-xl text-white"
          >
            <Image
              className={styles.logo}
              src="/logo.svg"
              alt="logo"
              width={37}
              height={37}
            />

            <span>Study Buddy</span>
          </Link>
        </div>
        <div className="navbar-end">
          <NavButton text="Login" />
        </div>
      </div>
      <div className="pb-16"></div>
    </>
  );
}
