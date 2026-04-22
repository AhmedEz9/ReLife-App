function HowItWorks() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 mb-16 mt-8">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">How ReLife Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join the circular economy. We make it easy to pass on things you no longer need, and find treasures from your neighbors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
              📸
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">1. Snap & Share</h3>
            <p className="text-gray-600 text-sm">Upload a photo of an item you no longer need or an item that you recycled. Add a quick description and select a category.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
              💬
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">2. Connect</h3>
            <p className="text-gray-600 text-sm">Community members browse the feed and reach out to claim your item.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
              ♻️
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">3. Give it a ReLife</h3>
            <p className="text-gray-600 text-sm">Meet up, hand over the item, and reduce waste. Everyone wins, including the planet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;