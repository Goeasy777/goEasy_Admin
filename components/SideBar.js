"use client";
import { useState } from "react";
import Link from "next/link";
// import Logo from "@/app/assets/images/Logo.png";
import { ImHammer2 } from "react-icons/im";
import {
  FaListOl,
  FaTools,
  // FaClock,
  FaChevronUp,
  FaChevronDown,
  FaCheckCircle,
  FaCommentDots,
  FaFlag,
  FaCreativeCommonsShare,
  FaUserTie,
} from "react-icons/fa";
import { MdPhotoSizeSelectActual, MdCancel } from "react-icons/md";
import { IoMdPeople, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { FaCartShopping, FaLocationDot, FaClock } from "react-icons/fa6";
import { RiDashboard3Fill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { IoTime } from "react-icons/io5";

// new
import { ImUserCheck } from "react-icons/im";
import "@/app/globals.css";

const Sidebar = () => {
  // const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // State for active dropdown
  const [activeLink, setActiveLink] = useState("");
  // Toggle sidebar
  // const toggleSidebar = () => {
  //     setIsSidebarOpen(!isSidebarOpen);
  // };

  // Toggle dropdowns without affecting sidebar
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Banner data
  const Banner = [
    {
      label: "Banner",
      icon: <MdPhotoSizeSelectActual size={18} />,
      items: [
        { name: "Add Banner", link: "/banner/add" },
        { name: "List Banner", link: "/banner/list" },
      ],
    },
  ];

  // City data
  const City = [
    {
      label: "City",
      icon: <FaLocationDot size={18} />,
      items: [
        { name: "Add City", link: "/city/add" },
        { name: "List City", link: "/city/list" },
      ],
    },
  ];

  //Time and slot
  const TimeSlot = [
    {
      label: "Time & Slot",
      icon: <IoTime size={22} />,
      items: [
        { name: "Add Timeslot & date", link: "/timeslot/add" },
        { name: "List Timeslot & date", link: "/timeslot/list" },
      ],
    },
  ];

  // General Category data
  const GeneralCategorySection = [
    {
      label: "Main Category",
      icon: <FaListOl size={16} />,
      items: [
        { name: "Add Main Category", link: "/category/add" },
        { name: "List Main Category", link: "/category/list" },
      ],
    },
    {
      label: "Sub Category",
      icon: <FaListOl size={16} />,
      items: [
        { name: "Add Sub Category", link: "/subcategory/add" },
        { name: "List Sub Category", link: "/subcategory/list" },
      ],
    },
    {
      label: "Child Category",
      icon: <FaListOl size={16} />,
      items: [
        { name: "Add Child Category", link: "/childcategory/add" },
        { name: "List Child Category", link: "/childcategory/list" },
      ],
    },
    // { label: 'Ad On', icon: <MdAdd size={22} />, items: [{ name: 'Add Ad-On', link: '/addon/add' }, { name: 'List Ad-on', link: '/addon/list' }] },
  ];

  // Partner section
  const PartnerSection = [
    // { label: 'Partner Service', icon: <FaTools size={20} />, items: [{ name: 'Add Partner Service', link: '/partnerservice/add' }, { name: 'List Partner Service', link: '/partnerservice/list' }] },
    // { label: 'Credit Package', icon: <HiCreditCard size={18} />, items: [{ name: 'Add Credit Package', link: '/credit/add' }, { name: 'List Credit Package', link: '/credit/list' }] },
  ];

  //Dynamic Section
  const DynamicSection = [
    {
      label: "Offer Section",
      icon: <IoGrid size={16} />,
      items: [
        { name: "Add Section", link: "/section/add" },
        { name: "List Section", link: "/section/list" },
      ],
    },
    // { label: 'Offer Service', icon: <GrServices size={16} />, items: [{ name: 'Add Service', link: '/service/add' }, { name: 'List Service', link: '/service/list' }] },
  ];

  //Notification Section
  const NotificationSection = [
    {
      label: "Notification",
      icon: <IoMdNotifications size={20} />,
      items: [
        { name: "Push Notification", link: "/notification" },
        { name: "Custom Notification", link: "/customnotification" },
      ],
    },
  ];

  //Order Section
  const OrderSection = [
    {
      label: "Pending Order",
      icon: <FaCartShopping size={16} />,
      link: "/order/pending",
    },
    {
      label: "Progressing Order",
      icon: <FaClock size={18} />,
      link: "/order/progressing",
    },
    {
      label: "Completed Order",
      icon: <FaCheckCircle size={18} />,
      link: "/order/completed",
    },
    {
      label: "Cancelled Order",
      icon: <MdCancel size={20} />,
      link: "/order/cancelled",
    },
  ];

  //Customer Section
  const CustomerSection = [
    {
      label: "Testimonials",
      icon: <FaCommentDots size={16} />,
      items: [
        { name: 'Add Testimonial', link: '/testimonial/add' },
        { name: "List Testimonial", link: "/testimonial/list" },
      ],
    },
    {
      label: "Disputes",
      icon: <ImHammer2 size={18} />,
      items: [
        { name: 'Customer', link: '/dispute/customer' },
        { name: "Partner", link: "/dispute/partner" },
      ],
    },
  ];

  //Coupon Section
  const CouponSection = [
    {
      label: "Coupon",
      icon: <BiSolidOffer size={20} />,
      items: [
        { name: "Add Coupon", link: "/coupon/add" },
        { name: "List Coupon", link: "/coupon/list" },
      ],
    },
    {
      label: "Referral List",
      icon: <BiSolidOffer size={20} />,
      items: [
        { name: "Customer", link: "/referral/customer" },
        { name: "Partner", link: "/referral/partner" },
      ],
    },
  ];

  // new
  //clients&partner
  const OurClientsPartner = [
    {
      label: "Our Clients",
      icon: <ImUserCheck size={22} />,
      items: [
        { name: "Add Ourclients", link: "/ourclients/add" },
        { name: "List Ourclients", link: "/ourclients/list" },
      ],
    },
    {
      label: "Our Partners",
      icon: <ImUserCheck size={22} />,
      items: [
        { name: "Add Ourpartners", link: "/ourpartners/add" },
        { name: "List Ourpartners", link: "/ourpartners/list" },
      ],
    },
  ];

  //Country section
  const Country = [
    {
      label: "Country Code",
      icon: <FaFlag size={18} />,
      items: [
        { name: "Add Country Code", link: "/country/add" },
        { name: "List Country Code", link: "/country/list" },
      ],
    },
  ];

  // border bottom
  const HR = () => {
    return <hr className={`border-t-[1px] border-hrBorder w-full mb-1`} />;
  };

  return (
    <div
      // onClick={toggleSidebar}
      className={`w-60 items-start pl-6 bg-sidebarBG h-[92vh] flex flex-col relative duration-300 overflow-y-scroll scrollable-div `}
    >
      <div className="flex flex-col justify-start mt-3 w-full pr-2">
        {/* Dashboard */}
        <Link
          // href="/dashboard"
          // className="flex items-center mb-4 text-textWhite"
          href="/dashboard"
          className={`flex items-center mb-4 text-textWhite ${activeLink === "/dashboard" ? "" : ""}`}
          onClick={() => setActiveLink("/dashboard")}
        >
          <RiDashboard3Fill size={24} />
          <span className={`ml-2 uppercase text-sm `}>DashBoard</span>
        </Link>


        <HR />

        {/* CITY SECTION */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>CITY </span>
        </div>

        {/* city dropdown */}
        <div>
          {City.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 max-h-screen opacity-100 ${activeDropdown === dropdown.label.toLowerCase()
                  }`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm  text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* Banner Section */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>BANNER </span>
        </div>

        {/* Banner dropdown */}
        <div>
          {Banner.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2  text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100 `}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm  text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* General Category Section */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Category </span>
        </div>

        {/* GCS Dropdown */}
        <div>
          {GeneralCategorySection.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-2 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* Timeslot and date*/}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Timeslot</span>
        </div>

        {/* Timeslot and date  dropdown*/}
        <div>
          {TimeSlot.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48  transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* DynamicSection */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Offer</span>
        </div>

        {/* DynamicSection dropdown */}
        <div>
          {DynamicSection.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* Notification */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Noticication </span>
        </div>

        {/* Notification Dropdown */}
        <div>
          {NotificationSection.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* order section */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>order </span>
        </div>

        {/* Order Section */}
        <div>
          {OrderSection.map((order, index) => (
            <div key={index} className="mb-4">
              <Link href={order.link} passHref legacyBehavior>
                <div className="flex items-center mb-1 text-textWhite cursor-pointer">
                  {order.icon}
                  <span className={`ml-2 text-sm `}>{order.label}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <HR />

        {/* Partner Section  */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>PARTNER</span>
        </div>

        {/* Partner Section 1 elem  */}
        <div>
          <Link
            className="flex items-center mb-4 text-textWhite"
            href="/partner/list"
          >
            <IoMdPeople size={20} />
            <span className={`ml-2 text-sm `}>Partners</span>
          </Link>
        </div>

        <HR />

        {/* Customer Section  */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Customer </span>
        </div>

        {/* Customer Section 1 elem  */}
        <div>
          <Link
            className="flex items-center mb-3 text-textWhite"
            href="/customer"
          >
            <PiUsersThreeFill size={22} />
            <span className={`ml-2  text-sm`}>Customers</span>
          </Link>
        </div>

        {/* Customer dropdown */}
        <div>
          {CustomerSection.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer w-full n"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48  transition-all duration-200 flex items-center justify-between `}
                >
                  <span className={`ml-2  text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* Coupon Section  */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Coupon & Referral</span>
        </div>

        {/* Coupon dropdown */}
        <div>
          {CouponSection.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2  text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* new */}
        {/* clients and partner */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Clients & Partner</span>
        </div>

        {/* clients and partner dropdown */}
        <div>
          {OurClientsPartner.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent sidebar toggle on dropdown click
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2 text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <HR />

        {/* setting */}
        <div className="flex items-center mb-2 text-textWhite mt-3 text-[10px]">
          <span className={`ml-2  uppercase`}>Setting</span>
        </div>

        <div>
          <Link
            className="flex items-center mb-4 text-textWhite"
            href="/setting"
          >
            <IoMdSettings size={20} />
            <span className={`ml-2 text-sm`}>Setting</span>
          </Link>
        </div>

        <div>
          <Link
            className="flex items-center mb-4 text-textWhite"
            href="/admin/profile"
          >
            <FaUserTie size={18} />
            <span className={`ml-2 text-sm `}>Profile</span>
          </Link>
        </div>

        <div>
          {Country.map((dropdown, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex items-center mb-1 text-textWhite cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown(dropdown.label.toLowerCase());
                }}
              >
                {dropdown.icon}
                <div
                  className={`w-48 transition-all duration-200 flex items-center justify-between`}
                >
                  <span className={`ml-2  text-sm `}>{dropdown.label}</span>
                  {/* {isSidebarOpen && ( */}
                  <span className="ml-auto">
                    {activeDropdown === dropdown.label.toLowerCase() ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                  {/* )} */}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ${activeDropdown === dropdown.label.toLowerCase()
                  } max-h-screen opacity-100`}
              >
                {activeDropdown === dropdown.label.toLowerCase() && (
                  <div className="ml-10 text-sm text-textWhite">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        passHref
                        legacyBehavior
                      >
                        <div className="mb-2 cursor-pointer">{item.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
