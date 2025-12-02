import { BookOpen, DollarSign, Handshake } from "lucide-react";

export default function Programs() {
    const cards = [
        {
            title: "Spiritual Education",
            icon: BookOpen,
            text: "Funding youth programs, scholarships, and community centers."
        },
        {
            title: "Direct Financial Relief",
            icon: DollarSign,
            text: "Providing Zakat & Sadaqah for basic needs like food and medical help."
        },
        {
            title: "Community Welfare",
            icon: Handshake,
            text: "Supporting initiatives like training and small business grants."
        }
    ];

    return (
        <section id="programs" className="py-24 bg-slate-100 dark:bg-slate-800 px-6">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">Our Core Programs</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {cards.map((c, i) => (
                    <div key={i}
                         className="bg-white dark:bg-slate-900 rounded-xl p-8 border shadow-xl hover:shadow-2xl transition">
                        <div className="p-3 bg-teal-700 w-fit rounded-lg text-white mb-4">
                            <c.icon className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{c.title}</h3>

                        <p className="text-slate-600 dark:text-slate-400 text-sm">{c.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
