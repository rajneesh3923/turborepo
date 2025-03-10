import { Star } from "lucide-react";
import Image from "next/image";
import { FaBed, FaBath, FaParking } from "react-icons/fa";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <div className="w-1/2 flex items-center justify-center bg-white  p-8">
        {children}
      </div>
      <div className="w-1/2 flex items-center  login_bg  ">
        <div className="min-h-screen w-full flex items-center p-4 pl-40">
          <div className=" h-[30Rem] rounded-lg shadow-lg overflow-hidden max-w-sm w-full bg-white min-w-[28Rem] ">
            <div className="relative h-56 w-full rounded-md p-4 bg-white">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/images/destination.png"
                  alt="Tropical Paradise"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4  bg-white">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2">
                Tropical Paradise Getaway
              </h2>
              <p className="text-gray-600 text-sm">
                Booked by: <span className="font-semibold">Tushar Mehta</span>
              </p>

              <hr className="border-t border-gray-300 my-4" />
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <FaBed className="text-indigo-400" />
                  <span>4 beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBath className="text-indigo-400" />
                  <span>2 bathrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaParking className="text-indigo-400" />
                  <span>Free parking</span>
                </div>
              </div>

              <div className="my-4 p-4 bg-indigo-100 h-16 w-full border border-indigo-200 rounded-lg flex items-center justify-between">
                <p className="font-bold text-lg">
                  ₹ 3,400 <span className="font-light"> /Night</span>
                </p>
                <button className="px-6 py-3 bg-indigo-400 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
