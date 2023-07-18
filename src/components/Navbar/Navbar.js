import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import tanyaProfilePicture from "../../images/tanya_profile.jpg";

// Initialization for ES Users
import { Collapse, Dropdown, initTE } from "tw-elements";

function Navbar() {
  useEffect(() => {
    initTE({ Collapse, Dropdown });
  }, []);

  const profilePicture = tanyaProfilePicture;

  function Notifications() {
    const currentNotifications = [
      { time: "12/07/2023 14:00", data: "Tanya updated something" },
      { time: "12/07/2023 15:00", data: "Daniel updated something" },
    ];

    const [notifications, setNotifications] = useState(currentNotifications);

    return (
      <div className="relative" data-te-dropdown-ref>
        {/* <!-- First dropdown trigger --> */}
        <div
          className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          id="dropdownNotifications"
          role="button"
          data-te-dropdown-toggle-ref
          aria-expanded="false"
        >
          {/* <!-- Dropdown trigger icon --> */}
          <FaBell className="h-6 w-6 text-neutral-600" />
          {/* <!-- Notification counter --> */}
          {notifications.length != 0 ? (
            <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
              {notifications.length}
            </span>
          ) : (
            ""
          )}
        </div>
        {/* <!-- First dropdown menu --> */}
        <ul
          className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownNotifications"
          data-te-dropdown-menu-ref
        >
          {/* <!-- First dropdown menu items --> */}
          {notifications.length == 0 ? (
            <li>
              <div
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                data-te-dropdown-item-ref
              >
                No new Notifications
              </div>
            </li>
          ) : (
            notifications.map((item) => (
              <li key={item.time}>
                <div
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                  data-te-dropdown-item-ref
                >
                  {item.data}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

  function Profile() {
    return (
      <div className="relative" data-te-dropdown-ref>
        {/* <!-- Second dropdown trigger --> */}
        <div
          className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
          id="dropdownMenuButtonProfile"
          role="button"
          data-te-dropdown-toggle-ref
          aria-expanded="false"
        >
          {/* <!-- User avatar --> */}
          <img
            src={profilePicture}
            className="rounded-full h-8 w-8"
            alt=""
            loading="lazy"
          />
        </div>
        {/* <!-- Second dropdown menu --> */}
        <ul
          className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButtonProfile"
          data-te-dropdown-menu-ref
        >
          {/* <!-- Profile dropdown menu items --> */}
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              href="#"
              data-te-dropdown-item-ref
            >
              Profile
            </a>
          </li>
          <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              href="#"
              data-te-dropdown-item-ref
            >
              Log out
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    // <!-- Main navigation container -->
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* <!-- Hamburger button for mobile view --> */}
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-toggle="true"
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <!-- Hamburger icon --> */}
          <GiHamburgerMenu className="w-6 h-6 hover:text-neutral-900 mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" />
        </button>

        {/* <!-- Collapsible navigation container --> */}
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          {/* <!-- Logo --> */}
          <a
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="#"
          >
            <img
              src="https://static.wixstatic.com/media/7b3170_967c40ad75a84ba39fdf534c884a91e8~mv2.png/v1/fill/w_61,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/lmdc_logo_1_notext_stamp.png"
              className="h-7 w-7"
              alt="logo"
              loading="lazy"
            />
          </a>
          {/* <!-- Left navigation links --> */}
          <ul
            className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
            data-te-navbar-nav-ref
          >
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <!-- Dashboard link --> */}
              <Link
                to={`dashboard`}
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
              >
                Dashboard
              </Link>
            </li>
            {/* <!-- Team link --> */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                to={`Team`}
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
              >
                Team
              </Link>
            </li>
            {/* <!-- Lessons & Styles link --> */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                to={`/`}
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
              >
                Lessons & Styles
              </Link>
            </li>
          </ul>
        </div>

        {/* <!-- Right elements --> */}
        <div className="relative flex items-center">
          <Notifications />
          <Profile />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
