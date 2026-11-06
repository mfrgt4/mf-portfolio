/** Animations complètes ? Respecte la préférence système, sauf si le visiteur les force via le bouton du menu. */
export const motionOn = () => {
  const d = document.documentElement.dataset.motion;
  return d === "on" || (d !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches);
};
