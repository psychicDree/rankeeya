const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.count || '';
    if (!/^\d+$/.test(raw)) {
      countObserver.unobserve(el);
      return;
    }
    const end = Number(raw);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const animate = now => {
      const progress = Math.min((now - start) / 750, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.floor(end * eased).toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(counter => countObserver.observe(counter));
