"use client"

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark} from "@clerk/themes";
import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const NonDashboardNavbar = () => {
  const {user} = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";

  return (
    <nav className="nondashboard-navbar">
      <div className="nondashboard-navbar__container">
        <Link href="/" className="nondashboard-navbar__brand">
          LMS
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="nondashboard-navbar__search">
              <Link
                href="/search"
                className="nondashboard-navbar__search-input"
              >
                <span className="hidden sm:inline">Search Course</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen
                className="nondashboard-navbar__search-icon"
                size={18}
              />
            </div>
          </div>
        </div>
        <div className="nondashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification" size={18} />
          </button>

          <SignedIn>
            <UserButton appearance={{
              baseTheme: dark,
              elements: {
                userButtonOuterIdentifier: "text-customgreys-dartyGrey",
                userButtonBox: "scale-90 sm:scale-100", 
              }
            }}
            showName={true}
            userProfileMode="navigation"
            userProfileUrl={
              userRole === "teacher" ? "/teacher/profile" : "/student/profile"
            }
            />
          </SignedIn>
          <SignedOut>
            <Link href="/signin" className="nondashboard-navbar__auth-button--login">Log in</Link>
            <Link href="/signup" className="nondashboard-navbar__auth-button--singup">Sign Up</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;
