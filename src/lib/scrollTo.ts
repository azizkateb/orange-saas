export function scrollToSection(target: string) {
  const event = new CustomEvent("lenis-scroll-to", {
    detail: target,
  });
  window.dispatchEvent(event);
}
