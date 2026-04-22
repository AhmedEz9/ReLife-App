import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50/80 pt-16 pb-8 mt-20 border-t-4 border-emerald-500 relative z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Re<span className="text-emerald-400">Life</span></h2>
            <p className="mb-6 max-w-md text-emerald-200/70 leading-relaxed">
              Inspired by the Finnish spirit of sustainability. We are on a mission to build a zero waste community where every item gets a second chance.
            </p>
            <div className="flex space-x-4">
              <span className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-colors text-xl">📱</span>
              <span className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-colors text-xl">📸</span>
              <span className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-colors text-xl">✉️</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Community</h3>
            <ul className="space-y-3">
              <li><Link to="/feed" className="hover:text-white transition-colors">Browse Items</Link></li>
              <li><Link to="/upload" className="hover:text-white transition-colors">Share an Item</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability Impact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Local Centers</a></li>
            </ul>
          </div>

          {/* Newsletter (This one I have made it just for Visual purposes) */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Stay Updated</h3>
            <p className="text-sm mb-4 text-emerald-200/70">Get weekly updates on the best recycled finds in your area.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-emerald-900/50 border border-emerald-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-400"
              />
              <button className="bg-emerald-500 hover:bg-emerald-950 text-emerald-950 font-bold px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-500">
          <p>© {new Date().getFullYear()} ReLife. Built for a circular economy.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-300">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;