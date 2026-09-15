import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, Instagram, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/larder-hero.jpg";
import signatureImage from "@/assets/larder-signature.jpg";
import interiorImage from "@/assets/larder-interior.jpg";
import breadImage from "@/assets/larder-bread.jpg";
import saladImage from "@/assets/larder-salad.jpg";
import eveningImage from "@/assets/larder-evening.jpg";

const menu = {
  Breakfast: [
    ["Soft eggs on sourdough", "Garden greens, cultured butter", "Sample price", heroImage],
    ["Morning grains", "Seasonal fruit, toasted seeds", "Sample price", saladImage],
    ["House-baked loaf", "Whipped butter, preserves", "Sample price", breadImage],
  ],
  Lunch: [
    ["Market greens", "Herbs, leaves, bright dressing", "Sample price", saladImage],
    ["Roasted roots", "Green sauce, toasted hazelnuts", "Sample price", signatureImage],
    ["Soup & sourdough", "The day's harvest, house loaf", "Sample price", breadImage],
  ],
  Dinner: [
    ["Fire-roasted vegetables", "Herb sauce, hazelnuts", "Sample price", signatureImage],
    ["Seasonal main", "Sourced with care, simply cooked", "Sample price", eveningImage],
    ["Something sweet", "A changing end to the evening", "Sample price", heroImage],
  ],
  Drinks: [
    ["House pour", "A considered glass for the season", "Sample price", eveningImage],
    ["Garden spritz", "Herbs, citrus, gentle sparkle", "Sample price", saladImage],
    ["Coffee", "Thoughtfully sourced and brewed", "Sample price", heroImage],
  ],
} as const;

const gallery = [
  { src: interiorImage, alt: "Warm dining room with timber tables and olive seating", size: "lg:col-span-5 lg:row-span-2" },
  { src: breadImage, alt: "Fresh sourdough loaf with cultured butter", size: "lg:col-span-3 lg:mt-28" },
  { src: saladImage, alt: "Seasonal green salad in a ceramic bowl", size: "lg:col-span-4 lg:mt-10" },
  { src: eveningImage, alt: "Candlelit restaurant table set for dinner", size: "lg:col-span-7 lg:col-start-4" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Larder & Folk | Thoughtfully Made Food" },
      { name: "description", content: "Larder & Folk — good food, thoughtfully made. A premium restaurant concept rooted in care, craft, and welcome." },
      { property: "og:title", content: "Larder & Folk | Thoughtfully Made Food" },
      { property: "og:description", content: "Good food, thoughtfully made." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const page = useRef<HTMLDivElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const dishPreview = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof menu>("Breakfast");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImage = lightboxIndex === null ? undefined : gallery[lightboxIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !page.current) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-image]", { clipPath: "inset(48% 15% 48% 15%)", scale: 1.12, duration: 1.25 })
        .from("[data-nav-item]", { y: 16, opacity: 0, stagger: 0.07, duration: 0.55 }, 0.25)
        .from("[data-hero-word]", { yPercent: 115, stagger: 0.11, duration: 0.85 }, 0.35)
        .from("[data-hero-detail]", { y: 18, opacity: 0, stagger: 0.08, duration: 0.55 }, 0.7);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(0 0 100% 0)",
          scale: 1.06,
          duration: 0.95,
          ease: "power3.inOut",
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        });
      });

      gsap.to("[data-signature-image]", {
        xPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: "#story", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });

      gsap.from("[data-footer-word]", {
        yPercent: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "footer", start: "top 82%", once: true },
      });
    }, page);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!menuPanel.current) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(menuPanel.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power3.inOut" });
      gsap.fromTo("[data-mobile-link]", { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, delay: 0.25, duration: 0.55, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); setLightboxIndex(null); }
      if (lightboxIndex !== null && event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (lightboxIndex !== null && event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const moveDishPreview = (event: MouseEvent<HTMLElement>) => {
    if (!dishPreview.current) return;
    gsap.to(dishPreview.current, { x: event.clientX + 24, y: event.clientY - 80, duration: 0.35, ease: "power3.out" });
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div ref={page} className="overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b editorial-rule bg-background/90 backdrop-blur-md">
        <nav className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:h-20 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12" aria-label="Main navigation">
          <a data-nav-item href="#top" className="font-display text-xl font-medium sm:text-2xl">Larder &amp; Folk</a>
          <div className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.13em] lg:flex">
            {["Menu", "Our Story", "Gallery", "Visit"].map((item) => (
              <a data-nav-item key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="border-b border-transparent py-2 transition-colors hover:border-foreground">{item}</a>
            ))}
          </div>
          <div data-nav-item className="hidden justify-self-end lg:block">
            <Button asChild variant="editorial" size="lg"><a href="#visit">Reserve a Table</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="justify-self-end lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu /></Button>
        </nav>
      </header>

      {mobileOpen && (
        <div ref={menuPanel} className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-primary p-5 text-primary-foreground lg:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-primary-foreground/25 pb-5">
            <span className="font-display text-2xl">Larder &amp; Folk</span>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label="Close menu" onClick={closeMobile}><X /></Button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3">
            {["Menu", "Our Story", "Gallery", "Visit"].map((item, index) => (
              <a data-mobile-link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={closeMobile} className="font-display text-5xl leading-none sm:text-7xl"><span className="mr-4 align-top font-sans text-xs">0{index + 1}</span>{item}</a>
            ))}
          </div>
          <Button data-mobile-link asChild variant="editorial-outline" size="lg"><a href="#visit" onClick={closeMobile}>Reserve a Table</a></Button>
        </div>
      )}

      <main id="top">
        <section className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-6 pt-20 sm:px-8 sm:pb-8 lg:px-12">
          <div data-hero-image className="absolute inset-x-4 bottom-6 top-20 overflow-hidden sm:inset-x-8 sm:bottom-8 lg:inset-x-12">
            <img src={heroImage} width={1920} height={1280} fetchPriority="high" alt="Thoughtfully laid breakfast table with eggs, sourdough and seasonal greens" className="h-full w-full object-cover" />
          </div>
          <div className="relative z-10 mx-auto mb-[10vh] w-full max-w-[1500px] text-center">
            <h1 className="font-display text-[clamp(4.4rem,13vw,12rem)] font-light leading-[0.78] text-foreground">
              <span className="inline-block overflow-hidden"><span data-hero-word className="inline-block">Larder</span></span>{" "}
              <span className="inline-block overflow-hidden"><span data-hero-word className="inline-block italic">&amp; Folk</span></span>
            </h1>
            <p data-hero-detail className="mt-7 text-sm font-medium uppercase tracking-[0.18em] sm:text-base">Good food, thoughtfully made.</p>
          </div>
          <a data-hero-detail href="#intro" aria-label="Scroll to introduction" className="relative z-10 flex w-fit items-center gap-3 text-xs uppercase tracking-[0.14em]"><ArrowDown className="size-4" /> Scroll</a>
        </section>

        <section id="intro" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12 lg:py-52">
          <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12">
            <p data-reveal className="text-xs uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">Our point of view</p>
            <div className="lg:col-span-9 lg:col-start-4">
              <h2 data-reveal className="font-display text-6xl font-light leading-[0.94] sm:text-8xl lg:text-[8.5rem]">Food made with care.<br /><span className="italic text-olive">People made welcome.</span></h2>
              <p data-reveal className="ml-auto mt-12 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">Larder &amp; Folk is imagined as a place for honest cooking, generous tables and the kind of welcome that makes you settle in. This concept copy is ready to be replaced with the restaurant’s real story.</p>
            </div>
          </div>
        </section>

        <section id="menu" className="border-y editorial-rule px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div data-reveal className="grid gap-8 border-b editorial-rule pb-12 lg:grid-cols-2 lg:items-end">
              <div><p className="mb-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">Concept menu · sample only</p><h2 className="font-display text-6xl font-light sm:text-8xl">At the table</h2></div>
              <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-end">
                {(Object.keys(menu) as Array<keyof typeof menu>).map((category) => (
                  <Button key={category} role="tab" aria-selected={activeCategory === category} variant="ghost" onClick={() => setActiveCategory(category)} className={`h-auto rounded-none px-0 py-2 text-base ${activeCategory === category ? "border-b border-foreground" : "text-muted-foreground"}`}>{category}</Button>
                ))}
              </div>
            </div>
            <div role="tabpanel" className="divide-y editorial-rule">
              {menu[activeCategory].map(([name, description, price, image], index) => (
                <article key={`${activeCategory}-${name}`} data-reveal onMouseEnter={() => setPreviewImage(image)} onMouseLeave={() => setPreviewImage(null)} onMouseMove={moveDishPreview} className="group grid cursor-default grid-cols-[minmax(0,1fr)_auto] gap-5 py-7 sm:py-9 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
                  <h3 className="font-display text-3xl font-light transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{name}</h3>
                  <p className="col-span-2 text-sm text-muted-foreground lg:col-span-1">{description}</p>
                  <p className="text-right text-xs uppercase tracking-[0.12em] text-earth">{price}</p>
                </article>
              ))}
            </div>
            <div data-reveal className="mt-12 flex flex-wrap items-center justify-between gap-5"><p className="max-w-md text-sm text-muted-foreground">Dish names and pricing are placeholders for presentation only.</p><Button asChild variant="editorial-outline" size="lg"><a href="#visit">View Full Menu</a></Button></div>
          </div>
        </section>

        <div ref={dishPreview} className={`pointer-events-none fixed left-0 top-0 z-50 hidden h-44 w-56 overflow-hidden border-4 border-background shadow-xl lg:block ${previewImage ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          {previewImage && <img src={previewImage} alt="" className="h-full w-full object-cover" />}
        </div>

        <section id="our-story" className="grid bg-primary text-primary-foreground lg:min-h-screen lg:grid-cols-2">
          <div data-clip className="h-[70svh] overflow-hidden lg:h-screen"><img data-signature-image src={signatureImage} width={1440} height={1104} loading="lazy" alt="Roasted seasonal vegetables with herbs on a dark ceramic plate" className="h-full w-[110%] max-w-none object-cover" /></div>
          <div className="flex items-center px-6 py-24 sm:px-12 lg:px-20">
            <div className="max-w-xl"><p data-reveal className="mb-8 text-xs uppercase tracking-[0.16em] text-primary-foreground/65">The Larder way</p><h2 data-reveal className="font-display text-6xl font-light leading-[0.95] sm:text-8xl">Made from<br />the <span className="italic">good stuff.</span></h2><p data-reveal className="mt-10 max-w-lg text-lg leading-relaxed text-primary-foreground/75">A simple approach: begin with ingredients worth caring about, cook them with attention, and serve them without fuss. Replace this concept statement with the kitchen’s real sourcing and food philosophy.</p></div>
          </div>
        </section>

        <section id="gallery" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 data-reveal className="font-display text-6xl font-light sm:text-8xl">From the larder<br /><span className="italic text-olive">to the table.</span></h2><p data-reveal className="max-w-md text-lg leading-relaxed text-muted-foreground lg:justify-self-end">A glimpse of the food, details and rooms that shape the experience.</p></div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
              {gallery.map((image, index) => (
                <Button key={image.src} variant="ghost" onClick={() => setLightboxIndex(index)} className={`group relative h-auto overflow-hidden rounded-none p-0 focus-visible:ring-2 ${image.size}`} aria-label={`View image ${index + 1}: ${image.alt}`}>
                  <div data-clip className={`w-full overflow-hidden ${index === 0 ? "aspect-[4/5]" : index === 3 ? "aspect-[16/9]" : "aspect-[4/3]"}`}><img src={image.src} width={index === 0 ? 1104 : index === 1 ? 1008 : index === 2 ? 1312 : 1600} height={index === 0 ? 1504 : index === 1 ? 1312 : index === 2 ? 912 : 1008} loading="lazy" alt={image.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div>
                  <span className="absolute bottom-4 right-4 grid size-16 place-items-center rounded-full bg-background text-[10px] font-medium tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">VIEW</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y editorial-rule bg-paper-deep px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5"><p data-reveal className="mb-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">Around our table</p><h2 data-reveal className="font-display text-7xl font-light leading-[0.9] sm:text-9xl">Come hungry.<br /><span className="italic text-earth">Stay a while.</span></h2><p data-reveal className="mt-10 max-w-md text-lg leading-relaxed text-ink-soft">Unhurried lunches, candlelit evenings, and a room designed for conversation. Real atmosphere details can replace this concept copy.</p></div>
            <div data-clip className="h-[65svh] overflow-hidden lg:col-span-6 lg:col-start-7"><img src={interiorImage} width={1104} height={1504} loading="lazy" alt="Warm Larder & Folk concept dining room" className="h-full w-full object-cover" /></div>
          </div>
        </section>

        <section id="visit" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 border-b editorial-rule pb-20 lg:grid-cols-12">
              <h2 data-reveal className="font-display text-7xl font-light sm:text-9xl lg:col-span-6">Plan your visit.</h2>
              <div data-reveal className="lg:col-span-5 lg:col-start-8"><p className="text-lg leading-relaxed text-muted-foreground">Everything below is intentionally marked for replacement. Add the restaurant’s confirmed details before launch.</p><Button variant="editorial" size="lg" className="mt-8" onClick={() => document.querySelector("#contact-details")?.scrollIntoView({ behavior: "smooth" })}>Plan Your Visit</Button></div>
            </div>
            <div id="contact-details" className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
              {[["Address", "Location details to be supplied"], ["Opening hours", "Service hours to be supplied"], ["Contact", "Phone and email to be supplied"]].map(([label, value]) => <div data-reveal key={label}><p className="mb-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="max-w-[15rem] font-display text-2xl">{value}</p></div>)}
              <div data-reveal><p className="mb-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">Follow</p><span className="flex items-center gap-3 font-display text-2xl"><Instagram className="size-5" /> Instagram link to be supplied</span></div>
            </div>
            <div data-reveal className="grid min-h-72 place-items-center border editorial-rule bg-muted px-6 text-center"><div><p className="font-display text-4xl">Map location</p><p className="mt-3 text-sm text-muted-foreground">The confirmed address will be used for the live map.</p></div></div>
          </div>
        </section>
      </main>

      <footer className="bg-primary px-5 pb-7 pt-20 text-primary-foreground sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 border-b border-primary-foreground/25 pb-16 sm:grid-cols-2 lg:grid-cols-4"><div><p className="font-display text-3xl">Larder &amp; Folk</p><p className="mt-3 text-sm text-primary-foreground/60">Good food, thoughtfully made.</p></div>{["Address to be supplied", "Hours to be supplied", "Contact · Instagram"].map((item) => <p key={item} className="text-sm text-primary-foreground/65 lg:text-right">{item}</p>)}</div>
          <div className="overflow-hidden py-8"><p data-footer-word className="whitespace-nowrap font-display text-[clamp(4rem,14.5vw,13.5rem)] font-light leading-none">Larder <span className="italic">&amp; Folk</span></p></div>
          <div className="flex flex-wrap justify-between gap-4 border-t border-primary-foreground/25 pt-6 text-[10px] uppercase tracking-[0.14em] text-primary-foreground/50"><p>Concept website · details pending</p><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>

      {lightboxIndex !== null && lightboxImage && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-primary/95 p-4 text-primary-foreground" role="dialog" aria-modal="true" aria-label="Image gallery">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => setLightboxIndex(null)} aria-label="Close gallery"><X /></Button>
          <Button variant="ghost" size="icon" className="absolute left-3 top-1/2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:left-8" onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><ArrowLeft /></Button>
          <img src={lightboxImage.src} alt={lightboxImage.alt} className="max-h-[82vh] max-w-[82vw] object-contain" />
          <Button variant="ghost" size="icon" className="absolute right-3 top-1/2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:right-8" onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)} aria-label="Next image"><ArrowRight /></Button>
          <p className="absolute bottom-5 text-xs tracking-[0.14em]">{lightboxIndex + 1} / {gallery.length}</p>
        </div>
      )}
    </div>
  );
}