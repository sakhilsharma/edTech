//import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const TestCourses = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const host = "http://localhost:5000";
            const url = `${host}/api/courseData/`;
            const response = await fetch(url);
            const result = await response.json();
            
            try {
                if (result) {

                    setData(result.data);
                    setLoading(false);
                }
            }
            catch (err) {
                console.log(err);
                setLoading(true);
                throw err;
            };
        }
        fetchData();
    }, []
    )


    console.log(data);
    return (
        <>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Test - Courses</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect test-course for your job profile as per test-syllabus.
                    </p>
                </div>
                {loading ? <p>Loading...</p> : data ? (
                    <div >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {data.map((course, idx) => (
                                <div key={idx} className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 flex flex-col">
                                    {/* Image Section */}
                                    <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                                        <img
                                            src={course.imageUrl || 'https://placeholder.com/400x300'}
                                            alt={`${course.title} course`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <h2 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h2>
                                    <p className="text-gray-600 mb-3">{course.description}</p>

                                    {/* Author Section */}
                                    <p className="text-sm text-gray-500 mb-4">
                                        By <span className="font-medium text-gray-700">{course.author || 'Unknown Author'}</span>
                                    </p>

                                    {/* Button Section */}
                                    <div className="mt-auto">
                                        <button
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                            onClick={() => navigate('/horizontalCourses')}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            )).slice(0, 3)
                            }
                        </div>
                    </div>
                ) : (<p>No Data Available</p>)}
                {/* Button Section-2 */}

                <div className="mt-auto button-end w-48 mx-auto mb-8">
                    <button
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => navigate('/all-courses')}
                    >
                        View All Courses
                    </button>

                </div>
            </div >
            </>
    )
}
export default TestCourses;

