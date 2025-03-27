import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ReceiptRefundIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

import { filters, singleFilter, sortOptions } from "./FilterData";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { productdata } from "../../../../data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  findProducts,
  findProductsByCategory,
} from "../../../../Redux/Customers/Product/Action";
import { deepPurple } from "@mui/material/colors";
import { Backdrop, CircularProgress } from "@mui/material";
import BackdropComponent from "../../BackDrop/Backdrop";
import NoDataCard from "../../NoDataCard";
import Button from "@mui/material/Button";
import PriceRangeFilter from "./PriceRangeFilter";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const theme = useTheme();

  // Navigating to a Different Route and Updating the Query String and Redirecting After an Action
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 
  const { customersProduct } = useSelector((store) => store);

  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [name, setName] = useState("");
  const [filter, setFilters] = useState({
    color: [],
    size: [],
    price: "",
    discount: "",
    stock: "",
  });

  // location.search provides the query string part of the URL, including the leading ?
  // decodeURIComponent is a JavaScript function that decodes a URI component.
  // It's used here to decode the query string, ensuring that any encoded characters (like %20 for spaces) are properly decoded to their original form.
  const decodedQueryString = decodeURIComponent(location.search);
  useEffect(() => {
    // URLSearchParams is an interface or api which  takes the decoded query string as a parameter and parses it into an iterable object,
    // allowing easy access to individual query parameters.
    const searchParams = new URLSearchParams(decodedQueryString);

    const colorValue = searchParams.get("color");

    const sizeValue = searchParams.get("size");
    const price = searchParams.get("price");
    const discount = searchParams.get("discount");
    const sortValue = searchParams.get("sort");
    const searchValue = searchParams.get("search");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");
    setName(searchValue || "");
    setFilters({
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      price: price || "",
      discount: discount || "",
      stock: stock || "",
    });

    const [minPrice, maxPrice] =
      price === null ? [0, 0] : price.split("-").map(Number);
    const data = {
      category: param.lavelThree || null,
      colors: colorValue || [],
      sizes: sizeValue || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || null,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber,
      search: searchValue || "",
      pageSize: 10,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [location.search, param.lavelThree, dispatch]);

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleSearchChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    setName(value);
    if (!value) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", value);
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // handles the changes in checkbox filters.
  const handleFilter = (value, sectionId) => {
    const { search } = location;
    const searchParams = new URLSearchParams(search);

    // Get the current filter values for the section
    const filterValuesString = searchParams.get(sectionId);
    let filterValues = filterValuesString ? filterValuesString.split(",") : [];

    const valueIndex = filterValues.indexOf(value);
    if (valueIndex > -1) {
      filterValues.splice(valueIndex, 1);
    } else {
      filterValues.push(value);
    }
    // Update the searchParams based on the modified filterValues
    if (filterValues.length > 0) {
      searchParams.set(sectionId, filterValues.join(","));
    } else {
      searchParams.delete(sectionId);
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  // handles changes in radio button filters.
  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handleClearFilters = () => {
    setFilters({
      color: [],
      size: [],
      price: "",
      discount: "",
      stock: "",
    });
    setName("");

    // Clear all query parameters related to filters
    const searchParams = new URLSearchParams(location.search);
    ["color", "size", "price", "discount", "stock", "search", "sort"].forEach(
      (param) => searchParams.delete(param)
    );

    // Navigate to the updated URL
    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
    if (customersProduct.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [customersProduct.loading]);

  // let maxPrice =  Math.max(...customersProduct?.products?.content?.map((v)=>v.price))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="p-4 border-t bg-gray-900 border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flex justify-between items-center text-lg font-medium text-white py-4">
                              <Disclosure.Button className="flex items-centertext-white hover:text-white">
                                <span>{section.name}</span>
                                <span className="ml-3">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>

                            <Disclosure.Panel className="grid grid-cols-3 gap-2 mt-2">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex flex-col items-center space-y-1"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    checked={
                                      filter[section.id]?.includes(
                                        option.value
                                      ) || false
                                    }
                                    className="sr-only"
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                  />

                                  {section.id === "color" ? (
                                    <div className="flex flex-col items-center space-y-1">
                                      <div
                                        className={`relative rounded-full p-1 ${
                                          filter[section.id]?.includes(
                                            option.value
                                          )
                                            ? "border-2 border-black bg-white"
                                            : "border-1 border-white"
                                        }`}
                                      >
                                        <label
                                          htmlFor={`filter-${section.id}-${optionIdx}`}
                                          className="block h-6 w-6 rounded-full cursor-pointer"
                                          style={{
                                            backgroundColor: option.value,
                                          }}
                                        />
                                      </div>
                                      <span className="text-white text-xs">
                                        {option.label}
                                      </span>
                                    </div>
                                  ) : (
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="inline-flex items-center cursor-pointer text-xs"
                                    >
                                      <input
                                        type="checkbox"
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        value={option.value}
                                        checked={
                                          filter[section.id]?.includes(
                                            option.value
                                          ) || false
                                        }
                                        onChange={() =>
                                          handleFilter(option.value, section.id)
                                        }
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      />
                                      <span className="ml-2 text-white">
                                        {option.label}
                                      </span>
                                    </label>
                                  )}
                                </div>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}

                    {singleFilter.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 pb-4 mb-4"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flex justify-between items-center text-lg font-medium text-white py-4">
                              <Disclosure.Button className="flex items-center text-white hover:text-white">
                                <span>{section.name}</span>
                                <span className="ml-3">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>

                            {section.id === "price" ? (
                              <Disclosure.Panel className="pt-2">
                                <PriceRangeFilter section={section} />
                              </Disclosure.Panel>
                            ) : (
                              <Disclosure.Panel className="pt-2">
                                <FormControl>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                  >
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={
                                          <Radio
                                            size="small"
                                            style={{ color: "white" }}
                                          />
                                        }
                                        label={option.label}
                                        className="text-xs[20] text-white"
                                        sx={{
                                          "& .MuiTypography-root": {
                                            fontSize: "0.95rem",
                                          },
                                        }}
                                        checked={
                                          filter[section.id] === option.value
                                        }
                                        onChange={(e) =>
                                          handleRadioFilterChange(e, section.id)
                                        }
                                      />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              </Disclosure.Panel>
                            )}
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 lg:px-14 pb-2 pt-3 ">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-0">
              Product
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 w-auto">
              {/* Search Field */}
              <div className="flex flex-row items-center space-x-4 w-auto">
                <TextField
                  id="outlined-search"
                  label="Search here"
                  variant="outlined"
                  size="small"
                  name="text"
                  sx={{
                    width: isSmallScreen ? "250px" : "400px", 
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ced4da",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0056b3",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#007bff",
                      },
                    },
                    "& .MuiInputLabel-outlined": {
                      color: "#6c757d",
                    },
                    "& .MuiInputLabel-outlined.Mui-focused": {
                      color: "#007bff",
                    },
                  }}
                  value={name}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="mb-4 sm:mb-0"
                />

                {/* Sort Menu */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={() => handleSortChange(option.query)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Grid and Filter Buttons */}
              <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0">
                {/* <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button> */}
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-1 pt-2">
            <h4 id="products-heading" className="sr-only">
              Products
            </h4>

            <div className="p-2 bg-gray-50 min-h-screen">
              <div className="flex flex-col items-start space-y-2 mb-1 ">
                {/* Title visible only on larger screens */}
              
                {/* Filters Button */}
                <button
                  type="button"
                  className="flex items-center bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 px-4 py-2 rounded-lg lg:hidden" // Hide on large screens
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-gray-600">All Filters</span>{" "}
                  {/* Ensures text is visible */}
                  <FunnelIcon
                    className="h-6 w-6 text-gray-600 hover:text-gray-800 ml-2"
                    aria-hidden="true"
                  />
                </button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    mb: 1,
                    px: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "error.main",
                    },
                  }}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                {/* Filters */}
                <div className="hidden lg:block border rounded-lg bg-gray-900 shadow-md p-4 self-start ">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="flex justify-between items-center text-md font-medium text-white">
                            <Disclosure.Button className="flex items-center text-white hover:text-blue-500">
                              <span>{section.name}</span>
                              <span className="ml-2">
                                {open ? (
                                  <MinusIcon
                                    className="h-4 w-4 text-white"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-4 w-4 text-white"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="grid grid-cols-3 gap-2 mt-2 ">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex flex-col items-center space-y-1"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  checked={
                                    filter[section.id]?.includes(
                                      option.value
                                    ) || false
                                  }
                                  className="sr-only"
                                  onChange={() =>
                                    handleFilter(option.value, section.id)
                                  }
                                />

                                {section.id === "color" ? (
                                  <div className="flex flex-col items-center space-y-1">
                                    <div
                                      className={`relative rounded-full p-1 ${
                                        filter[section.id]?.includes(
                                          option.value
                                        )
                                          ? "border-2 border-black bg-white"
                                          : "border-1 border-white"
                                      }`}
                                    >
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="block h-4 w-4 rounded-full cursor-pointer"
                                        style={{
                                          backgroundColor: option.value,
                                        }}
                                      />
                                    </div>
                                    <span className="text-white text-xs">
                                      {option.label}
                                    </span>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="inline-flex items-center cursor-pointer text-xs"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      value={option.value}
                                      checked={
                                        filter[section.id]?.includes(
                                          option.value
                                        ) || false
                                      }
                                      onChange={() =>
                                        handleFilter(option.value, section.id)
                                      }
                                      className="h-3 w-3 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <span className="ml-1 text-white">
                                      {option.label}
                                    </span>
                                  </label>
                                )}
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="flex justify-between items-center text-md font-medium text-white">
                            <Disclosure.Button className="flex items-center text-white hover:text-blue-500">
                              <span>{section.name}</span>
                              <span className="ml-2">
                                {open ? (
                                  <MinusIcon
                                    className="h-4 w-4 text-white"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-4 w-4 text-white"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          {section.id === "price" ? (
                            <Disclosure.Panel className="p-4">
                              <PriceRangeFilter section={section} />
                            </Disclosure.Panel>
                          ) : (
                            <Disclosure.Panel className="pt-2">
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name="radio-buttons-group"
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <FormControlLabel
                                      key={option.value}
                                      value={option.value}
                                      control={
                                        <Radio
                                          size="small"
                                          style={{ color: "white" }}
                                        />
                                      }
                                      label={option.label}
                                      className="text-xs[20] text-white"
                                      sx={{
                                        "& .MuiTypography-root": {
                                          fontSize: "0.95rem",
                                        },
                                      }}
                                      checked={
                                        filter[section.id] === option.value
                                      }
                                      onChange={(e) =>
                                        handleRadioFilterChange(e, section.id)
                                      }
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Disclosure.Panel>
                          )}
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
                {/* Product grid */}
                <div className="lg:col-span-4 w-full self-start ">
                  <div className="flex flex-wrap justify-center bg-white border py-5 rounded-md ">
                    {customersProduct?.products?.content?.map((item) => (
                      <ProductCard product={item} />
                    ))}
                    {!customersProduct?.products?.content?.length && (
                      <NoDataCard
                        noDataFoundText="No Product Found"
                        styleCardProps={{ style: { height: 600 } }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* pagination section */}
        <div className="mt-1 flex justify-center pb-2">
          <Pagination
            count={customersProduct.products?.totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            variant="outlined"
            shape="rounded"
          />
        </div>

        {/* {backdrop} */}
        <section>
          <BackdropComponent open={isLoaderOpen} />
        </section>
      </div>
    </div>
  );
}
