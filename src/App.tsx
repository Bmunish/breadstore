import { useEffect, useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Bread" | "Pastry" | "Pantry";
  price: number;
  note: string;
  image: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "Mother Sourdough", category: "Bread", price: 340, note: "24-hour ferment · 650g", image: "/assets/hero-sourdough.png", badge: "Bestseller" },
  { id: 2, name: "Seeded Country Loaf", category: "Bread", price: 380, note: "Flax, sesame & sunflower", image: "/assets/bread-basket.jpg", badge: "High fibre" },
  { id: 3, name: "Butter Croissants", category: "Pastry", price: 420, note: "Box of 4 · cultured butter", image: "/assets/croissants.jpg", badge: "Weekend bake" },
  { id: 4, name: "Milk Bread", category: "Bread", price: 280, note: "Cloud-soft · family loaf", image: "/assets/sliced-loaf.jpg" },
  { id: 5, name: "Sourdough Granola", category: "Pantry", price: 460, note: "Cacao, almond & sea salt", image: "/assets/bread-basket.jpg", badge: "New" },
  { id: 6, name: "Pain au Chocolat", category: "Pastry", price: 480, note: "Box of 4 · 55% dark", image: "/assets/croissants.jpg" },
  { id: 7, name: "Rye & Caraway Loaf", category: "Bread", price: 360, note: "30% dark rye · Nordic style", image: "/assets/sliced-loaf.jpg", badge: "Artisan" },
  { id: 8, name: "Almond Croissant", category: "Pastry", price: 460, note: "Twice-baked · frangipane", image: "/assets/croissants.jpg" },
  { id: 9, name: "Wild Honey & Sea Salt Loaf", category: "Bread", price: 390, note: "Raw forest honey glaze", image: "/assets/hero-sourdough.png", badge: "Chef's pick" },
  { id: 10, name: "Rosemary & Olive Focaccia", category: "Bread", price: 350, note: "EVOO · sea salt flakes", image: "/assets/bread-basket.jpg" },
];

const stories = [
  { tag: "The journal", title: "Why our bread takes twenty-four hours", copy: "A slower ferment unlocks deeper flavour—and bread that simply feels better.", image: "/assets/sliced-loaf.jpg" },
  { tag: "Field notes", title: "Flour, water, salt, time", copy: "Meet the small millers and thoughtful ingredients behind each morning’s bake.", image: "/assets/bread-basket.jpg" },
  { tag: "Coming soon", title: "The monsoon bake list", copy: "Warm babka, spiced buns and a limited roasted garlic sourdough.", image: "/assets/croissants.jpg" },
];

const collections = [
  { name: "Daily bread", count: "4 everyday loaves", image: "/assets/sliced-loaf.jpg", filter: "Bread" },
  { name: "Weekend table", count: "Croissants & pastries", image: "/assets/croissants.jpg", filter: "Pastry" },
  { name: "The Mother’s edit", count: "Our most-loved bake box", image: "/assets/hero-sourdough.png", filter: "All", featured: true },
  { name: "Good pantry", count: "Granola & accompaniments", image: "/assets/bread-basket.jpg", filter: "Pantry" },
];

const localities = [
  { name: "Select your locality", promise: "Choose an area to see delivery timing" },
  { name: "Bandra", promise: "Next-day delivery by noon" },
  { name: "Juhu", promise: "Next-day delivery by noon" },
  { name: "Andheri", promise: "Next-day delivery by 1 PM" },
  { name: "Powai", promise: "Next-day delivery by noon" },
  { name: "Ghatkopar", promise: "Same-morning delivery available" },
  { name: "Lower Parel", promise: "Next-day delivery by 1 PM" },
  { name: "Worli", promise: "Next-day delivery by 1 PM" },
  { name: "South Mumbai", promise: "Delivery Tuesday–Saturday" },
  { name: "Other Mumbai area", promise: "Message us to confirm your pin code" },
];

const heroBakes = [
  { image: "/assets/hero-sourdough.png", name: "Mother Sourdough", price: 340, position: "center" },
  { image: "/assets/croissants.jpg", name: "Butter Croissants", price: 420, position: "center" },
  { image: "/assets/sliced-loaf.jpg", name: "Milk Bread", price: 280, position: "center" },
];

function Icon({ name, className = "size-5" }: { name: "bag" | "arrow" | "menu" | "close" | "minus" | "plus" | "pin"; className?: string }) {
  const paths = {
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    minus: <path d="M6 12h12" />,
    plus: <path d="M12 6v12M6 12h12" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function SmartImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}><span>Grain<br />Mother</span></div>;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

function BreadCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };
    const hover = (event: PointerEvent) => cursor.classList.toggle("is-hovering", Boolean((event.target as HTMLElement).closest("a, button, select")));
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", hover);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", hover); };
  }, []);
  return <div ref={cursorRef} className="bread-cursor" aria-hidden="true"><span /></div>;
}

function BreadCharacter({ type }: { type: "normal" | "royal" | "superman" }) {
  return (
    <div className="relative size-12 sm:size-16 shrink-0 select-none">
      {/* Superman Cape */}
      {type === "superman" && (
        <div className="absolute -left-2 -top-0.5 w-7 h-11 sm:w-9 sm:h-13 z-0 animate-cape-flutter pointer-events-none">
          <svg viewBox="0 0 50 70" fill="none" className="w-full h-full drop-shadow-md">
            <path d="M15 8 C5 25, 0 50, 6 68 C18 64, 30 68, 42 62 C34 42, 30 20, 26 8 Z" fill="#DC2626" />
          </svg>
        </div>
      )}

      {/* Main Bread Body with bounce animation */}
      <div className="relative z-10 w-full h-full animate-bread-bounce">
        <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-lg" fill="none">
          {/* Sourdough Loaf Body */}
          <path 
            d="M12 45 C10 20, 30 8, 50 8 C70 8, 90 20, 88 45 C86 64, 70 70, 50 70 C30 70, 14 64, 12 45 Z" 
            fill="#C27835" 
            stroke="#633010" 
            strokeWidth="3.5"
          />
          {/* Highlight crust */}
          <path 
            d="M20 38 C22 18, 38 12, 50 12 C62 12, 78 18, 80 38" 
            stroke="#E9AA54" 
            strokeWidth="4" 
            strokeLinecap="round" 
            opacity="0.85"
          />
          {/* Bread scoring marks / ears */}
          <path d="M36 24 C44 26, 48 33, 44 38" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 20 C58 22, 62 29, 58 34" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M64 25 C70 28, 72 34, 69 39" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Emoji Face */}
          {/* Cheeks */}
          <circle cx="28" cy="46" r="4.5" fill="#F43F5E" opacity="0.4" />
          <circle cx="72" cy="46" r="4.5" fill="#F43F5E" opacity="0.4" />
          {/* Eyes */}
          {type === "superman" ? (
            /* Determined brave eyes */
            <>
              <ellipse cx="36" cy="40" rx="3.5" ry="4" fill="#321A10" />
              <circle cx="37.5" cy="38.5" r="1.5" fill="#FFFFFF" />
              <ellipse cx="64" cy="40" rx="3.5" ry="4" fill="#321A10" />
              <circle cx="65.5" cy="38.5" r="1.5" fill="#FFFFFF" />
            </>
          ) : (
            /* Happy cute eyes */
            <>
              <ellipse cx="36" cy="42" rx="3.5" ry="4" fill="#321A10" />
              <circle cx="37.5" cy="40.5" r="1.5" fill="#FFFFFF" />
              <ellipse cx="64" cy="42" rx="3.5" ry="4" fill="#321A10" />
              <circle cx="65.5" cy="40.5" r="1.5" fill="#FFFFFF" />
            </>
          )}
          {/* Smile */}
          <path d="M44 47 C47 52, 53 52, 56 47" stroke="#321A10" strokeWidth="2.5" strokeLinecap="round" />

          {/* Superman Shield Emblem */}
          {type === "superman" && (
            <g transform="translate(42, 54)">
              <polygon points="8,0 16,3 13,12 8,16 3,12 0,3" fill="#EAB308" stroke="#DC2626" strokeWidth="1.5" />
              <text x="5.5" y="11" fill="#DC2626" fontSize="9" fontWeight="900" fontFamily="sans-serif">S</text>
            </g>
          )}
        </svg>

        {/* Royal Crown for The Mother's Box */}
        {type === "royal" && (
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20 animate-crown-float pointer-events-none w-8 sm:w-11">
            <svg viewBox="0 0 60 40" fill="none" className="w-full h-full drop-shadow-md">
              {/* Crown Base */}
              <polygon points="6,34 54,34 50,14 38,24 30,6 22,24 10,14" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
              {/* Jewels */}
              <circle cx="30" cy="8" r="3.5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
              <circle cx="10" cy="15" r="2.8" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1" />
              <circle cx="50" cy="15" r="2.8" fill="#10B981" stroke="#064E3B" strokeWidth="1" />
              <circle cx="30" cy="28" r="2.2" fill="#FFFFFF" />
              {/* Band */}
              <rect x="7" y="31" width="46" height="4" rx="2" fill="#D97706" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ 
  product, 
  onAdd, 
  onBuyNow,
  compact = false
}: { 
  product: Product; 
  onAdd: (product: Product) => void; 
  onBuyNow: (product: Product) => void; 
  compact?: boolean;
}) {
  return (
    <article className="product-card group flex h-full flex-col justify-between rounded-[1.4rem] border border-[#321a10]/10 bg-white/80 p-2.5 sm:p-3.5 shadow-sm transition-all duration-300 hover:border-[#321a10]/25 hover:bg-white hover:shadow-xl">
      <div className="flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] sm:rounded-[1.2rem] bg-[#ead9c4]">
          <SmartImage src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {product.badge && <span className="absolute left-2.5 top-2.5 rounded-full bg-[#fffaf1]/95 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-[.08em] text-[#321a10] shadow-sm backdrop-blur">{product.badge}</span>}
          <button 
            type="button"
            onClick={() => onAdd(product)} 
            className="absolute bottom-2.5 right-2.5 grid size-9 sm:size-10 place-items-center rounded-full bg-[#321a10] text-white shadow-md transition-all hover:scale-110 hover:bg-[#d96a3b] focus-visible:outline-2 focus-visible:outline-offset-2" 
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon name="plus" className="size-4" />
          </button>
        </div>
        
        {/* Name and Price on same flex row with no wrap overflow */}
        <div className="pt-2.5 sm:pt-3 flex flex-col justify-between flex-1">
          <div className="flex items-baseline justify-between gap-1.5">
            <h3 className="font-display text-sm sm:text-lg font-bold leading-tight line-clamp-1 text-[#321a10]">{product.name}</h3>
            <span className="shrink-0 font-display text-sm sm:text-lg font-black text-[#321a10]">₹{product.price}</span>
          </div>
          <p className="mt-1 text-[11px] sm:text-xs text-[#6b5549] line-clamp-1">{product.note}</p>
        </div>
      </div>
      
      {/* Action Buttons: Add to Bag & Buy Now cleanly aligned */}
      <div className="mt-2.5 sm:mt-3 flex gap-1.5 pt-2 border-t border-[#321a10]/10">
        <button 
          type="button"
          onClick={() => onAdd(product)}
          className="flex-1 flex min-h-8 sm:min-h-9 items-center justify-center gap-1 rounded-full border border-[#321a10]/20 bg-transparent px-1.5 py-1 text-[10px] sm:text-xs font-bold text-[#321a10] transition hover:border-[#321a10] hover:bg-[#321a10] hover:text-white"
        >
          <Icon name="bag" className="size-3 sm:size-3.5 shrink-0" />
          <span className="whitespace-nowrap">Add</span>
        </button>
        <button 
          type="button"
          onClick={() => onBuyNow(product)}
          className="flex-1 flex min-h-8 sm:min-h-9 items-center justify-center gap-1 rounded-full bg-[#d96a3b] px-1.5 py-1 text-[10px] sm:text-xs font-bold text-white transition hover:bg-[#b94f29] shadow-sm"
        >
          <span className="whitespace-nowrap">Buy Now</span>
          <Icon name="arrow" className="size-2.5 sm:size-3 shrink-0" />
        </button>
      </div>
    </article>
  );
}

function CartDrawer({ open, onClose, cart, setCart }: { open: boolean; onClose: () => void; cart: Record<number, number>; setCart: React.Dispatch<React.SetStateAction<Record<number, number>>> }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("button, a[href]")].filter((el) => !el.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", keydown); document.body.style.overflow = ""; previousFocus.current?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  const items = products.filter((p) => cart[p.id]);
  const subtotal = items.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const update = (id: number, delta: number) => setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" className="cart-panel ml-auto flex h-full w-full max-w-md flex-col bg-[#f3e7d4] shadow-2xl">
        <div className="relative z-10 flex items-center justify-between border-b border-[#321a10]/15 px-6 py-5">
          <div><p className="text-xs font-bold uppercase tracking-[.2em]">Your selection</p><h2 id="cart-title" className="font-display text-3xl">The bread bag</h2></div>
          <button ref={closeRef} onClick={onClose} className="grid size-12 place-items-center rounded-full border border-[#321a10]/25 hover:bg-white/50" aria-label="Close cart"><Icon name="close" /></button>
        </div>
        <div className="relative z-10 flex-1 overflow-y-auto p-6">
          {!items.length ? <div className="grid h-full place-content-center text-center"><p className="font-display text-4xl">Your bag is hungry.</p><p className="mt-3 text-[#6b5549]">Add something baked this morning.</p><button onClick={onClose} className="mt-6 min-h-12 rounded-full bg-[#321a10] px-6 font-bold text-white">Browse the bake</button></div> :
            <div className="space-y-4">{items.map((item) => <div key={item.id} className="flex gap-4 rounded-2xl bg-[#fffaf1]/90 p-3">
              <SmartImage src={item.image} alt="" className="size-20 rounded-xl object-cover" />
              <div className="min-w-0 flex-1"><h3 className="font-display text-xl">{item.name}</h3><p className="text-sm">₹{item.price}</p>
                <div className="mt-2 flex w-28 items-center justify-between rounded-full border border-[#321a10]/20">
                  <button onClick={() => update(item.id, -1)} className="grid size-9 place-items-center" aria-label={`Remove one ${item.name}`}><Icon name="minus" className="size-4" /></button>
                  <span className="text-sm font-bold">{cart[item.id]}</span>
                  <button onClick={() => update(item.id, 1)} className="grid size-9 place-items-center" aria-label={`Add one ${item.name}`}><Icon name="plus" className="size-4" /></button>
                </div>
              </div>
            </div>)}</div>}
        </div>
        {items.length > 0 && <div className="relative z-10 border-t border-[#321a10]/15 bg-[#f3e7d4]/90 p-6 backdrop-blur">
          <div className="mb-4 flex justify-between font-bold"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <a 
            href={`https://wa.me/919820046786?text=${encodeURIComponent(
              "Hi Grain Mother! I'd like to place an order:\n\n" +
              items.map((i) => `• ${i.name} x ${cart[i.id]} (₹${i.price * cart[i.id]})`).join("\n") +
              `\n\nTotal: ₹${subtotal}\n\nPlease confirm availability and delivery slot.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-bold text-white hover:bg-[#1faa53] transition shadow-lg"
          >
            <Icon name="bag" />
            <span>Order via WhatsApp (₹{subtotal})</span>
            <Icon name="arrow" />
          </a>
          <p className="mt-3 text-center text-xs text-[#6b5549]">Orders dispatched 7–9 AM · Delivered by noon across Mumbai</p>
        </div>}
      </div>
    </div>
  );
}

export default function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCollection, setActiveCollection] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "rail">("grid");
  const [locality, setLocality] = useState(() => {
    try { return localStorage.getItem("grain-mother-locality") || localities[0].name; }
    catch { return localities[0].name; }
  });
  const railRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const displayed = category === "All" ? products : products.filter((p) => p.category === category);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const deliveryPromise = localities.find((item) => item.name === locality)?.promise || localities[0].promise;
  const add = (product: Product) => { setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 })); setCartOpen(true); };
  const buyNow = (product: Product) => {
    setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
    setCartOpen(true);
  };
  const scrollProducts = (direction: number) => railRef.current?.scrollBy({ left: direction * Math.min(420, railRef.current.clientWidth * .8), behavior: "smooth" });
  const chooseLocality = (value: string) => {
    setLocality(value);
    try { localStorage.setItem("grain-mother-locality", value); } catch { /* Browsing still works without storage. */ }
  };
  const chooseCollection = (filter: string) => {
    setCategory(filter);
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroBakes.length), 4500);
    return () => window.clearInterval(timer);
  }, []);
  const syncCollection = () => {
    if (!collectionRef.current) return;
    const card = collectionRef.current.firstElementChild as HTMLElement | null;
    if (card) setActiveCollection(Math.min(collections.length - 1, Math.round(collectionRef.current.scrollLeft / (card.offsetWidth + 16))));
  };
  const scrollCollections = (index: number) => {
    const rail = collectionRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    rail.scrollTo({ left: index * (card.offsetWidth + 16), behavior: "smooth" });
  };
  const announcements = [
    "Order by 8 PM · baked tomorrow",
    locality === localities[0].name ? "Fresh delivery across Mumbai" : `${locality} · ${deliveryPromise}`,
    "18–24 hour slow fermentation",
    "No preservatives · ever",
    "Save 10% with a weekly box",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f1e7] text-[#321a10]">
      <BreadCursor />
      <div className="announcement-bar overflow-hidden bg-[#321a10] py-2.5 text-xs font-bold uppercase tracking-[.16em] text-[#fff5e5]" role="region" aria-label={announcements.join(". ")}>
        <div className="announcement-track flex w-max items-center" aria-hidden="true">
          {[...announcements, ...announcements].map((message, index) => <span key={`${message}-${index}`} className="flex shrink-0 items-center whitespace-nowrap px-5 sm:px-8">{message}<span className="ml-10 text-[#e9aa54]">✦</span></span>)}
        </div>
      </div>
      <header className="relative z-40 border-b border-[#321a10]/10 bg-[#f7f1e7]/95 backdrop-blur">
        <nav className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
          <button className="grid size-11 place-items-center md:hidden" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
          <a href="#top" className="font-display text-2xl font-black tracking-[-.04em] sm:text-3xl">GRAIN MOTHER</a>
          <div className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#collections" className="nav-link">Collections</a><a href="#shop" className="nav-link">Shop</a><a href="#weekly" className="nav-link">Subscribe</a><a href="#story" className="nav-link">Our story</a>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex min-h-11 items-center gap-2 rounded-full border border-[#321a10]/25 px-4 font-bold hover:bg-white" aria-label={`Open cart with ${cartCount} items`}><Icon name="bag" /><span className="hidden sm:inline">Bag</span><span className="grid size-6 place-items-center rounded-full bg-[#d96a3b] text-xs text-white">{cartCount}</span></button>
          {menuOpen && <div className="absolute inset-x-0 top-full border-y border-[#321a10]/10 bg-[#f7f1e7] p-5 shadow-xl md:hidden">{["Collections", "Shop the bake", "Subscribe", "Our story"].map((x, i) => <a key={x} onClick={() => setMenuOpen(false)} href={["#collections", "#shop", "#weekly", "#story"][i]} className="block min-h-12 border-b border-[#321a10]/10 py-3 font-display text-2xl">{x}</a>)}</div>}
        </nav>
      </header>

      <main id="top">
        {/* Mobile-optimized Hero Section */}
        <section className="hero-grid mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-6 sm:px-8 lg:min-h-[760px] lg:grid-cols-[.88fr_1.12fr] lg:py-12">
          {/* Text & Ordering Controls (hidden on mobile, visible on desktop as requested) */}
          <div className="relative z-10 hidden py-4 md:block lg:py-12">
            <p className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[.22em]"><span className="h-px w-10 bg-current" />Born in Ghatkopar · 2021</p>
            <h1 className="font-display text-[clamp(3.3rem,7vw,7.5rem)] font-black leading-[.82] tracking-[-.065em]">Bread,<br />worth the<br /><em className="font-normal text-[#d96a3b]">wait.</em></h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-[#5f4a3e] sm:text-lg">Slow-fermented. Baked this morning. At your door by noon.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => add(products.find((product) => product.name === heroBakes[heroIndex].name) || products[0])} className="group flex min-h-14 items-center gap-3 rounded-full bg-[#d96a3b] px-7 font-bold text-white transition hover:bg-[#321a10]">Buy now <Icon name="arrow" className="size-5 transition group-hover:translate-x-1" /></button>
              <a href="#shop" className="flex min-h-14 items-center rounded-full border border-[#321a10]/30 px-7 font-bold hover:bg-white">View all</a>
            </div>
            <div className="mt-5 max-w-xl rounded-2xl border border-[#321a10]/15 bg-white/55 p-3.5 backdrop-blur">
              <label htmlFor="locality" className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em]"><Icon name="pin" className="size-4 text-[#d96a3b]" />Delivering to</label>
              <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                <select id="locality" value={locality} onChange={(event) => chooseLocality(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#321a10]/20 bg-[#fffaf1] px-4 font-bold focus:outline-none">
                  {localities.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
                <p className="max-w-48 text-sm font-semibold text-[#6b5549]" aria-live="polite">{deliveryPromise}</p>
              </div>
            </div>
            <div className="mt-10 flex gap-8 border-t border-[#321a10]/15 pt-5 text-sm"><p><strong className="block font-display text-2xl">18–24h</strong>slow ferment</p><p><strong className="block font-display text-2xl">0</strong>preservatives</p><p><strong className="block font-display text-2xl">Noon</strong>same-bake delivery</p></div>
          </div>

          {/* Main Hero Photo Section */}
          <div className="hero-visual relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[#ead4b5] sm:min-h-[500px] lg:min-h-[680px]">
            <SmartImage key={heroBakes[heroIndex].image} src={heroBakes[heroIndex].image} alt={heroBakes[heroIndex].name} className="hero-loaf hero-swap absolute inset-0 h-full w-full object-cover" />
            <div className="absolute right-4 top-4 grid size-20 rotate-6 place-items-center rounded-full bg-[#e9aa54] text-center text-[10px] font-black uppercase tracking-[.12em] shadow-xl sm:right-8 sm:top-8 sm:size-32 sm:text-xs">Baked<br />fresh<br />daily</div>
            <p className="absolute bottom-4 left-4 rounded-full bg-[#fffaf1]/90 px-3.5 py-1.5 text-xs font-bold backdrop-blur sm:bottom-8 sm:left-8 sm:px-4 sm:py-2 sm:text-sm">{heroBakes[heroIndex].name} · ₹{heroBakes[heroIndex].price}</p>
            <div className="absolute bottom-4 right-4 flex gap-1.5 sm:bottom-9 sm:right-8 sm:gap-2">{heroBakes.map((bake, index) => <button key={bake.name} onClick={() => setHeroIndex(index)} aria-label={`Show ${bake.name}`} aria-pressed={heroIndex === index} className={`h-2.5 rounded-full border border-[#321a10]/30 transition-all sm:h-3 ${heroIndex === index ? "w-7 sm:w-8 bg-[#321a10]" : "w-2.5 sm:w-3 bg-white/80"}`} />)}</div>
          </div>
        </section>

        {/* 1. Directly the Swiping Marquee Section under Main Hero Photo */}
        <section className="overflow-hidden border-y border-[#321a10]/15 bg-[#d96a3b] py-6 sm:py-10 text-[#fff8ee]">
          <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
            <p className="font-display text-[clamp(1.6rem,5vw,5rem)] leading-[1.08]">We believe good bread should be</p>
            <div className="word-window mt-1 h-[1.1em] overflow-hidden font-display text-[clamp(2rem,6vw,6rem)] italic leading-[1.1] text-[#321a10]" aria-label="slow, honest and shared">
              <div className="word-roll"><span>slow.</span><span>honest.</span><span>shared.</span><span>slow.</span></div>
            </div>
          </div>
          <div className="marquee-track mt-6 sm:mt-9 flex w-max gap-3" aria-label="Fresh bakery gallery">
            {[...products, ...products].map((item, i) => <div key={`${item.id}-${i}`} className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-44 sm:w-64"><SmartImage src={item.image} alt={i < products.length ? item.name : ""} className="h-full w-full object-cover" /><span className="absolute inset-x-2 bottom-2 rounded-full bg-[#321a10]/80 px-2.5 py-1 text-center text-[11px] font-bold backdrop-blur sm:px-3 sm:py-1.5 sm:text-xs">{item.name}</span></div>)}
          </div>
        </section>

        {/* 2. Then the Scrolling Collection Section */}
        <section id="collections" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:py-24">
          <div className="mb-8 flex items-end justify-between gap-6"><div><p className="eyebrow">Shop by collection</p><h2 className="section-title">Choose your bake.</h2></div><p className="hidden font-display text-3xl font-bold sm:block">0{activeCollection + 1} <span className="text-[#b7a393]">/ 0{collections.length}</span></p></div>
          <div ref={collectionRef} onScroll={syncCollection} className="no-scrollbar grid auto-cols-[80%] grid-flow-col gap-4 overflow-x-auto pb-3 sm:auto-cols-[62%] lg:auto-cols-[calc(50%-8px)]" aria-label="Bread collections">
            {collections.map((collection) => <button key={collection.name} onClick={() => chooseCollection(collection.filter)} className={`collection-card group relative overflow-hidden rounded-[1.6rem] text-left text-white ${collection.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}>
              <SmartImage src={collection.image} alt={collection.name} className="h-[320px] sm:h-[420px] lg:h-[520px] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#28150d]/90 via-[#28150d]/10 to-transparent" />
              {collection.featured && <span className="absolute left-4 top-4 sm:left-5 sm:top-5 rounded-full bg-[#e9aa54] px-3.5 py-1.5 text-xs font-black uppercase tracking-[.16em] text-[#321a10]">Featured collection</span>}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-7">
                <div><p className="font-display text-2xl font-bold sm:text-4xl">{collection.name}</p><p className="mt-1 text-xs sm:text-sm text-white/80">{collection.count}</p></div>
                <span className="grid size-10 sm:size-12 shrink-0 place-items-center rounded-full bg-white text-[#321a10] transition group-hover:-rotate-12 group-hover:bg-[#e9aa54]"><Icon name="arrow" /></span>
              </div>
            </button>)}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-1.5">{collections.map((item, index) => <button key={item.name} onClick={() => scrollCollections(index)} aria-label={`Go to ${item.name}`} aria-pressed={activeCollection === index} className={`h-2 rounded-full transition-all ${activeCollection === index ? "w-8 bg-[#d96a3b]" : "w-2 bg-[#321a10]/20"}`} />)}</div>
            <p className="text-xs sm:text-sm font-bold">Scroll to explore →</p>
          </div>
        </section>

        {/* 3. Then the Products Section Beneath it (at least two horizontal on mobile, and rest vertically) */}
        <section id="shop" className="border-t border-[#321a10]/10 bg-[#fffaf1] py-14 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Today’s bake</p>
                <h2 className="section-title">Fresh from the oven.</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {["All", "Bread", "Pastry", "Pantry"].map((item) => (
                    <button 
                      key={item} 
                      onClick={() => setCategory(item)} 
                      aria-pressed={category === item} 
                      className={`min-h-9 sm:min-h-11 rounded-full border px-3.5 sm:px-5 text-xs sm:text-sm font-bold transition-all ${
                        category === item 
                          ? "border-[#321a10] bg-[#321a10] text-white shadow-md" 
                          : "border-[#321a10]/20 bg-white/50 hover:bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile View: At least two horizontal top picks, then the rest in a clean 2-column grid matching top size */}
            <div className="block md:hidden">
              {/* Top 2 horizontal quick-picks */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-wider text-[#d96a3b] mb-3">🔥 Morning's Top Picks</p>
                <div className="grid grid-cols-2 gap-3 pb-2">
                  {displayed.slice(0, 2).map((p) => (
                    <ProductCard key={`h-${p.id}`} product={p} onAdd={add} onBuyNow={buyNow} />
                  ))}
                </div>
              </div>

              {/* Rest of the products presented in clean 2-column mobile grid with identical compact proportions */}
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#321a10] mb-3">All Daily Bakes ({displayed.length - 2 > 0 ? displayed.length - 2 : displayed.length})</p>
                <div className="grid grid-cols-2 gap-3">
                  {displayed.slice(2).map((p) => (
                    <ProductCard key={`v-${p.id}`} product={p} onAdd={add} onBuyNow={buyNow} />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop View: Full Responsive Grid */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={add} onBuyNow={buyNow} />
              ))}
            </div>
          </div>
        </section>

        <section id="weekly" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div><p className="eyebrow">Subscribe & save</p><h2 className="section-title">Your bread. Your rhythm.</h2></div>
            <p className="text-lg text-[#6b5549]">Pick a plan. Pause or swap anytime.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { 
                name: "The Essential", 
                price: "₹899", 
                detail: "2 loaves · every week", 
                perk: "Save 8%", 
                tone: "bg-[#eadfce]",
                image: "/assets/sliced-loaf.jpg",
                breadName: "Classic Milk Loaf & Country Loaf",
                description: "Light, everyday staple loaves delivered fresh weekly.",
                characterType: "normal" as const
              },
              { 
                name: "The Mother’s Box", 
                price: "₹1,499", 
                detail: "3 loaves + 4 pastries", 
                perk: "Save 12% · Most loved", 
                tone: "bg-[#321a10] text-[#fff8ee]", 
                featured: true,
                image: "/assets/hero-sourdough.png",
                breadName: "Signature Mother Sourdough & Croissants",
                description: "24-hour slow fermented sourdough with pure artisanal scoring.",
                characterType: "royal" as const
              },
              { 
                name: "The Fortnightly", 
                price: "₹1,099", 
                detail: "3 loaves · every 2 weeks", 
                perk: "Save 10%", 
                tone: "bg-[#e9aa54]",
                image: "/assets/bread-basket.jpg",
                breadName: "Seeded Country Loaf & Sourdough Medley",
                description: "Multi-grain seeded loaves baked fresh every alternate week.",
                characterType: "superman" as const
              },
            ].map((plan, index) => {
              const isSelected = selectedPlanIndex === index;
              return (
                <article 
                  key={plan.name} 
                  onClick={() => setSelectedPlanIndex(index)}
                  className={`relative flex min-h-[300px] sm:min-h-[380px] flex-col rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-7 transition-all duration-300 cursor-pointer ${plan.tone} ${isSelected ? 'ring-3 sm:ring-4 ring-[#d96a3b] shadow-xl scale-[1.01]' : 'opacity-95 hover:opacity-100'}`}
                >
                  {plan.featured && <span className="absolute right-4 top-4 sm:right-5 sm:top-5 rounded-full bg-[#e9aa54] px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[.12em] text-[#321a10]">Featured</span>}
                  
                  {/* Top Bar with Perk + Selected Badge */}
                  <div className="flex items-center justify-between">
                    <p className={`text-[11px] sm:text-xs font-black uppercase tracking-[.16em] ${plan.featured ? "text-[#e9aa54]" : "text-[#b84d29]"}`}>{plan.perk}</p>
                    {isSelected && (
                      <span className="rounded-full bg-[#d96a3b] px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                        Selected Plan
                      </span>
                    )}
                  </div>

                  {/* Plan Header + Animated Bread Character */}
                  <div className="mt-4 sm:mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl sm:text-4xl font-bold leading-tight">{plan.name}</h3>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-80">{plan.detail}</p>
                    </div>
                    {/* Animated Character Bread */}
                    <div className="p-0.5">
                      <BreadCharacter type={plan.characterType} />
                    </div>
                  </div>

                  <div className="mt-auto pt-4 sm:pt-6">
                    <p className="font-display text-3xl sm:text-5xl font-black">{plan.price}<span className="font-sans text-xs sm:text-sm font-normal"> / delivery</span></p>
                    <div className="mt-4 sm:mt-6 flex flex-col gap-2">
                      <a 
                        href={`https://wa.me/919820046786?text=${encodeURIComponent(
                          `Hi Grain Mother! I'd like to subscribe to "${plan.name}" (${plan.price}/delivery).\n\nDetails:\n• Plan: ${plan.name}\n• Frequency: ${plan.detail}\n• Items: ${plan.breadName}\n• Perk: ${plan.perk}\n\nPlease confirm my subscription delivery schedule.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlanIndex(index);
                        }} 
                        className={`flex w-full min-h-11 sm:min-h-14 items-center justify-between rounded-full px-4 sm:px-6 text-xs sm:text-base font-bold transition-all shadow-md ${
                          isSelected 
                            ? "bg-[#d96a3b] text-white hover:bg-[#b94f29]" 
                            : plan.featured 
                              ? "bg-[#e9aa54] text-[#321a10] hover:bg-[#dba047]" 
                              : "bg-[#321a10] text-white hover:bg-[#482819]"
                        }`}
                      >
                        <span>{isSelected ? "Subscribe with WhatsApp ✓" : "Subscribe Now"}</span>
                        <Icon name="arrow" className="size-4 sm:size-5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {(() => {
            const subscriptionPlans = [
              {
                name: "The Essential",
                image: "/assets/sliced-loaf.jpg",
                breadName: "Classic Milk Loaf & Seeded Country Loaf",
                description: "Light, everyday staple loaves delivered fresh to your door every week."
              },
              {
                name: "The Mother’s Box",
                image: "/assets/hero-sourdough.png",
                breadName: "Signature 24h Mother Sourdough",
                description: "24-hour slow fermented sourdough with golden crust and signature wheat-stalk scoring."
              },
              {
                name: "The Fortnightly",
                image: "/assets/bread-basket.jpg",
                breadName: "Seeded Country Loaf & Pantry Granola",
                description: "Multi-grain seeded loaves baked fresh every alternate week with house accompaniments."
              }
            ];
            const activePlan = subscriptionPlans[selectedPlanIndex] || subscriptionPlans[1];

            return (
              <div className="mt-5 grid overflow-hidden rounded-[2rem] bg-[#321a10] text-[#f8ead5] lg:grid-cols-[1fr_.8fr] transition-all duration-500 shadow-xl">
                <div className="p-7 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="eyebrow text-[#e9aa54] mb-0">How it works</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#e9aa54]">
                        {activePlan.name}
                      </span>
                    </div>
                    <ol className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                      <li>
                        <strong className="font-display text-2xl">01 · Pick</strong>
                        <p className="text-sm text-[#cfbdad] mt-1">Choose your plan and favourite bakes.</p>
                      </li>
                      <li>
                        <strong className="font-display text-2xl">02 · Schedule</strong>
                        <p className="text-sm text-[#cfbdad] mt-1">Select a weekly or fortnightly day.</p>
                      </li>
                      <li>
                        <strong className="font-display text-2xl">03 · Enjoy</strong>
                        <p className="text-sm text-[#cfbdad] mt-1">Pause, skip or swap before each bake.</p>
                      </li>
                    </ol>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider text-[#e9aa54]">Included In Your Box</p>
                      <p className="font-display text-xl font-bold text-white mt-1">{activePlan.breadName}</p>
                    </div>
                  </div>
                </div>
                <div className="subscription-art relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-[#24130b] flex items-center justify-center p-6">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <SmartImage 
                      key={activePlan.image} 
                      src={activePlan.image} 
                      alt={activePlan.breadName} 
                      className="hero-loaf hero-swap h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]" 
                    />
                    <div className="absolute top-4 right-4 rounded-full bg-[#e9aa54] px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#321a10] shadow-lg">
                      {activePlan.name}
                    </div>
                    <div className="absolute bottom-4 inset-x-4 rounded-xl bg-black/60 backdrop-blur-md p-3 text-center text-xs text-[#f8ead5]">
                      {activePlan.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        <section id="story" className="bg-[#eadfce] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative"><SmartImage src="/assets/bread-basket.jpg" alt="Bread being prepared at Grain Mother" className="aspect-[4/5] w-full rounded-[2rem] object-cover" /><div className="absolute -bottom-6 right-5 max-w-[240px] rotate-2 rounded-2xl bg-[#e9aa54] p-5 font-display text-2xl font-bold shadow-xl sm:right-10">“Shaped by hand, like a mother would make it.”</div></div>
            <div><p className="eyebrow">Our journey</p><h2 className="section-title">One starter. One city.</h2><p className="mt-6 text-lg leading-relaxed text-[#604a3f]">Mixed slowly, shaped by hand, baked with care.</p>
              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#321a10]/20 pt-7 text-center"><p><strong className="font-display text-3xl sm:text-5xl">4+</strong><span className="mt-1 block text-xs uppercase tracking-wider">years rising</span></p><p><strong className="font-display text-3xl sm:text-5xl">12k</strong><span className="mt-1 block text-xs uppercase tracking-wider">loaves baked</span></p><p><strong className="font-display text-3xl sm:text-5xl">7</strong><span className="mt-1 block text-xs uppercase tracking-wider">Mumbai zones</span></p></div>
            </div>
          </div>
        </section>

        <section id="journal" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">From the mother</p><h2 className="section-title">Stories to break bread over.</h2></div><a href="#journal" className="hidden min-h-11 items-center gap-2 font-bold underline decoration-[#d96a3b] decoration-2 underline-offset-8 sm:flex">Read all stories <Icon name="arrow" /></a></div>
          <div className="grid gap-5 md:grid-cols-3">{stories.map((story, i) => <article key={story.title} className={i === 0 ? "md:col-span-1" : ""}><SmartImage src={story.image} alt="" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" /><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#d15b31]">{story.tag}</p><h3 className="mt-2 font-display text-3xl leading-tight">{story.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#6b5549]">{story.copy}</p><a href="#story" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold">Read story <Icon name="arrow" className="size-4" /></a></article>)}</div>
        </section>
      </main>

      <footer className="bg-[#321a10] px-5 py-14 text-[#f8ead5] sm:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-4"><div className="md:col-span-2"><p className="font-display text-4xl font-black">GRAIN MOTHER</p><p className="mt-4 max-w-sm text-[#cdb9a7]">Slow bread for fast cities. Baked in Ghatkopar, delivered across Mumbai.</p></div><div><p className="mb-3 font-bold text-[#e9aa54]">Visit</p><p>Ghatkopar West, Mumbai<br />Mon–Sat · 7 AM–7 PM</p></div><div><p className="mb-3 font-bold text-[#e9aa54]">Say hello</p><a href="tel:+919820046786" className="block py-1">+91 98200 46786</a><a href="mailto:hello@grainmother.in" className="block py-1">hello@grainmother.in</a></div></div>
        <div className="mx-auto mt-12 flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-xs text-[#bca897]"><p>© 2025 Grain Mother. Made slowly.</p><p>Instagram · WhatsApp · Privacy</p></div>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
    </div>
  );
}
