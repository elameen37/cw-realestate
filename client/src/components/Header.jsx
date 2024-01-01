import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-indigo-200 shadow-md sticky top-0 z-50 transition-opacity duration-300 ease-in-out">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-sans font-extrabold text-sm sm:text-xl flex flex-wrap">
            <span className="text-indigo-500">CW</span>
            <span className="text-indigo-700">-</span>
            <span className="text-indigo-950">RealEstate</span>
          </h1>
        </Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex font-normal text-base items-center justify-end flex-grow">
          <form
            onSubmit={handleSubmit}
            className="bg-indigo-100 p-2 rounded-full justify-center items-center sm:flex"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none items-center w-24 sm:w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-indigo-950" />
            </button>
          </form>&nbsp;
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className={`sm:hidden text-2xl ml-2 text-indigo-950 focus:outline-none transition duration-500 ease-in-out transform ${
              mobileMenuOpen ? 'rotate-2' : 'rotate-[180deg]'
            }`}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          {/* Desktop menu */}
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline-block mx-2 sm:mx-4 text-xs sm sm:text-base text-indigo-950 hover:opacity-75">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline-block mx-2 sm:mx-4 text-xs sm sm:text-base text-indigo-950 hover:opacity-75">
                About
              </li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="hidden sm:inline-block rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="hidden sm:inline-block mx-2 sm:mx-4 text-xs sm sm:text-base text-indigo-950 hover:opacity-75">
                  Sign In
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="ml-4 bg-indigo-200 sm:hidden">
          <ul className="text-indigo-950">
            <li className="mb-2">
              <Link to="/" onClick={toggleMobileMenu}>
                Home
              </Link>
              <hr className="ml-auto mb-4 border-slate-200" />
            </li>
            <li className="mb-auto">
              <Link to="/about" onClick={toggleMobileMenu}>
                About
              </Link>
              <hr className="ml-auto mb-4 border-slate-200" />
            </li>
            {/* Profile section in mobile menu */}
            <li className="mb-2">
              <Link to="/profile" onClick={toggleMobileMenu}>
                {currentUser ? (
                  <div className="flex items-end">
                    <img
                      className="rounded-full h-7 w-7 object-cover mr-2"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    <span>Profile</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Link>
              <hr className="ml-auto mb-4 border-slate-200" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
