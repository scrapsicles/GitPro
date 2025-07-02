"use client";
import React from "react";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`newtons-cradle ${className}`}>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
    </div>
  );
}
