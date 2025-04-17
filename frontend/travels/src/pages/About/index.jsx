import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Us
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 sm:mb-12">
            Welcome to our platform! We are dedicated to providing you with the
            best hotel booking experience. Our mission is to make your travel
            planning seamless, affordable, and enjoyable.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8 text-left">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                To be the world's most trusted travel companion, connecting
                travelers with unforgettable experiences.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Our Values
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Customer satisfaction, transparency, innovation, and
                sustainability guide everything we do.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We offer competitive prices, verified reviews, and 24/7 customer
                support to ensure you have peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
