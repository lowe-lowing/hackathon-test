"use client";
import { animateElement, cn, createAndSpawnElement, setParentBackground } from "@/utils";
import { useState } from "react";

const elements = Array.from({ length: 10 });

export default function Home() {
  const [animState, setAnimState] = useState<"up" | "down">("down");

  const startAnimation = () => {
    elements.forEach((_, i) => {
      setTimeout(() => {
        if (animState === "down") {
          const bigCard = document.querySelector(`.card-big-${i}`) as Element;
          const newElement = createAndSpawnElement(bigCard);
          bigCard.setAttribute("style", "visibility: hidden");
          const smallCard = document.querySelector(`.card-small-${i}`) as Element;
          animateElement(newElement, smallCard);
          newElement.addEventListener("transitionend", () => {
            smallCard.setAttribute("style", "visibility: visible");
            newElement.remove();
            setParentBackground(smallCard, "#9ca3af");
          });
        }
        if (animState === "up") {
          const smallCard = document.querySelector(`.card-small-${i}`) as Element;
          const newElement = createAndSpawnElement(smallCard);
          smallCard.setAttribute("style", "visibility: hidden");
          setParentBackground(smallCard, "transparent");
          const bigCard = document.querySelector(`.card-big-${i}`) as Element;
          animateElement(newElement, bigCard);
          newElement.addEventListener("transitionend", () => {
            bigCard.setAttribute("style", "visibility: visible");
            newElement.remove();
          });
        }
      }, i * 50);
    });
    setAnimState((prev) => (prev === "down" ? "up" : "down"));
  };

  return (
    <main className="h-screen overflow-hidden relative">
      <div className="h-full w-full absolute top-0 left-0">
        <div className="animation-space h-full w-full relative"></div>
      </div>
      <div className="h-full w-full flex items-center justify-center relative">
        <div
          onClick={startAnimation}
          className={cn("flex gap-3 flex-wrap justify-center cursor-pointer", {
            "pointer-events-none": animState === "up",
          })}
        >
          {elements.map((_, i) => (
            <div key={i} className={`w-32 h-32 bg-cyan-400 rounded-md card-big-${i}`}></div>
          ))}
        </div>
        <div
          onClick={startAnimation}
          className={cn("flex gap-3 flex-wrap justify-center absolute bottom-0 mb-4 p-2 rounded-md cursor-pointer", {
            "pointer-events-none": animState === "down",
          })}
        >
          {elements.map((_, i) => (
            <div key={i} className={`w-16 h-16 bg-cyan-400 rounded-md invisible card-small-${i}`}></div>
          ))}
        </div>
      </div>
    </main>
  );
}
