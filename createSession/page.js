"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account,database,ID,storage } from "../../appwrite";

const Page = () => {
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState();
  const [handle, setHandle] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [timeLimit, setTimeLimit] = useState("00:00");
  const [code, setCode] = useState("");
  const [bgImage, setBgImage] = useState();
  const [logo, setLogo] = useState();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const user = account.get();
    user.then(
      (res) => {
        setUser(res);
      },
      (err) => {
        router.push("");
      }
    );
  }, [router]);

  const scrollToForm = () => {
    setShowForm(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => {
    const response = await fetch("/api/signout", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/organizerAccount/login");
    } else {
      console.error("Failed to logout");
    }
  };
  
  const handleAddSession = async () => {
    try {
      await database.createDocument(
        "66262a5fe83579cf8b0e",
        "66262a793e4f8ec3a0ca",
        ID.unique(),
        {
          Name: name,
          Handle: handle,
          Code: code,
          startTime: startTime,
          Time_Limit: timeLimit,
          quizConfig:quizConfig1,
        }
      );
      console.log("Session created successfully!");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
 const handleConfig = async () => {
   try {
     const logoUrl = await storage.createFile(
       "65fd6912304ce7300161", 
       ID.unique(), 
       logo 
     );
     const bgImageUrl = await storage.createFile(
       "65fd6912304ce7300161", 
       ID.unique(), 
       bgImage 
     );

     // Update the configuration document in your database with logoUrl and bgImageUrl
     await database.updateDocument(
       "66262a5fe83579cf8b0e", 
       "663b4cf31be4f4b456fa", 
       ID.unique(),
       {
         Logo: logoUrl,
         BackgroundImage: bgImageUrl,
       }
     );

     console.log("Configuration updated successfully!");
   } catch (error) {
     console.error("Error updating configuration:", error);
   }
 };


  return (
    <>
      <header className="shadow-[0 2px 10px -3px rgba(6,81,237,0.3)] sticky top-0 py-3 px-4 sm:px-10 bg-white z-50 min-h-[70px]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <img src="/images/logo.png" alt="logo" className="w-44" />
          </Link>
          <div className="flex items-center max-sm:ml-auto space-x-6 ">
            <ul>
              <li className="relative px-1 after:absolute after:bg-black after:w-full after:h-[2px] after:block after:top-8 after:left-0 after:transition-all after:duration-300">
                <button
                  id="toggleOpen"
                  className="cursor-pointer hover:fill-black"
                  onClick={toggleOpen}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="bg-white z-20 shadow-md py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] absolute right-0 top-10">
                    <h6 className="font-semibold text-[15px]">Welcome</h6>
                    <p className="text-sm text-gray-500 mt-1">
                      To access account and manage orders
                    </p>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className=" bg-blue-600 border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 px-6 sm:py-40 py-50 font-[sans-serif] ">
        <div className="max-w-screen-xl mx-auto text-center text-white">
          <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-4">
            Create Your Own Session
          </h1>
          <p className="text-lg mb-8">
            Experience excellence like never before with our exclusive products
            and services.
          </p>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-2 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
            onClick={scrollToForm}
          >
            Get Started
          </button>
        </div>
      </div>
      <section
        ref={formRef}
        className={`h-screen flex flex-col items-center justify-center bg-gradient-to-b mt-12 ${
          showForm ? "" : "animate__animated animate__slideOutDown"
        }`}
      >
        <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
          <div class="text-center mb-25">
            <h4 class="text-3xl font-semibold mb-3">Create Session</h4>
          </div>
          <form className="mt-22">
            <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
              <div>
                <label class="text-sm mb-2 block">Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Handle</label>
                <input
                  name="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  type="text"
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block" htmlFor="eventDate">
                  {" "}
                  StartTime
                </label>
                <input
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block" htmlFor="eventDate">
                  {" "}
                  TimeLimit
                </label>
                <input
                  id="timeLimit"
                  type="time"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Code</label>
                <input
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="password"
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label
                  htmlFor="logo-file-upload"
                  className="text-sm mb-2 block"
                >
                  Background Image
                </label>

                <input
                  type="file"
                  className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                  onChange={(e) => setBgImage(e.target.files[0])}
                />
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </div>
              <div>
                <label
                  htmlFor="logo-file-upload"
                  className="text-sm mb-1 block"
                  onChange={(e) => setLogo(e.target.files[0])}
                >
                  Logo
                </label>
                <input
                  type="file"
                  className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                />
                <p class="text-xs text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                onClick={handleAddSession}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
