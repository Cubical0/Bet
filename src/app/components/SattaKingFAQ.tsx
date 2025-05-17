import React from 'react';

const faqData = [
  {
    question: 'What is Satta King?',
    answer: `Satta King (सट्टा किंग) is a number lottery betting game. Satta Matka is an early form of gambling in India...`,
  },
  {
    question: 'History Of Satta King (Matka) Game',
    answer: `The game initially started in Bombay (Current Mumbai) in the early 1950s, where people used to bet on cotton prices...`,
  },
  {
    question: 'How to Play Satta King Online?',
    answer: `In this sport, a slip from 1 to 100 numbers is put in a pot...`,
  },
  {
    question: 'What are Types of Satta King game?',
    answer: `Many types of Satta king games are played worldwide, but the most notable ones are Gali, Desawar, Ghaziabad and Faridabad...`,
  },
  {
    question: 'Why do people play Satta King?',
    answer: `The very simple answer is people want to get rich quickly without hard work...`,
  },
  {
    question: 'The Reality of Satta King Game?',
    answer: `Satta King is supposedly a lottery game, but in reality, the winner is manipulated based on profit for organizers...`,
  },
  {
    question: 'Satta King Leak Number',
    answer: `Some claim to provide "leaked numbers" for Gali and Disawar games, but these are misleading and exploit losses...`,
  },
  {
    question: 'SATTA KING DISCLAIMER',
    answer: `We and our site (SATTAKINGY.IN) are not involved with any gambling activity. This is just for informational purposes...`,
  },
];

const SattaKingFAQ = () => {
  return (
    <section className="bg-[#0c0b2e] text-white py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-5xl mx-auto grid gap-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1e1b4b] border border-red-600 rounded-xl shadow-lg p-6 space-y-3"
          >
            <h2 className="text-xl md:text-2xl font-bold text-red-400">
              {faq.question}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SattaKingFAQ;
