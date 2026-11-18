"use client";

import { FormEvent, useMemo, useState } from "react";

type HomeListing = {
  id: number;
  title: string;
  area: string;
  price: number;
  beds: string;
  baths: string;
  image: string;
  kind: string;
};

const homes: HomeListing[] = [
  { id: 1, title: "Modern 1-bedroom apartment", area: "Kilimani", price: 45000, beds: "1 bedroom", baths: "1 bath", image: "/houses/kilimani.svg", kind: "Apartment" },
  { id: 2, title: "Bright 2-bedroom apartment", area: "South B", price: 38000, beds: "2 bedrooms", baths: "1 bath", image: "/houses/south-b.svg", kind: "Apartment" },
  { id: 3, title: "Well-planned studio apartment", area: "Westlands", price: 28000, beds: "Studio", baths: "1 bath", image: "/houses/westlands.svg", kind: "Studio" },
];

const areas = ["Kilimani", "Westlands", "South B", "Kileleshwa", "Roysambu", "Kasarani"];

const money = (amount: number) =>
  new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(amount);

export default function Home() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("any");

  const filteredHomes = useMemo(
    () =>
      homes.filter((home) => {
        const query = location.trim().toLowerCase();
        const matchesLocation = !query || home.area.toLowerCase().includes(query);
        const matchesBudget =
          budget === "any" ||
          (budget === "under20" && home.price < 20000) ||
          (budget === "20to40" && home.price >= 20000 && home.price <= 40000) ||
          (budget === "40to60" && home.price > 40000 && home.price <= 60000) ||
          (budget === "over60" && home.price > 60000);
        return matchesLocation && matchesBudget;
      }),
    [location, budget],
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" });
  }

  function chooseArea(area: string) {
    setLocation(area);
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" });
  }

  function clearFilters() {
    setLocation("");
    setBudget("any");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Maskani home">
          <span className="brand-mark">m.</span>
          <span>maskani</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#homes">Find a home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#partners">List a property</a>
        </nav>
        <a className="header-link" href="#partners">I have a property <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> NAIROBI RENTALS, MADE SIMPLER</p>
            <h1>A place to call <em>home.</em></h1>
            <p className="hero-description">
              Find a home that feels right. Explore rental options around Nairobi,
              compare your choices and connect with the people behind the property.
            </p>
            <div className="hero-points">
              <span><b>✓</b> Browse by neighbourhood</span>
              <span><b>✓</b> Search by your budget</span>
            </div>
          </div>

          <div className="search-panel">
            <div className="search-heading">
              <div>
                <span className="search-kicker">START YOUR SEARCH</span>
                <h2>Find your next home</h2>
              </div>
              <span className="search-icon" aria-hidden="true">⌕</span>
            </div>
            <form onSubmit={handleSearch}>
              <label className="field-label" htmlFor="location">Neighbourhood</label>
              <div className="input-wrap">
                <span aria-hidden="true">⌖</span>
                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  list="nairobi-areas"
                  placeholder="e.g. Kilimani, South B"
                  autoComplete="off"
                />
                <datalist id="nairobi-areas">
                  {areas.map((area) => <option key={area} value={area} />)}
                </datalist>
              </div>
              <label className="field-label" htmlFor="budget">Monthly budget</label>
              <div className="input-wrap">
                <span aria-hidden="true">KSh</span>
                <select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
                  <option value="any">Any budget</option>
                  <option value="under20">Under KSh 20,000</option>
                  <option value="20to40">KSh 20,000 – 40,000</option>
                  <option value="40to60">KSh 40,001 – 60,000</option>
                  <option value="over60">Over KSh 60,000</option>
                </select>
              </div>
              <button className="search-button" type="submit">Search homes <span aria-hidden="true">→</span></button>
            </form>
            <p className="search-footnote">Start with Nairobi. More neighbourhoods coming soon.</p>
          </div>
        </div>
        <div className="hero-bottom">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
          <span>NAIROBI · KENYA</span>
        </div>
      </section>

      <section className="areas-section section-shell">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow dark-eyebrow">EXPLORE THE CITY</p>
            <h2>Popular neighbourhoods</h2>
          </div>
          <p>Choose an area to see what is available.</p>
        </div>
        <div className="area-chips">
          {areas.map((area) => (
            <button
              className={location.toLowerCase() === area.toLowerCase() ? "area-chip active" : "area-chip"}
              key={area}
              type="button"
              onClick={() => chooseArea(area)}
            >
              {area}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="homes-section section-shell" id="homes">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark-eyebrow">A FEW PLACES TO GET YOU STARTED</p>
            <h2>Homes worth a look<span className="heading-period">.</span></h2>
          </div>
          <div className="listing-summary">
            <span>{filteredHomes.length} {filteredHomes.length === 1 ? "home" : "homes"}</span>
            <button type="button" className="clear-button" onClick={clearFilters}>Clear filters</button>
          </div>
        </div>
        {filteredHomes.length > 0 ? (
          <div className="listing-grid">
            {filteredHomes.map((home) => (
              <article className="listing-card" key={home.id}>
                <div className="listing-image" style={{ backgroundImage: `url("${home.image}")` }}>
                  <span className="sample-tag">SAMPLE LISTING</span>
                  <span className="image-kind">{home.kind}</span>
                </div>
                <div className="listing-info">
                  <div className="listing-location"><span aria-hidden="true">⌖</span> {home.area}, Nairobi</div>
                  <h3>{home.title}</h3>
                  <div className="listing-details"><span>{home.beds}</span><i /> <span>{home.baths}</span></div>
                  <div className="listing-bottom">
                    <p><strong>KSh {money(home.price)}</strong><span> / month</span></p>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-symbol" aria-hidden="true">⌂</span>
            <h3>No sample homes match those filters</h3>
            <p>Try another neighbourhood or adjust your monthly budget.</p>
            <button type="button" className="outline-button" onClick={clearFilters}>Show all sample homes</button>
          </div>
        )}
        <p className="sample-disclaimer">
          These are illustrative sample listings for testing the website, not verified live rental offers.
          Availability, rent and property details must be confirmed before a home is advertised as live.
        </p>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A CLEARER WAY TO RENT</p>
              <h2>Finding a home, made simple.</h2>
            </div>
            <p>Less searching in circles. More time finding the right place.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <span className="step-symbol" aria-hidden="true">⌕</span>
              <h3>Search your way</h3>
              <p>Start with a neighbourhood and a monthly budget that works for you.</p>
            </article>
            <article className="step-card">
              <span className="step-number">02</span>
              <span className="step-symbol" aria-hidden="true">▤</span>
              <h3>Compare your options</h3>
              <p>Review the property details and shortlist places that fit your needs.</p>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <span className="step-symbol" aria-hidden="true">↗</span>
              <h3>Connect directly</h3>
              <p>Reach out to the responsible landlord, agent or property manager.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="partner-section section-shell" id="partners">
        <div className="partner-card">
          <div>
            <p className="eyebrow">FOR LANDLORDS & PROPERTY AGENTS</p>
            <h2>Have a place to rent?</h2>
            <p>We are building a simpler way to put genuine Nairobi rental homes in front of people looking for their next place.</p>
          </div>
          <a href="mailto:hello@maskani.ke?subject=Maskani%20property%20listing%20enquiry" className="partner-button">
            Become a listing partner <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">m.</span><span>maskani</span></a>
        <p>Find a place to call home.</p>
        <span>© {new Date().getFullYear()} Maskani · Nairobi, Kenya</span>
      </footer>
    </main>
  );
}
