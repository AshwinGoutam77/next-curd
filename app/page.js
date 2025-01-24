'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setData({
        email: "",
        password: ""
      })
      router.push('/home');
    } catch (error) {
      console.error('Error submitting data:', error);
      setResponseMessage('Failed to add data.');
    }
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up to Dashboard</h2>

            <form action="#" method="POST" className="mt-8" onSubmit={handleLogin}>
              <div className="space-y-5">

                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      value={Data.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter email to get started"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="password"
                      value={Data.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" name="agree" id="agree" className="w-5 h-5 text-blue-600 bg-white border-gray-200 rounded" />

                  <label htmlFor="agree" className="ml-3 text-sm font-medium text-gray-500">
                    I agree to Postcraft’s <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <div>
                  <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                    Create free account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div>
            <img className="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

            <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <h3 className="text-2xl font-bold text-center text-black">Design your own card</h3>
              <p className="leading-relaxed text-center text-gray-500 mt-2.5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>

              <div className="flex items-center justify-center mt-10 space-x-3">
                <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
