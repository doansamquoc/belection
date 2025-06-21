import { useEffect, useState } from "react";

const words = ["Welcome to VoteChain.", "Let's get started."];

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setIsDeleting(true);
          setTypingSpeed(3000);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
        setTypingSpeed(50);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingSpeed, wordIndex]);

  return (
    <div className='text-2xl font-bold'>
      {text}
      <span className='animate-pulse'>|</span>
    </div>
  );
};

export default TypingEffect;
