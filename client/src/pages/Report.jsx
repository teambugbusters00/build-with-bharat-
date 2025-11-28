import { useState, useEffect } from 'react'
import { useLocationContext } from "../contexts/LocationContext";
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, Phone, FileText, Send, CheckCircle, X } from 'lucide-react'

const Report = () => {

    const { t } = useTranslation()
    const { location, coords, loading, refreshLocation } = useLocationContext()
    const [name, setName] = useState("")
    const [locationInput, setLocationInput] = useState("")
    const [phone, setPhone] = useState("")
    const [issue, setIssue] = useState("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
    const [reportId, setReportId] = useState("")

    useEffect(() => {
        if (location) {
            setLocationInput(location);
        }
    }, [location]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const payload = {
            name,
            location: locationInput,
            coords,
            issue,
            description,
            phone: phone || "",
            status: "Received"
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                setReportId(data.report.reportId);
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }

        } catch (err) {
            console.error(err);
            setSubmitStatus('error');
        }

        setName("");
        setLocationInput(location);
        setPhone("");
        setIssue("");
        setDescription("");
        setIsSubmitting(false);
    };


    return (
        <div className="min-h-screen py-12 px-4 md:px-8" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
            <div className="max-w-2xl mx-auto">
                {/* Success/Error Toast */}
                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                            submitStatus === 'success'
                                ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        }`}
                    >
                        {submitStatus === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                            <X className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                            <p className={`font-medium ${
                                submitStatus === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                            }`}>
                                {submitStatus === 'success' ? 'Report Submitted Successfully!' : 'Failed to submit report. Please try again.'}
                            </p>
                            {submitStatus === 'success' && reportId && (
                                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                    Your Report ID: <span className="font-mono font-bold">{reportId}</span>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => setSubmitStatus(null)}
                            className="ml-auto text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Glassmorphism Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-md bg-white/70 dark:bg-black/50 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-xl p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            {t("reportPage.title")}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {t("reportPage.heading")}
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-text/80">
                            {t("reportPage.name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("reportPage.nameValue")}
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="text-sm font-medium text-text/80">
                            {t("reportPage.location")}
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            required
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            placeholder={t("reportPage.locationValue")}
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="text-sm font-medium text-text/80">
                            {t("reportPage.phoneValue")}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            maxLength="10"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t("reportPage.phoneValue")}
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200"
                        />
                    </div>

                    {/* Issue Type */}
                    <div>
                        <label htmlFor="issue" className="text-sm font-medium text-text/80">
                            {t("reportPage.issue")}
                        </label>
                        <select
                            id="issue"
                            name="issue"
                            required
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200"
                        >
                            <option value="">{t("reportPage.issueValue.choose")}</option>
                            <option value="accident">{t("reportPage.issueValue.accident")}</option>
                            <option value="fire">{t("reportPage.issueValue.fire")}</option>
                            <option value="staryDogAttack">{t("reportPage.issueValue.staryDogAttack")}</option>
                            <option value="medicalEmergency">{t("reportPage.issueValue.medicalEmergency")}</option>
                            <option value="unsafeRoad">{t("reportPage.issueValue.unsafeRoad")}</option>
                            <option value="darkRoad">{t("reportPage.issueValue.darkRoad")}</option>
                            <option value="other">{t("reportPage.issueValue.other")}</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="text-sm font-medium text-text/80">
                            {t("reportPage.desc")}
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t("reportPage.descValue")}
                            rows="4"
                            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200 resize-none"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full min-h-[48px] bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 ${
                            isSubmitting ? 'cursor-not-allowed opacity-75' : 'hover:shadow-lg'
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                {t("reportPage.submit")}
                            </div>
                        )}
                    </motion.button>

                        {/* Footer safety note */}
                        <p className="text-[11px] text-text/80 text-center mt-2">
                            {t("reportPage.footer")}
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Report
