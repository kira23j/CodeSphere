import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Brand + Socials */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fayda<span className="text-sky-600">ID</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Empowering identity verification and secure access with modern digital solutions.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Instagram">
              <PiInstagramLogoFill className="text-2xl hover:text-pink-500 transition-colors duration-200" />
            </a>
            <a href="#" aria-label="Twitter">
              <PiTwitterLogoFill className="text-2xl hover:text-sky-500 transition-colors duration-200" />
            </a>
            <a href="#" aria-label="Facebook">
              <PiFacebookLogoFill className="text-2xl hover:text-blue-600 transition-colors duration-200" />
            </a>
            <a href="#" aria-label="YouTube">
              <PiYoutubeLogoFill className="text-2xl hover:text-red-600 transition-colors duration-200" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <PiLinkedinLogoFill className="text-2xl hover:text-blue-500 transition-colors duration-200" />
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">PRODUCT</h2>
          <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li className="hover:text-white transition-colors"><a href="#">Home</a></li>
            <li className="hover:text-white transition-colors"><a href="#">Jobs</a></li>
            <li className="hover:text-white transition-colors"><a href="#">Verify Identity</a></li>
          </ul>
        </div>

        {/* Use Cases Links */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">USE CASES</h2>
          <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li className="hover:text-white transition-colors"><a href="#">Secure Digital Identity</a></li>
            <li className="hover:text-white transition-colors"><a href="#">Manage Your Profile</a></li>
            <li className="hover:text-white transition-colors"><a href="#">Authenticate with Ease</a></li>
            <li className="hover:text-white transition-colors"><a href="#">Verify Credentials</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} FaydaID. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
