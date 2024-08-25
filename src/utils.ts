import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createAndSpawnElement = (cardElement: Element) => {
  const newElement = cardElement.cloneNode() as HTMLElement;
  const animationSpace = document.querySelector(".animation-space") as HTMLElement;
  newElement.style.position = "absolute";
  newElement.style.top = `${cardElement.getBoundingClientRect().top}px`;
  newElement.style.left = `${cardElement.getBoundingClientRect().left}px`;
  newElement.style.zIndex = "10";
  // add new element to animation space exactly on top of card
  animationSpace.appendChild(newElement);
  return newElement;
};

const transitionTimingFunction = "cubic-bezier(0.500, 0.250, 0.525, 1.210)";

export const animateElement = (element: HTMLElement, target: Element) => {
  element.style.transition = "all 0.5s";
  element.style.transitionTimingFunction = transitionTimingFunction;
  element.style.top = `${target.getBoundingClientRect().top}px`;
  element.style.left = `${target.getBoundingClientRect().left}px`;
  element.style.width = `${target.getBoundingClientRect().width}px`;
  element.style.height = `${target.getBoundingClientRect().height}px`;
};

export const setParentBackground = (element: Element, color: string) => {
  const parent = element.parentElement as HTMLElement;
  parent.style.animationTimingFunction = transitionTimingFunction;
  parent.style.transition = "all 0.5s";
  parent.style.backgroundColor = color;
};
