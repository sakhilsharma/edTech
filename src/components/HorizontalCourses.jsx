import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HorizontalCourses() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const host = "http://localhost:5000";
                const url = `${host}/api/courseData/`;
                const response = await fetch(url);
                const result = await response.json();
                setData(result.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    function isAuthenticated(){
        
    }

    return (
        <div className="w-full bg-white py-12">
            <div className="container mx-auto px-4">
                {/* Back Button and Header Row */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <span className="mr-2">←</span>
                        Back
                    </button>
                    <div className="flex-1 flex justify-between items-center">
                        <h2 className="group text-2xl font-bold text-gray-800 inline-block">
                            All Test - Courses
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
                        </h2>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center text-gray-600 hover:text-blue-600"
                        >
                            <span className="mr-2">Details</span>
                            <span>{isOpen ? '▼' : '▶'}</span>
                        </button>
                    </div>
                </div>

                {/* Global Dropdown Content */}
                {isOpen && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">About Our Courses:</span>
                            Comprehensive test preparation courses designed to help you succeed in your career.
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Features:</span>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Expert instructors</li>
                                <li>Test-Based Assessments</li>
                                <li>Industry-Curated Test Syllabus</li>
                                <li>24/7 support</li>
                            </ul>
                        </p>
                    </div>
                )}

                {/* Course Listings with Enhanced Loader */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600 text-lg animate-pulse">Loading Courses...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        {data.map((course) => (
                            <div
                                key={course.id}
                                className="w-full bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <h3 className="group text-xl font-semibold text-gray-800 mb-2 inline-block">
                                        {course.title}
                                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
                                    </h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-lg font-bold text-blue-600">
                                            ${course.price?.toFixed(2) || 'Free'}
                                        </p>
                                        <button
                                            onClick={"handleEnrollClick"}
                                            className={`text-sm px-6 py-2 rounded-lg transition-colors duration-300 
                                                ${isAuthenticated()
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            {isAuthenticated() ? 'Enroll Now' : 'Sign in to Enroll'}
                                        </button>
                                    </div>

                                    {/* DEcription Title */}
                                    <h3 className="text-sm  text-gray-800 mb-2">
                                        *{course.description}
                                    </h3>



                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HorizontalCourses
