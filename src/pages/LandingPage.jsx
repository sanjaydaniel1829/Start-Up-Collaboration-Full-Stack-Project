import { motion } from 'framer-motion';
import { 
  UserCircleIcon,
  NewspaperIcon,
  ChatBubbleOvalLeftIcon,
  PhotoIcon,
  RocketLaunchIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const features = [
    {
      icon: <UserCircleIcon className="h-6 w-6" />,
      title: "Professional Profile",
      description: "Create and customize your startup profile with portfolio, achievements, and goals."
    },
    {
      icon: <NewspaperIcon className="h-6 w-6" />,
      title: "Interactive Feed",
      description: "Share updates, milestones, and stories about your startup journey."
    },
    {
      icon: <ChatBubbleOvalLeftIcon className="h-6 w-6" />,
      title: "Real-time Chat",
      description: "Connect instantly with fellow entrepreneurs, mentors, and investors."
    },
    {
      icon: <PhotoIcon className="h-6 w-6" />,
      title: "Story Sharing",
      description: "Share daily updates and behind-the-scenes moments with 24-hour stories."
    },
    {
      icon: <RocketLaunchIcon className="h-6 w-6" />,
      title: "Startup Dashboard",
      description: "Track your progress, manage connections, and monitor engagement metrics."
    },
    {
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: "Community Network",
      description: "Build meaningful connections within the startup ecosystem."
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: '/login', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name: 'Instagram', url: '/login', icon: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.772 1.153 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.182.8-.398 1.15-.748.35-.35.566-.566.748-1.15.137-.353.3-.882.344-1.857.048-1.023.058-1.351.058-3.808v-.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.37-.058 3.808v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
    { name: 'LinkedIn', url: '/login', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary">Start-Up Newbiez</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your ultimate social platform for entrepreneurs to connect, share, and grow together in the startup ecosystem.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn btn-primary">Join Now</Link>
              <button className="btn bg-white text-gray-800 border border-gray-200 hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Start-Up Newbiez</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start-Up Newbiez is more than just a platform - it's a thriving community where entrepreneurs come together to share their journey, learn from each other, and build lasting connections. We've combined the best features of social networking with powerful tools specifically designed for startups.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're just starting out or scaling up, our platform provides the perfect space to showcase your startup, connect with mentors, engage with potential investors, and share your success stories with a community that understands and supports your journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Connect & Grow
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A complete social platform designed specifically for the startup community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Start-Up Newbiez</h3>
            <p className="mb-6">Empowering entrepreneurs to connect and grow</p>
            <div className="flex justify-center gap-8 mb-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <Link to="#" className="hover:text-white transition-colors">About</Link>
              <Link to="#" className="hover:text-white transition-colors">Features</Link>
              <Link to="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
