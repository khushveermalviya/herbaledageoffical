import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import "./styles.css";

const phone = "919571226747";
const image = (name) => `/${name}.jpeg`;

const products = [
  { slug: "henna-powder", name: "Henna Powder", category: "Hair Colour", short: "Natural hair colour", description: "A finely milled henna powder for rich, natural-looking colour and a deeply conditioned feel.", benefits: ["Natural hair colour", "Conditions hair", "Chemical-free care"], use: "Mix with warm water to a smooth paste. Rest, apply to clean hair, and rinse when the colour has developed.", price: "₹149", image: image("henna-powder"), accent: "#6d873c" },
  { slug: "amla-powder", name: "Amla Powder", category: "Hair Care", short: "For stronger hair", description: "Vitamin-C-rich amla powder for a nourished scalp, stronger-looking hair, and a naturally healthy shine.", benefits: ["Rich in Vitamin C", "Supports scalp care", "Adds natural shine"], use: "Blend with water, oil, or your hair mask. Apply to scalp and lengths, then rinse thoroughly.", price: "₹149", image: image("amla-powder"), accent: "#6d873c" },
  { slug: "shikakai-powder", name: "Shikakai Powder", category: "Hair Care", short: "Gentle natural cleanser", description: "A traditional botanical cleanser that helps leave hair feeling soft, fresh, and cared for.", benefits: ["Gentle cleansing", "Traditional hair care", "Soft, fresh finish"], use: "Make a light paste with water and massage through wet hair. Rinse well after a few minutes.", price: "₹149", image: image("shikakai-powder"), accent: "#8d5838" },
  { slug: "indigo-powder", name: "Indigo Powder", category: "Hair Colour", short: "For rich hair colour", description: "Pure indigo powder for naturally deep hair colour when paired with a henna-first ritual.", benefits: ["Natural colour ritual", "Plant-based powder", "No artificial dye"], use: "For best colour results, follow a henna-first routine and mix indigo fresh before application.", price: "₹149", image: image("indigo-powder"), accent: "#345b81" },
  { slug: "bhringraj-powder", name: "Bhringraj Powder", category: "Hair Care", short: "Supports healthy hair", description: "A treasured Ayurvedic herb traditionally used in scalp rituals and hair-strengthening masks.", benefits: ["Scalp ritual", "Supports hair growth", "Traditional herb"], use: "Mix with water or your preferred hair oil to make a mask. Leave briefly, then rinse clean.", price: "₹149", image: image("bhringraj-powder"), accent: "#718d48" },
  { slug: "aritha-powder", name: "Aritha Powder", category: "Hair Care", short: "Natural hair cleanser", description: "Soapnut-based Aritha powder for a naturally cleansing, low-waste hair wash ritual.", benefits: ["Natural cleanser", "Gentle hair wash", "Traditional care"], use: "Mix into a thin paste or liquid, massage gently into wet hair, and rinse thoroughly.", price: "₹149", image: image("aritha-powder"), accent: "#8d5838" },
  { slug: "neem-powder", name: "Neem Powder", category: "Skin Care", short: "For clear, healthy skin", description: "Pure neem powder for clarifying face masks and a simple, grounded skin-care ritual.", benefits: ["Clarifying mask", "Pure botanical care", "Fresh skin feel"], use: "Mix a small amount with water or aloe gel. Patch test first, apply briefly, then rinse.", price: "₹149", image: image("neem-powder"), accent: "#557d3f" },
  { slug: "hibiscus-powder", name: "Hibiscus Powder", category: "Hair Care", short: "Nourishes hair", description: "Bright hibiscus powder for nourishing hair masks and a softer, more cared-for finish.", benefits: ["Nourishing mask", "Hair and skin care", "Botanical colour"], use: "Mix with water, curd, or oil into a smooth mask. Apply to hair and rinse after use.", price: "₹149", image: image("hibiscus-powder"), accent: "#aa4b55" },
  { slug: "multani-mitti-powder", name: "Multani Mitti Powder", category: "Skin Care", short: "Natural skin glow", description: "Mineral-rich Multani Mitti for a fresh, gently purified feel and a naturally glowing complexion.", benefits: ["Skin purifying", "Fresh matte feel", "Traditional face pack"], use: "Mix with rose water or plain water. Apply an even layer, let it set lightly, then rinse.", price: "₹149", image: image("multani-mitti-powder"), accent: "#ae8d60" },
  { slug: "ubtan-powder", name: "Ubtan Powder", category: "Skin Care", short: "Natural skin glow", description: "A warm, traditional Ubtan blend inspired by Indian pre-care rituals for naturally radiant skin.", benefits: ["Traditional Ubtan", "Skin glow ritual", "Plant-based care"], use: "Mix with milk, curd, or water. Apply gently, leave for a few minutes, and rinse without scrubbing hard.", price: "₹149", image: image("ubtan-powder"), accent: "#b57b27" },
];

const categories = ["All Products", "Hair Care", "Skin Care", "Hair Colour"];

function waLink(product) {
  const message = `Hello Rahul, I would like to order ${product.name} from Herbal Edge. Please share availability and delivery details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function useHashProduct() {
  const getSlug = () => window.location.hash.match(/^#product\/(.+)$/)?.[1] || null;
  const [slug, setSlug] = useState(getSlug);
  useEffect(() => {
    const update = () => setSlug(getSlug());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return products.find((product) => product.slug === slug) || null;
}

function Brand() {
  return <a className="brand" href="#home" aria-label="Herbal Edge home"><span className="brand-mark">H</span><span><strong>Herbal Edge</strong><small>Back to our roots</small></span></a>;
}

function Header({ onSearch }) {
  const [open, setOpen] = useState(false);
  return <>
    <div className="utility"><span>Pure Herbs · Natural Care · A Healthier You</span><span>Free shipping on orders above ₹499 · India | INR</span></div>
    <header className="site-header">
      <Brand />
      <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <a href="#home" onClick={() => setOpen(false)}>Home</a><a href="#collection" onClick={() => setOpen(false)}>Shop <ChevronDown size={12} /></a><a href="#story" onClick={() => setOpen(false)}>Our Story</a><a href="#values" onClick={() => setOpen(false)}>Ingredients</a><a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions"><label className="search-box"><Search size={15} /><input onChange={(event) => onSearch(event.target.value)} placeholder="Search natural products..." aria-label="Search natural products" /></label><a href="https://wa.me/919571226747" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={19} /></a><a href="#shop" aria-label="Shopping bag"><ShoppingBag size={19} /></a></div>
    </header>
  </>;
}

function TrustMarks() {
  return <div className="trust-marks"><span><Leaf size={21} />Plant-based<br /><small>Goodness from nature</small></span><span><Sparkles size={21} />Pure ingredients<br /><small>Carefully sourced</small></span><span><Heart size={21} />Thoughtfully crafted<br /><small>For your hair & skin</small></span><span><Check size={21} />Naturally inspired<br /><small>Traditional wisdom</small></span></div>;
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-copy"><span className="eyebrow">Pure herbal care</span><h1>Rooted in <em>Nature.</em></h1><p>Traditional herbs for your hair, skin and natural beauty. Simple. Pure. Effective.</p><a className="button dark" href="#collection">Shop herbal collection <ArrowRight size={16} /></a><div className="hero-points"><span><Leaf size={22} />Natural<br />ingredients</span><span><Sparkles size={22} />Chemical<br />free</span><span><Heart size={22} />Pure &<br />safe</span></div></div><div className="hero-image"><img src={image("henna-powder")} alt="Herbal Edge Henna Powder" /><p>Goodness<br />from nature<br />for a better you</p></div></section>;
}

function CollectionRail() {
  const featured = products.slice(0, 6);
  return <section className="section collection-section" id="collection"><div className="section-heading"><div><span className="eyebrow">Pure · Natural · Thoughtful</span><h2>Explore Our Collection</h2></div><a className="text-button" href="#shop">View all products <ArrowRight size={15} /></a></div><div className="collection-rail">{featured.map((product) => <a href={`#product/${product.slug}`} className="collection-card" key={product.slug}><img src={product.image} alt={product.name} /><h3>{product.name}</h3><p>{product.short}</p><span>Shop now <ArrowRight size={12} /></span></a>)}</div></section>;
}

function ProductCard({ product, onOrder }) {
  return <article className="product-card"><a className="product-image" href={`#product/${product.slug}`}><img src={product.image} alt={product.name} /><span className="category-badge">{product.category}</span></a><div className="product-info"><a href={`#product/${product.slug}`}><h3>{product.name}</h3></a><p>{product.short}</p><div className="product-row"><strong>{product.price}</strong><span>100 g</span></div><button className="cart-button" onClick={() => onOrder(product)}><ShoppingBag size={14} /> Add to WhatsApp order</button></div></article>;
}

function ProductGrid({ query, onOrder }) {
  const [category, setCategory] = useState("All Products");
  const filtered = products.filter((product) => (category === "All Products" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase()));
  return <section className="section shop-section" id="shop"><div className="section-heading shop-heading"><div><span className="eyebrow">Customers' favourite herbal picks</span><h2>Bestsellers</h2></div><div className="filters">{categories.map((item) => <button key={item} className={category === item ? "filter active" : "filter"} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="product-grid">{filtered.map((product) => <ProductCard product={product} onOrder={onOrder} key={product.slug} />)}</div>{!filtered.length && <div className="empty-state">No products found for “{query}”.</div>}</section>;
}

function Story() {
  return <><section className="story-band" id="story"><div className="story-image"><img src={image("ubtan-powder")} alt="Herbal Edge Ubtan Powder with turmeric and herbs" /></div><div className="story-copy"><span className="eyebrow">Our story</span><h2>Back to Our Roots</h2><p>At Herbal Edge, we believe in the timeless power of nature. Our journey began with a simple thought: to bring pure, traditional herbs into modern lives. We source familiar ingredients and deliver them to you in their most authentic form.</p><a className="button dark" href="https://wa.me/919571226747?text=Hello%20Rahul%2C%20tell%20me%20more%20about%20Herbal%20Edge." target="_blank" rel="noreferrer">Our story <ArrowRight size={16} /></a></div></section><TrustMarks /></>;
}

function DetailPage({ product, onOrder }) {
  return <main className="detail-page"><div className="detail-breadcrumb"><a href="#home">Home</a><ArrowRight size={13} /><a href="#shop">Shop</a><ArrowRight size={13} /><span>{product.name}</span></div><section className="detail-layout"><div className="detail-visual" style={{ "--accent": product.accent }}><img src={product.image} alt={product.name} /></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="detail-short">{product.short}</p><div className="detail-rating"><span><Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /></span><small>New collection · 100 g</small></div><p className="detail-description">{product.description}</p><div className="detail-price"><strong>{product.price}</strong><span>100 g pack</span></div><a className="button dark detail-order" href={waLink(product)} target="_blank" rel="noreferrer" onClick={() => onOrder(product)}><MessageCircle size={18} /> Order on WhatsApp</a><div className="detail-benefits">{product.benefits.map((benefit) => <span key={benefit}><Check size={15} />{benefit}</span>)}</div></div></section><section className="detail-use"><div><span className="eyebrow">How to use</span><h2>Make it part of your ritual.</h2></div><p>{product.use}</p></section><div className="detail-back"><a className="text-button" href="#shop"><ArrowLeft size={15} /> Back to all products</a></div></main>;
}

function HomePage({ query, onOrder }) {
  return <main><Hero /><CollectionRail /><Story /><ProductGrid query={query} onOrder={onOrder} /><section className="nature-cta" id="contact"><div><span className="eyebrow">A healthier tomorrow</span><h2>Return to Nature</h2><p>Discover the power of traditional herbs.</p><a className="button light" href="https://wa.me/919571226747?text=Hello%20Rahul%2C%20I%20want%20to%20explore%20the%20Herbal%20Edge%20collection." target="_blank" rel="noreferrer">Explore collection <ArrowRight size={16} /></a></div><Leaf size={100} strokeWidth={1} /></section></main>;
}

function App() {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const product = useHashProduct();
  const handleOrder = (item) => { setNotice(`${item.name} is ready to order on WhatsApp.`); window.clearTimeout(window.orderTimer); window.orderTimer = window.setTimeout(() => setNotice(""), 6000); };
  useEffect(() => { document.title = product ? `${product.name} | Herbal Edge` : "Herbal Edge | Rooted in Nature"; }, [product]);
  return <><Header onSearch={setQuery} />{product ? <DetailPage product={product} onOrder={handleOrder} /> : <HomePage query={query} onOrder={handleOrder} />}<footer><Brand /><span>© 2026 Herbal Edge Official · Sojat, Rajasthan</span><span>Rahul Rathor · <a href="tel:+919571226747">95712 26747</a></span></footer>{notice && <div className="order-notice"><strong>Order started</strong><span>{notice}</span><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">Open WhatsApp <ArrowRight size={14} /></a></div>}</>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
