/* NUMIN placeholder — gentle reveals + obfuscated contact */
(function () {
  "use strict";
  const reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* reveals — rect-based so they fire on load in any context */
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if (reduce) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    let pending = reveals.slice();
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) { el.classList.add("in"); return false; }
        return true;
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 2500);
  }

  /* contact — assemble mailto at runtime so the address is never in the source */
  const user = "verdi", domain = "numin.com";
  const addr = user + "@" + domain;
  document.querySelectorAll("[data-contact]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mailto:" + addr + "?subject=" + encodeURIComponent("Numin");
    });
  });

  /* procedural ink drift — the Rorschach breathes, as if still wet */
  const turb = document.getElementById("inkturb");
  const disp = document.getElementById("inkdisp");
  const heroInk = document.getElementById("heroInk");
  if (turb && disp && !reduce) {
    const baseFx = 0.0130, baseFy = 0.0180, baseScale = 78;
    let t = 0, last = 0;
    function frame(now) {
      if (now - last > 42) {
        last = now;
        t += 0.0016;
        const fx = baseFx + Math.sin(t * 0.9) * 0.0022;
        const fy = baseFy + Math.cos(t * 0.7) * 0.0026;
        const sc = baseScale + Math.sin(t * 1.3) * 14;
        turb.setAttribute("baseFrequency", fx.toFixed(5) + " " + fy.toFixed(5));
        disp.setAttribute("scale", sc.toFixed(2));
        if (heroInk) {
          const s = 1 + Math.sin(t * 1.1) * 0.012;
          const r = Math.sin(t * 0.5) * 0.6;
          heroInk.style.transformOrigin = "center";
          heroInk.style.transform = "scale(" + s.toFixed(4) + ") rotate(" + r.toFixed(3) + "deg)";
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
