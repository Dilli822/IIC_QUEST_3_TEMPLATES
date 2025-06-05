import React, { useState } from "react";
// import SearchResult from "./SearchResult";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterOption from "./FilterOption";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [selectedCats, setSelectedCats] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleFilterChange = (categories, price) => {
    setSelectedCats(categories);
    setSortByPrice(price);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 ">
      <div className="flex flex-col md:flex-row gap-10">
        <FilterOption handleFilterChange={handleFilterChange} />
        <span className="border"></span>
        <div className="flex-1">
          <h1>
            Searched for <span className="text-blue-500 italic">{query}</span>
          </h1>
          {/* {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )} */}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

const CourseSkeleton = () => {
  return <p>Loading...</p>;
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};
