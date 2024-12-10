import React from "react";
import {
  FaArrowLeft,
  FaClock,
  FaUsers,
  FaStar,
  FaGraduationCap,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const LearnMore = ({ course, onBack }) => {
  return (
    <>
    <Helmet>
      <title>Learn More | Mera Bestie</title>
    </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Courses
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-blue-500 mr-2" />
                <span>{course.students} students enrolled</span>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-blue-500 mr-2" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <FaChalkboardTeacher className="text-blue-500 mr-2" />
                <span>{course.instructor}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Course Overview</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {course.fullDescription}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">What You'll Learn</h2>
              <ul className="list-disc list-inside text-gray-600">
                {course.fullDescription
                  .split("\n")
                  .filter((line) => line.trim().startsWith("-"))
                  .map((item, index) => (
                    <li key={index} className="mb-1">
                      {item.trim().substring(1).trim()}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">
                  {course.rating.toFixed(1)}
                </span>
                <span className="text-gray-600 ml-1">
                  ({course.totalReviews} reviews)
                </span>
              </div>
              <div>
                <span className="font-semibold text-2xl">${course.price}</span>
                <span className="text-gray-600 ml-2">
                  or ${course.monthlyPrice}/mo
                </span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LearnMore;
