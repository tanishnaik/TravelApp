import { useEffect, useState } from "react";
import { hotelApi } from "../../api/hotelsApi";
import { HotelCard } from "../../components/HotelCard";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Chatbot } from "../../components/chatbot";
// import NearestLocation from "../../components/NearestLocation";

export const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [randomTrips, setRandomTrips] = useState([]);
  const [modeFilter, setModeFilter] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const hotels = await hotelApi();
        setHotels(hotels);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  const suggestRandomTrips = () => {
    const shuffled = [...hotels].sort(() => 0.5 - Math.random());
    setRandomTrips(shuffled.slice(0, 5));
  };

  const filterHotels = () => {
    return hotels
      .filter((hotel) =>
        hotel.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((hotel) => {
        if (ratingFilter === "above3") return hotel.rating > 3;
        if (ratingFilter === "below4") return hotel.rating < 4;
        if (ratingFilter === "between3and4")
          return hotel.rating >= 3 && hotel.rating <= 4;
        return true;
      })
      .filter((hotel) => {
        const price =
          typeof hotel.price === "string"
            ? parseFloat(hotel.price.replace(/[^\d.]/g, ""))
            : Number(hotel.price);

        if (isNaN(price)) return false;

        if (priceFilter === "below2000") return price < 2000;
        if (priceFilter === "between2000and5000")
          return price >= 2000 && price <= 5000;
        if (priceFilter === "above5000") return price > 5000;
        return true;
      })
      .filter((hotel) => {
        const rawDiscount = hotel.discount ?? 0;
        const discount =
          typeof rawDiscount === "string"
            ? parseFloat(rawDiscount.replace("%", ""))
            : Number(rawDiscount);

        if (isNaN(discount)) return false;

        if (discountFilter === "above10") return discount > 10;
        if (discountFilter === "below20") return discount < 20;
        if (discountFilter === "between20and30")
          return discount >= 20 && discount <= 30;
        return true;
      })
      .filter((hotel) => {
        if (modeFilter.length === 0) return true; // If no modes are selected, show all
        return modeFilter.some((mode) => hotel.mood?.toLowerCase().includes(mode));
      });
  };

  const filteredHotels = filterHotels();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar
        setsearch={setSearch}
        search={search}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Chatbot */}
      <Chatbot />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <h1
          className={`text-4xl font-bold mb-8 select-none ${
            isDarkMode ? "text-indigo-300" : "text-blue-600"
          }`}
        >
          Hotels
        </h1>

        {/* 🎲 No Travel Mode Button */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={suggestRandomTrips}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            🎲 No Travel Mode – Surprise Me!
          </button>
          {randomTrips.length > 0 && (
            <button
              onClick={() => setRandomTrips([])}
              className="text-sm underline text-blue-500 hover:text-blue-700"
            >
              Back to All Hotels
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 sticky top-24 self-start">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Filters</h2>

              {/* Rating */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Rating</h3>
                <FilterCheckbox
                  label="All"
                  checked={ratingFilter === "all"}
                  onChange={() => setRatingFilter("all")}
                />
                <FilterCheckbox
                  label="Above 3 Stars"
                  checked={ratingFilter === "above3"}
                  onChange={() => setRatingFilter("above3")}
                />
                <FilterCheckbox
                  label="Below 4 Stars"
                  checked={ratingFilter === "below4"}
                  onChange={() => setRatingFilter("below4")}
                />
                <FilterCheckbox
                  label="3 - 4 Stars"
                  checked={ratingFilter === "between3and4"}
                  onChange={() => setRatingFilter("between3and4")}
                />
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Price</h3>
                <FilterCheckbox
                  label="All"
                  checked={priceFilter === "all"}
                  onChange={() => setPriceFilter("all")}
                />
                <FilterCheckbox
                  label="Below ₹2000"
                  checked={priceFilter === "below2000"}
                  onChange={() => setPriceFilter("below2000")}
                />
                <FilterCheckbox
                  label="₹2000 - ₹5000"
                  checked={priceFilter === "between2000and5000"}
                  onChange={() => setPriceFilter("between2000and5000")}
                />
                <FilterCheckbox
                  label="Above ₹5000"
                  checked={priceFilter === "above5000"}
                  onChange={() => setPriceFilter("above5000")}
                />
              </div>

              {/* Discount */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Discount</h3>
                <FilterCheckbox
                  label="All"
                  checked={discountFilter === "all"}
                  onChange={() => setDiscountFilter("all")}
                />
                <FilterCheckbox
                  label="Above 10%"
                  checked={discountFilter === "above10"}
                  onChange={() => setDiscountFilter("above10")}
                />
                <FilterCheckbox
                  label="Below 20%"
                  checked={discountFilter === "below20"}
                  onChange={() => setDiscountFilter("below20")}
                />
                <FilterCheckbox
                  label="20% - 30%"
                  checked={discountFilter === "between20and30"}
                  onChange={() => setDiscountFilter("between20and30")}
                />
              </div>

              {/* Mode */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Mode</h3>
                <FilterCheckbox
                  label="Romantic"
                  checked={modeFilter.includes("romantic")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("romantic")
                        ? prev.filter((item) => item !== "romantic")
                        : [...prev, "romantic"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Adventurous"
                  checked={modeFilter.includes("adventurous")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("adventurous")
                        ? prev.filter((item) => item !== "adventurous")
                        : [...prev, "adventurous"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Spiritual"
                  checked={modeFilter.includes("spiritual")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("spiritual")
                        ? prev.filter((item) => item !== "spiritual")
                        : [...prev, "spiritual"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Luxurious"
                  checked={modeFilter.includes("luxurious")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("luxurious")
                        ? prev.filter((item) => item !== "luxurious")
                        : [...prev, "luxurious"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Rejuvenating"
                  checked={modeFilter.includes("rejuvenating")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("rejuvenating")
                        ? prev.filter((item) => item !== "rejuvenating")
                        : [...prev, "rejuvenating"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Cultural"
                  checked={modeFilter.includes("cultural")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("cultural")
                        ? prev.filter((item) => item !== "cultural")
                        : [...prev, "cultural"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Wild"
                  checked={modeFilter.includes("wild")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("wild")
                        ? prev.filter((item) => item !== "wild")
                        : [...prev, "wild"]
                    )
                  }
                />
                <FilterCheckbox
                  label="Serene"
                  checked={modeFilter.includes("serene")}
                  onChange={() =>
                    setModeFilter((prev) =>
                      prev.includes("serene")
                        ? prev.filter((item) => item !== "serene")
                        : [...prev, "serene"]
                    )
                  }
                />
              </div>
            </div>
          </aside>

          {/* Hotels */}
          <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {randomTrips.length > 0 ? (
              randomTrips.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <p className="text-center col-span-full text-lg">
                No hotels match your filters.
              </p>
            )}
          </section>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

// 🧩 Reusable Filter Checkbox
const FilterCheckbox = ({ label, checked, onChange }) => (
  <div className="flex items-center mb-3">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-3 rounded-sm text-indigo-600"
    />
    <label className="text-white">{label}</label>
  </div>
);
