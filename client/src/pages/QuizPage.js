import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const totalSteps = 5;

  const handleAnswer = (question, value) => {
    setAnswers({ ...answers, [question]: value });
    setStep(step + 1);
  };

  const handleTagSelect = (tag) => {
    const currentTags = answers.tags || [];
    if (currentTags.includes(tag)) {
      setAnswers({ ...answers, tags: currentTags.filter((t) => t !== tag) });
    } else {
      setAnswers({ ...answers, tags: [...currentTags, tag] });
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/v1/quiz/recommend", { answers });
      if (data.success) setRecommendations(data.recommended);
    } catch (error) {
      console.error(error);
    }
  };

  // Option styling
  const OptionCard = ({ text, onClick, selected }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer border rounded-xl p-4 shadow-md transition ${
        selected ? "bg-blue-500 text-white border-blue-500" : "bg-white hover:bg-gray-100"
      }`}
    >
      {text}
    </motion.div>
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center mb-4">✨ Find Your Signature Scent ✨</h2>
        <p className="text-center text-gray-600 mb-6">Step {step} of {totalSteps}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <OptionCard text="👔 Male" onClick={() => handleAnswer("gender", "Male")} />
              <OptionCard text="💃 Female" onClick={() => handleAnswer("gender", "Female")} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {["🌙 Night", "❤️ Romantic", "💎 Luxury", "☀️ Daily"].map((occ) => (
                <OptionCard
                  key={occ}
                  text={occ}
                  onClick={() => handleAnswer("occasion", occ.replace(/[^a-zA-Z]/g, ""))}
                />
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {["🌹 Oriental Floral", "🌲 Woody", "🍋 Citrus", "🌿 Fresh", "🌸 Aromatic"].map((sf) => (
                <OptionCard
                  key={sf}
                  text={sf}
                  onClick={() => handleAnswer("scentFamily", sf.replace(/[^a-zA-Z ]/g, ""))}
                />
              ))}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {["⏳ Short", "⏱️ Moderate", "⌛ Long-lasting", "♾️ Eternal"].map((l) => (
                <OptionCard
                  key={l}
                  text={l}
                  onClick={() => handleAnswer("longevity", l.replace(/[^a-zA-Z-]/g, ""))}
                />
              ))}
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-lg font-semibold">Pick your vibe (multiple allowed):</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {["Warm", "Luxury", "Woody", "Fresh", "Everyday"].map((tag) => (
                  <span
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`cursor-pointer px-4 py-2 rounded-full border shadow-sm transition ${
                      answers.tags?.includes(tag)
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:opacity-90"
              >
                🎉 Get My Recommendations
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">✨ Recommended Perfumes ✨</h3>
            <div className="space-y-4">
              {recommendations.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-xl shadow-sm bg-white"
                >
                  <h4 className="font-bold text-lg">{p.name}</h4>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <button
                    className="mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;
