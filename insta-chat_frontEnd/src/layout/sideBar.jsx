import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import Modal from "../components/modal/Modal";
// import Slide from "../components/searchusers/slideover";
import SearchBar from "../components/search/Search";
import { useSelector } from "react-redux";
import { bigScreen, svgIcons } from "../utils/constant";
import useChecktoken from "../hooks/useChecktoken";
import Notification from "../components/notification/Notifications";

const SideBar = () => {
  const IsBigScreen = useMediaQuery({ query: bigScreen });

  const location = useLocation();

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState({
    home: false,
    search: false,
    chat: false,
    notification: false,
    create: false,
    profile: false,
  });
  useEffect(() => {
    const tabName =
      location?.pathname === "/" ? "home" : location?.pathname.slice(1);
    setCurrentTab((prevTabs) => ({
      ...prevTabs,
      [tabName]: true,
    }));
  }, [location]);

  const [open, setOpen] = useState(false);

  const [Search, setSearch] = useState(false);

  const [not, setNot] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // console.log(user.user, 'userrrrrrrrr')
  useChecktoken();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const handleClose = () => {
    Search && closeSearch();
    not && closeNotification();
  };
  const closeSearch = () => {
    setSearch((pre) => {
      if (pre === true) {
        return false;
      } else {
        return true;
      }
    });
  };
  const closeNotification = () => {
    setNot((pre) => {
      if (pre === true) {
        return false;
      } else {
        return true;
      }
    });
  };

  const handleTabClick = (tab) => {
    setCurrentTab((prev) => {
      const newTabsState = {};
      for (let key in prev) {
        newTabsState[key] = false; // ervery thing in current tab is now false;
      }
      newTabsState[tab] = true; // only changing the clicked tab true;
      console.log(newTabsState["search"], "thisisipathname");
      if (tab === "search" || tab === "notification") {
        //search tab true
        if (prev["search"] === true && tab === "search") {
          //cheacking prev state of search is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        } else if (prev["notification"] === true && tab === "notification") {
          //cheacking prev state of notification is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        } else if (prev["create"] === true && tab === "create") {
          //cheacking prev state of notification is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        }
      }
      return newTabsState;
    });
  };
  return (
    <>
      {/* MAIN DIV */}
      <div className={`flex fixed  h-screen`}>
        {/* SIDEBAR DIV */}
        {IsBigScreen ? (
          <>
            <div
              className={`relative flex transition-all ease-in-out duration-300 ${
                Search || not ? `w-[80px]` : `w-[244px]`
              } fixed border-r h-screen border-slate-300`}
            >
              <div className={`flex justify-between  flex-col px-3 pt-2 pb-5`}>
                <div>
                  <div
                    className={`${
                      Search || not ? `block` : `block`
                    } mb-5 px-4 pt-6 pb-3`}
                  >
                    {Search || not ? (
                      svgIcons.instagramSidebaricon
                    ) : (
                      <img
                        className="max-w-[103px] h-9"
                        src="/file.png"
                        alt="site name"
                      />
                    )}
                  </div>

                  <Link to={"/"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("home");
                      }}
                      className={`flex m-1 p-3 flex-row items-center ${
                        Search || not ? `w-[50px]` : `w-full`
                      }  h-12 hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    >
                      <div className=" w-6">
                        {currentTab.home
                          ? svgIcons.homeIcon
                          : svgIcons.homeIconOutline}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`${
                            currentTab.home ? `font-bold text-[16px]` : ` `
                          } flex ml-4 `}
                        >
                          Home
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 flex-row items-center ${
                      Search || not ? `w-[50px]` : `w-full`
                    } ${
                      currentTab.search ? `border` : ` transition-none`
                    }   hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    onClick={() => {
                      not && closeNotification();
                      setSearch(!Search);
                      handleTabClick("search");
                    }}
                  >
                    <div className="">
                      {currentTab.search
                        ? svgIcons.boldSearchIcon
                        : svgIcons.searchIcon}
                    </div>
                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex  ml-4">Search</h1>
                    </div>
                  </div>

                  <Link to={"/chat"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("chat");
                      }}
                      className={`flex m-1 p-3 ${
                        Search || not ? `w-[50px]` : `w-full`
                      }   flex-row items-center  hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    >
                      <div className="">
                        {currentTab.chat
                          ? svgIcons.filledMessengerIcon
                          : svgIcons.messengerIcon}
                        {console.log(currentTab.chat, "thisisfillms")}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 ${
                            currentTab.chat ? `font-bold text-[16px]` : ` `
                          } `}
                        >
                          Message
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`flex m-1 p-3 ${
                      Search || not ? `w-[50px]` : `w-full`
                    } ${
                      currentTab.notification ? `border` : ``
                    } cursor-pointer flex-row items-center  hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300`}
                    onClick={() => {
                      Search && closeSearch();
                      setNot(!not);
                      handleTabClick("notification");
                    }}
                  >
                    <div className="">
                      {currentTab.notification
                        ? svgIcons.fillnotificationIcon
                        : svgIcons.notificationIcon}
                    </div>
                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4">Notifications</h1>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setOpen(true);
                      handleClose();
                      // handleTabClick("create");
                    }}
                    className={`flex flex-row m-1 p-3 ${
                      Search || not ? `w-[50px]` : `w-full`
                    }   items-center hover:bg-gray-100 rounded-lg  hover:scale-110  duration-300 `}
                  >
                    <div className="">{svgIcons.createIcon}</div>

                    <div className={`${Search || not ? `hidden` : `block`}`}>
                      <h1 className="flex ml-4">Create</h1>
                    </div>
                  </div>

                  <Link to={"/profile"}>
                    <div
                      onClick={() => {
                        handleClose();
                        handleTabClick("profile");
                      }}
                      className={`flex m-1 p-3 ${
                        Search || not ? `w-[50px]` : `w-full`
                      }    flex-row items-center  hover:bg-gray-100 rounded-lg hover:scale-110  duration-300`}
                    >
                      <div className="">
                        {user?.user?.image ? (
                          <img
                            className={`h-6 w-6 rounded-full aspect-square object-cover ${
                              currentTab.profile
                                ? `w-7 h-7 border-2 border-black`
                                : ``
                            }`}
                            src={user?.user?.image}
                            alt=""
                          />
                        ) : (
                          svgIcons.userIcon
                        )}
                      </div>
                      <div className={`${Search || not ? `hidden` : `block`}`}>
                        <h1
                          className={`flex ml-4 ${
                            currentTab.profile ? `font-bold text-[16px]` : ``
                          }`}
                        >
                          Profile
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>

                <button className="flex px-4 py-2" onClick={logout}>
                  Log-out
                </button>
              </div>
              <SearchBar
                open={Search}
                setOpen={setSearch}
                handleClose={handleClose}
              />
              <Notification open={not} setOpen={setNot} />
            </div>
          </>
        ) : (
          <div>
            <div className="flex fixed bottom-0 w-full bg-gray-100 z-10 h-12">
              <div className="flex flex-row items-center justify-around w-full ">
                <Link to={"/"}>
                  <div className="flex  items-center   ">
                    {/* home icon */}
                    {svgIcons.homeIcon}
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setSearch(!Search)}
                >
                  {/* search */}
                  {svgIcons.searchIcon}
                </div>
                <Link to={"/chat"}>
                  <div className="flex  items-center ">
                    {/* message */}
                    {svgIcons.messengerIcon}
                  </div>
                </Link>
                <div
                  className="flex  items-center"
                  onClick={() => setNot(!not)}
                >
                  {/* notifications */}
                  {svgIcons.notificationIcon}
                </div>
                <div
                  className="flex  items-center"
                  onClick={() => setOpen(true)}
                >
                  {/* create */}
                  {svgIcons.createIcon}
                </div>
                <Link to={"/profile"}>
                  <div className="flex  items-center ">
                    {user?.user?.image ? (
                      <img
                        className="h-10 w-10 rounded-full  object-cover"
                        src={user?.user?.image}
                        alt=""
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
                <div className="flex  items-center ">
                  <button className="flex px-4 py-2" onClick={logout}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal open={open} setOpen={setOpen} />
    </>
  );
};
export default SideBar;
