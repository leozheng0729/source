const revealItems = document.querySelectorAll("[data-reveal]")

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.14
    }
  )

  revealItems.forEach((item) => observer.observe(item))
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"))
}
