import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const Footer = () => {
    // this is footer 
    return (

        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-gray-400">Shop</Link></li>
                        <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Customer Service</h3>
                    <ul className="space-y-2">
                        <li><Link to="/faq" className="hover:text-gray-400">FAQ</Link></li>
                        <li><Link to="/returns" className="hover:text-gray-400">Returns & Refunds</Link></li>
                        <li><Link to="/shipping" className="hover:text-gray-400">Shipping Info</Link></li>
                        <li><Link to="/terms" className="hover:text-gray-400">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Contact Us</h3>
                    <p>📍 456 Shopping Avenue, City, Country</p>
                    <p>📞 +123 456 7890</p>
                    <p>📧 support@onlineshop.com</p>
                </div>

                {/* Payment & Social Media */}
                <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Secure Payments</h3>
                    <div className="flex space-x-4 text-3xl mb-4">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
                        <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
                        <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} Online Shopping | All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;