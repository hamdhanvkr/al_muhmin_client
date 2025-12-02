import { Shield, X } from "lucide-react";

function LoginModal({ isOpen, onClose, title, message }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/80">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-6 shadow-2xl border border-teal-600">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 text-teal-600">
                        <Shield className="w-5 h-5" />
                        {title}
                    </h3>

                    <button onClick={onClose} className="text-slate-400 hover:text-teal-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6">{message}</p>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-full bg-teal-700 hover:bg-teal-600 text-white transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;