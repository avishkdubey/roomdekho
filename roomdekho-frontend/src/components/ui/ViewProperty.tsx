import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faHome,
  faUser,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

// Demo data for now (replace with API call later)
const demoProperties = [
  {
    id: 1,
    owner: "Divyansh Vyas",
    type: "2BHK Flat",
    location: "Gwalior, MP",
    price: 8500,
    status: "Pending",
    description:
      "Spacious 2BHK flat with natural light, close to markets and schools.",
    images: [
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1019/600/400",
    ],
  },
  {
    id: 2,
    owner: "Abhishek Dubey",
    type: "1RK Room",
    location: "Indore, MP",
    price: 6000,
    status: "Approved",
    description: "Compact and budget-friendly 1RK with good ventilation.",
    images: [
      "https://picsum.photos/id/1025/600/400",
      "https://picsum.photos/id/1035/600/400",
    ],
  },
];

const ViewProperty: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = demoProperties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Property not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-5 py-2 bg-yellow-500 rounded-lg text-gray-900 hover:bg-yellow-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-yellow-600 hover:text-yellow-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Properties
      </button>

      {/* Property Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Main Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={property.images[0]}
              alt={property.type}
              className="w-full h-64 object-cover md:h-full"
            />
          </motion.div>

          {/* Info */}
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{property.type}</h2>
            <p className="text-gray-600">{property.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-yellow-500" />
                {property.owner}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-yellow-500" />
                {property.location}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2 text-yellow-500" />
                {property.status}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2 text-yellow-500" />
                ₹{property.price?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {property.images.length > 1 && (
        <motion.div
          className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {property.images.slice(1).map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`property-${i}`}
              className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ViewProperty;
