import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "frontend-development", label: "Frontend Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "fullstack-development", label: "Fullstack Development" },
  { id: "mern-stack", label: "MERN Stack" },
  { id: "python-development", label: "Python Development" },
  { id: "reactjs", label: "React.js" },
  { id: "nodejs-development", label: "Node.js Development" },
  { id: "database-management", label: "Database Management" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "devops", label: "DevOps" },
];

function FilterOption({ handleFilterChange }) {
  const [selectedCats, setSelectedCats] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (catId) => {
    setSelectedCats((prevCats) => {
      const newCats = prevCats.includes(catId)
        ? prevCats.filter((id) => id !== catId)
        : [...prevCats, catId];

      handleFilterChange(newCats, sortByPrice);
      return newCats;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCats, selectedValue);
  };
  return (
    <div className="w-full md:w-[20%]">
      <div className="grid gap-2">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="text-xl font-bold">Category</h1>
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center space-x-2 my-2">
            <Checkbox
              id={cat.id}
              onCheckedChange={() => handleCategoryChange(cat.id)}
            />
            <Label className="text-sm font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {cat.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterOption;
