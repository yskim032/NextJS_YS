import Animation from "./animation";
import Link from "next/link";

export default function Hero() {
  return (
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">

            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Best solution for Android APP devolopers
            </h1>
            <p className="mb-8 leading-relaxed">We provide the best end-to-end solution for Android developers, covering both frontend and backend.</p>
            <div className="flex justify-center">

            <Link legacyBehavior href="/projects">

                <a className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go to project</a>

            </Link>


            </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <Animation />
            </div>
        </div>
        
  )
}
