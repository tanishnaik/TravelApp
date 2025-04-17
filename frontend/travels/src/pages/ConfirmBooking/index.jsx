import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const ConfirmBooking = () => {
  const { state } = useLocation();
  const booking = state?.booking;
  const navigate = useNavigate();

  const roomPrices = {
    Standard: 2000,
    Deluxe: 3000,
    Suite: 5000,
  };

  const nights = booking && Math.ceil(
    (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
  );

  const pricePerNight = booking ? roomPrices[booking.roomType] : 0;
  const totalPrice = pricePerNight * nights;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-md mx-4 sm:mx-auto mt-6 sm:mt-10 md:mt-12 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl sm:rounded-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 text-center mb-4 sm:mb-6">
              🎉 Booking Confirmed!
            </h1>
            
            {booking ? (
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p className="truncate">{booking.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="truncate">{booking.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold">Room Type:</p>
                    <p>{booking.roomType.charAt(0).toUpperCase() + booking.roomType.slice(1)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Guests:</p>
                    <p>{booking.guest}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold">Check-in:</p>
                    <p>{new Date(booking.checkIn).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Check-out:</p>
                    <p>{new Date(booking.checkOut).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Total Price</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-baseline">
                    <p className="text-gray-600 dark:text-gray-400">
                      ₹{pricePerNight.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 space-y-3">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Go to Home
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Back to Booking
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-lg sm:text-xl text-red-500 dark:text-red-400 mb-4">
                  ❌ Booking Information Missing
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Return Home
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
