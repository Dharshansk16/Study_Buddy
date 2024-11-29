import React from "react";
import TeamMember from "../(root)/_components/common/TeamMember";
import styles from "./About.module.css";

export default function Page() {
  const particles = Array.from({ length: 10 }).map((_, index) => {
    const randomTop = Math.random() * 100;
    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 5;

    return (
      <div
        key={index}
        className={styles.particle}
        style={{
          top: `${randomTop}%`,
          left: `${randomLeft}%`,
          animationDelay: `${randomDelay}s`,
        }}
      ></div>
    );
  });

  return (
    <>
      <div className={styles.container}>
        <div className="relative mx-auto px-12 py-10 text-center bg-gray-900 text-gray-800 overflow-hidden">
          {particles}

          <section className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 text-white rounded-lg shadow-md p-8 my-10 animate-bg-scroll relative z-10">
            <h2 className="text-4xl font-extrabold mb-6">About</h2>
            <p className="text-lg mb-4">
              StudyBuddy is your ultimate companion for mastering your study
              material. With the power to quickly extract relevant information
              from PDFs, we streamline the study process and help you focus on
              what truly matters—learning and success. No more tedious searches;
              let StudyBuddy guide you with precision and speed.
            </p>
            <p className="text-lg">
              Our focus on privacy and security ensures your data stays
              protected. With robust encryption, seamless user authentication,
              and secure storage, you can use StudyBuddy confidently, knowing
              your materials are safe. We are committed to helping students
              succeed smarter, not harder.
            </p>
          </section>

          <div className="flex flex-wrap justify-center gap-16 relative z-10">
            <TeamMember
              name="Darshan Kotian"
              role="Project Lead & Backend Developer"
              imageSrc="/about/darshanpfp.png"
            />
            <TeamMember
              name="Ronith J Salian"
              role="Frontend Developer"
              imageSrc="/about/ronithpfp.jpg"
            />
            <TeamMember
              name="Himanshu"
              role="Frontend Developer"
              imageSrc="/about/Himanshupfp.jpg"
            />
            <TeamMember
              name="Rashmitha R Nayak"
              role="Frontend Developer"
              imageSrc="/about/rashmithapfp.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
