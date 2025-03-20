import React from "react";
import { ArrowRight } from "lucide-react"; 
const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1: Nesciunt Mete */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Nesciunt Mete
            </h3>
            <p className="text-gray-600 mb-6">
              Provident nihil minus qui consequatur non omnis maiores. Eos
              accusantium minus dolores iure perferendis tempore et consequatur.
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Service 2: Ledo Markt */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ledo Markt
            </h3>
            <p className="text-gray-600 mb-6">
              Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus
              ea aut. Vel qui id voluptas adipisci eos earum corrupti.
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Service 3: Eoste Commodi */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Eoste Commodi
            </h3>
            <p className="text-gray-600 mb-6">
              Ut autem aut autem non a. Sint sint sit facilis nam justo sint.
              Libero corrupti neque eum hic non ut nesciunt dolorem.
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Service 4: Asperiores Commodit */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Asperiores Commodit
            </h3>
            <p className="text-gray-600 mb-6">
              Non et temporibus minus omnis sed dolor esse consequatur.
              Cupiditate sed error ea fuga sit provident adipisci neque.
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
