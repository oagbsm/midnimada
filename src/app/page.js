"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [education, setEducation] = useState("");
  const [faculty, setFaculty] = useState("");
  const [works, setWorks] = useState("");
  const [worksInField, setWorksInField] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  const somaliaStates = [
    "Awdal",
    "Bakool",
    "Banaadir",
    "Bari",
    "Bay",
    "Galguduud",
    "Gedo",
    "Hiiraan",
    "Jubbada Dhexe",
    "Jubbada Hoose",
    "Mudug",
    "Nugaal",
    "Sanaag",
    "Shabeellaha Dhexe",
    "Shabeellaha Hoose",
    "Sool",
    "Togdheer",
    "Woqooyi Galbeed",
    "Other",
  ];

  const educationLevels = ["Primary", "Secondary", "Bachelor", "Master", "PhD"];
  const faculties = ["Engineering", "Medicine", "Law", "Business", "Education", "IT", "Agriculture", "Other"];
  const salaryRanges = ["<301 USD", "301-701 USD", "701-1501 USD", ">1501 USD"];

  useEffect(() => {
    // smooth scrolling
    if (typeof window !== "undefined") document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // clear faculty if education is not degree
  useEffect(() => {
    if (!["Bachelor", "Master", "PhD"].includes(education)) setFaculty("");
  }, [education]);

  // clear work-related fields if user says they don't work
  useEffect(() => {
    if (works !== "Yes") {
      setWorksInField("");
      setSalary("");
    }
  }, [works]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // basic client-side validation
    if (!fullName.trim()) return setMessage("Fadlan gali magacaaga oo dhameystiran.");
    if (!phone.trim()) return setMessage("Fadlan gali lambarka telefoonka.");
    if (!region) return setMessage("Fadlan dooro Mesha aad degan tahay.");
    if (!education) return setMessage("Fadlan dooro heerka waxbarashada.");
    if (["Bachelor", "Master", "PhD"].includes(education) && !faculty) return setMessage("Fadlan dooro faculty-gaaga.");
    if (!works) return setMessage("Fadlan dooro haddii aad shaqeyso ama aadan shaqeynin.");
    if (works === "Yes") {
      if (!worksInField) return setMessage("Fadlan dooro haddii aad ku shaqeyso goobta aad wax ku baratay.");
      if (!salary) return setMessage("Fadlan dooro mushaharkaaga.");
    }

    try {
const res = await fetch("/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  fullName,
  phone,
  state: region, // map region correctly
  education,
  faculty,
  works,
  worksInField,
  salary,
})
,
});


      const data = await res.json();
      if (data.success) {
        setMessage("✅ User registered!");
        // clear form
        setFullName("");
        setPhone("");
        setRegion("");
        setEducation("");
        setFaculty("");
        setWorks("");
        setWorksInField("");
        setSalary("");
      } else {
        setMessage("❌ Error: " + (data.error || "server error"));
      }
    } catch (err) {
      setMessage("❌ Network error, please try again later.");
    }
  };

  return (
    <main className="min-h-screen font-sans text-gray-800">
      <nav className="fixed top-0 left-0 right-0 z-40 py-4 px-6 flex items-center justify-between text-white bg-blue-900">
        <div className="flex items-center space-x-3">
          <img src="/logo.jpeg" alt="MDS Logo" className="h-10 w-10 rounded-full shadow-md" />
          <h1 className="text-2xl font-bold">MDS</h1>
        </div>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#hero" className="hover:text-blue-300 transition">Home</a></li>
          <li><a href="#hadaf" className="hover:text-blue-300 transition">Hadaf</a></li>
          <li><a href="#ujeeddooyinka" className="hover:text-blue-300 transition">Ujeeddooyinka</a></li>
          <li><a href="#signup" className="hover:text-blue-300 transition">Sign Up</a></li>
          <li><a href="#news" className="hover:text-blue-300 transition">News</a></li>
        </ul>
      </nav>

      <section
        id="hero"
        className="relative flex flex-col h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10 flex flex-col flex-grow items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Midnimada Dhalinyarada Somalia
          </motion.h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-blue-100">
            Jiil dhalinyaro Soomaaliyeed oo mideysan, hoggaan u noqda isbedel wanaagsan iyo mustaqbal loo wada dhan yahay.
          </p>
          <a href="#signup" className="mt-6 inline-block px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-md hover:bg-blue-100 transition">
            Sign Up Now
          </a>
        </div>
      </section>

      <section id="hadaf" className="bg-gray-100 text-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">🎯 Hadaf</h2>
            <p className="text-base md:text-lg leading-relaxed">
              In la mideeyo dhalinyarada Soomaaliyeed, laguna xoojiyo cod wadaag iyo awood ay kaga qeybqaataan isbedel wanaagsan oo dalka ka hirgala.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">🌍 Himilo</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Jiil dhalinyaro Soomaaliyeed oo mideysan, hoggaan u noqda isbedel wanaagsan, horseed ka noqda horumar iyo nabad waarta.
            </p>
          </div>
        </div>
      </section>

      <section id="ujeeddooyinka" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">Ujeeddooyinka</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-left text-base md:text-lg text-gray-700">
            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl shadow-md">
              ✔️ In la abuuro madal dhalinyaradu si buuxda uga qeybqaataan doodaha iyo go’aamada qaranka.
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl shadow-md">
              ✔️ In la dhiso awoodda dhalinyarada iyada oo loo marayo tababar iyo barnaamijyo hoggaamineed.
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl shadow-md">
              ✔️ In la difaaco siyaasadaha saaxiibka la ah dhalinyarada ee dhiirrigeliya waxbarashada iyo shaqada.
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl shadow-md">
              ✔️ In la kobciyo nabad, midnimo iyo is-faham dhalinyarada dhexdeeda.
            </div>
          </div>
        </div>
      </section>

      <section id="signup" className="bg-blue-600 py-16 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Ku soo biir MDS maanta!
          </motion.h2>
          <p className="mt-3 text-blue-100 text-base md:text-lg">
            Nagu soo biir si aad u hesho macluumaad, tababar, iyo fursado lagu horumariyo dhalinyarada Soomaaliyeed.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Magacaaga oo dhameystiran (Seddex Magac)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="md:col-span-2 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />

            <input
              type="tel"
              placeholder="Telefoonka"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            >
              <option value="">Dooro Gobolka aad degan tahay</option>
              {somaliaStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            >
              <option value="">Heerka Waxbarashada</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            {['Bachelor','Master','PhD'].includes(education) && (
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="">Dooro Faculty-ga</option>
                {faculties.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            )}

            <div>
              <label className="block mb-1 font-medium text-gray-700">Ma shaqeysaa?</label>
              <select
                value={works}
                onChange={(e) => setWorks(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="">Dooro</option>
                <option value="Yes">Haa</option>
                <option value="No">Maya</option>
              </select>
            </div>

            {works === "Yes" && (
              <>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Do you work in the field in which you studied?</label>
                  <select
                    value={worksInField}
                    onChange={(e) => setWorksInField(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  >
                    <option value="">Dooro</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Mushaharkaaga (monthly)</label>
                  <select
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  >
                    <option value="">Dooro</option>
                    {salaryRanges.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition"
              >
                Submit
              </button>
              {message && <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>}
            </div>
          </form>
        </div>
      </section>

      <section id="news" className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Follow Us on Facebook</h2>
          <div className="flex justify-center">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61579194522835&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="500"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="MDS Facebook Page"
              className="mx-auto"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>Address: Cadaani Tower, Makkah al Mukarama Road, Mogadishu</p>
        <p>Phone: +252 61 7473547</p>
        <p>&copy; {new Date().getFullYear()} Midnimada Dhalinyarada Somalia (MDS). All rights reserved.</p>
      </footer>
    </main>
  );
}
