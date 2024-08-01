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

export const animateElement = (element: HTMLElement, target: Element) => {
  element.style.transition = "all 0.5s";
  element.style.top = `${target.getBoundingClientRect().top}px`;
  element.style.left = `${target.getBoundingClientRect().left}px`;
  element.style.width = `${target.getBoundingClientRect().width}px`;
  element.style.height = `${target.getBoundingClientRect().height}px`;
};

export const setParentBackground = (element: Element, color: string) => {
  const parent = element.parentElement as HTMLElement;
  parent.style.transition = "all 0.5s";
  parent.style.backgroundColor = color;
};
