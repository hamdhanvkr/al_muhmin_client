export default function Footer({ openModal }) {
    return (
        <footer id="contact" className="py-16 bg-slate-50 dark:bg-slate-900 text-center px-4 border-t border-slate-300 dark:border-slate-700">

            <h4 className="text-3xl font-bold text-slate-800 dark:text-white">AL MUHMIN TRUST</h4>
            <p className="text-teal-600 mt-1">Your trust, our mission.</p>

            <button
                onClick={() => openModal("Contact Us")}
                className="mt-6 px-6 py-3 bg-teal-700 hover:bg-teal-600 text-white rounded-full">
                Contact Our Team
            </button>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                © {new Date().getFullYear()} AL MUHMIN ISLAMIC TRUST. All Rights Reserved.
            </p>
            <p className="text-xs text-slate-400">V Kalathur - 63, Tamil Nadu, India.</p>
        </footer>
    );
}
