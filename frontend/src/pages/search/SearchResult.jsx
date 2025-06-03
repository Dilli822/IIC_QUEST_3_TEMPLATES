// import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

function SearchResult({ course }) {
  const courseId = 123;
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center  border-b border-gray-300 gap-4 py-4">
      <Link
        to={`/course-detail/${courseId}`}
        className="flex flex-col md:flex-row gap-4 w-full  md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Intructor: <span className="font-bold">{course.creator?.name}</span>{" "}
          </p>
          <div className="flex flex-wrap gap-2">
            {course?.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
}

export default SearchResult;
