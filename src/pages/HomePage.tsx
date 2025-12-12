import { Link } from 'react-router-dom';

export default function HomePage(): JSX.Element {
  const categories = [
    { id: 'hostel', title: 'Hostel', icon: '🏠' },
    { id: 'academics', title: 'Academics', icon: '📚' },
    { id: 'infrastructure', title: 'Infrastructure', icon: '🏗️' },
    { id: 'admin', title: 'Administration', icon: '👨‍💼' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                JIT Complaint Box
              </h1>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Your voice matters. Submit complaints about hostel, academics, infrastructure, or administration
                <span className="font-semibold"> anonymously or with your name</span>. We ensure all reports are kept confidential and reviewed promptly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/report"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200 font-semibold"
              >
                ➤ Report an Issue
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold"
              >
                View Dashboard
              </Link>
            </div>

            <div className="text-sm text-gray-500 pt-4">
              Admin? <Link to="/admin/login" className="text-indigo-600 hover:underline font-semibold">
                Login here
              </Link>
            </div>
          </div>

          {/* Right: Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200 border border-gray-100"
              >
                <div className="text-4xl group-hover:text-purple-600 transition mb-3">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                <p className="text-xs text-gray-500 mt-2">Report issues related to {cat.title.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="text-indigo-100">Confidential</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p className="text-indigo-100">Always Open</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Quick</div>
              <p className="text-indigo-100">Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to report an issue?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Help us improve the campus experience. Your feedback drives positive change and ensures every voice is heard.
        </p>
        <Link
          to="/report"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl font-bold text-lg transform hover:-translate-y-1 transition"
        >
          Submit Your Complaint Now
          <span className="ml-3">→</span>
        </Link>
      </section>
    </div>
  );
}
