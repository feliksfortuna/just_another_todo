"use client"

import Image from "next/image";
import LoginModal from "@/components/loginModal";
import { use, useState } from "react";
import "./style.css";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenModal = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 welcome-page">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Just Another Todo App
      </h1>
      <p className="text-center ">
      Welcome to <b>Just Another Todo App</b>, your simple yet powerful tool to stay organized and on top of your tasks. With a clean and intuitive interface, you can easily create, manage, and track your daily to-dos. Whether you&apos;re online or offline, your tasks are always within reach, syncing seamlessly across your devices. Set reminders, categorize your tasks, and enjoy the flexibility of managing your to-do list wherever you go. Install Just Another Todo App on your device and experience the convenience of staying organized, anytime, anywhere. Get things done effortlessly with Just Another Todo App!
      </p>

      <div className="center-button-container">
        <button type="button" onClick={handleOpenModal} className="center-button">Get Started</button>
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
      </div>
    </main>
  );
}
