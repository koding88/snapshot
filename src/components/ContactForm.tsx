"use client";

import { useState, type FormEvent, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import {
  COUNTRY_CODES,
  COUNTRY_NAME_TO_CODE,
} from "@/types/country-codes.constant";
import { CURRENCIES } from "@/types/currency-codes.constant";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePublicGalleries } from "@/hooks/useGalleries";
import { usePublicPackages } from "@/hooks/usePackages";
import { useRequestOrder } from "@/hooks/useOrders";
import { usePublicSiteSettings } from "@/hooks/useSiteSettings";

// Build country list with name and code for select
const countries = Object.entries(COUNTRY_NAME_TO_CODE)
  .map(([name, code]) => ({
    code,
    name: name.replace(/\b\w/g, (l) => l.toUpperCase()),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const ORDER_DISCOVERY_SOURCES = [
  "instagram",
  "facebook",
  "tiktok",
  "google",
  "friend",
  "other",
] as const;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations("ContactForm");
  const [name, setName] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [galleryId, setGalleryId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [howFound, setHowFound] = useState("");
  const [story, setStory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Custom package state
  const [customAmount, setCustomAmount] = useState("");
  const [customCurrency, setCustomCurrency] = useState("EUR");
  const [currencySearch, setCurrencySearch] = useState("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Filtered currencies for search
  const filteredCurrencies = currencySearch
    ? CURRENCIES.filter(
        (c) =>
          c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
          c.name.toLowerCase().includes(currencySearch.toLowerCase()),
      )
    : CURRENCIES;

  const { data: galleriesData } = usePublicGalleries({ limit: 50 });
  const { data: packagesData } = usePublicPackages({ limit: 50 });
  const { mutate: requestOrder, isPending } = useRequestOrder();
  const { data: siteSettings } = usePublicSiteSettings();

  const galleries = galleriesData?.items ?? [];
  const packages = packagesData?.items ?? [];

  // Filtered countries for search
  const filteredCountries = countrySearch
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()),
      )
    : countries;

  // Auto-select package if packageId is in query params
  useEffect(() => {
    const selected = searchParams?.get("packageId");
    if (selected) {
      setTimeout(() => {
        setPackageId(selected);
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showCountryDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".country-search-dropdown")) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCountryDropdown]);

  // Close currency dropdown when clicking outside
  useEffect(() => {
    if (!showCurrencyDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".currency-search-dropdown")) {
        setShowCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCurrencyDropdown]);

  const { whatsappUrl, instagramUrl } = siteSettings?.socialLinks ?? {
    whatsappUrl: null,
    instagramUrl: null,
  };
  const { contactEmail, officeAddress } = siteSettings?.contactInfo ?? {
    contactEmail: null,
    officeAddress: null,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = `${emailPrefix}@gmail.com`;
    const newErrors: { [key: string]: string } = {};
    // Validate required fields
    if (!name) newErrors.name = t("errorNameRequired");
    if (!emailPrefix) newErrors.email = t("errorEmailRequired");
    // Validate emailPrefix (only allow a-z, 0-9, dot, underscore, min 3 chars)
    if (emailPrefix && !/^[a-zA-Z0-9._%+-]{3,}$/.test(emailPrefix)) {
      const errMsg = t("errorEmailInvalid");
      newErrors.email = errMsg;
    }
    if (!countryCode) newErrors.countryCode = t("errorCountryRequired");
    if (!galleryId) newErrors.galleryId = t("errorGalleryRequired");
    if (!packageId) newErrors.packageId = t("errorPackageRequired");
    if (!phoneNumber) newErrors.phoneNumber = t("errorPhoneRequired");
    // Validate phone number (digits, +, -, space, min 8 chars)
    if (phoneNumber && !/^[+\d][\d\s\-]{7,}$/.test(phoneNumber)) {
      newErrors.phoneNumber = t("errorPhoneInvalid");
    }
    if (!howFound) newErrors.discoverySource = t("errorDiscoveryRequired");
    // Nếu chọn custom thì validate amount và currency
    if (packageId === "custom") {
      if (
        !customAmount ||
        isNaN(Number(customAmount)) ||
        Number(customAmount) < 0
      ) {
        newErrors.customAmount = "Please enter a valid amount";
      }
      if (
        !customCurrency ||
        !CURRENCIES.some((c) => c.code === customCurrency)
      ) {
        newErrors.customCurrency = "Please select a currency";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Show all errors as toast
      Object.values(newErrors).forEach((msg) => toast.error(msg));
      return;
    }
    setErrors({});
    // Build payload
    const payload: any = {
      name,
      email,
      countryCode,
      galleryId,
      discoverySource: howFound,
      personalStory: story || undefined,
      phoneNumber: phoneNumber || undefined,
    };
    if (packageId === "custom") {
      payload.packageId = undefined;
      payload.budget = {
        amount: Number(customAmount),
        currency: customCurrency,
      };
    } else {
      payload.packageId = packageId;
      payload.budget = undefined;
    }
    requestOrder(payload, {
      onSuccess: () => {
        setSubmitted(true);
        setName("");
        setEmailPrefix("");
        setCountryCode("");
        setCountrySearch("");
        setGalleryId("");
        setPackageId("");
        setHowFound("");
        setStory("");
        setPhoneNumber("");
        setCustomAmount("");
        setCustomCurrency("EUR");
        setCurrencySearch("");
        toast.success(t("successMessage"));
      },
      onError: (error: any) => {
        let message = t("errorGeneric");
        if (error?.response?.data?.message) {
          // Nếu message là key dịch thì dịch, nếu không thì giữ nguyên
          const msg = error.response.data.message;
          if (typeof msg === "string" && msg.startsWith("ContactForm.")) {
            message = t(msg.replace("ContactForm.", ""));
          } else {
            message = msg;
          }
        } else if (error?.message) {
          message = error.message;
        }
        toast.error(message);
      },
    });
  };

  return (
    <section className="bg-black px-8 pb-24 pt-16 text-white md:px-14 lg:px-24 lg:pb-32 lg:pt-24 xl:px-32">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16"
        >
          <h1 className="font-serif text-[2.5rem] font-normal uppercase leading-[1.1] tracking-[0.05em] text-white sm:text-[3.5rem] md:text-[4.5rem]">
            {t("heading")}
          </h1>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-24">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-9"
          >
            {/* Toast notification will show error/success, no inline global message */}

            {/* Name */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("nameLabel")}
              </label>
              <input
                type="text"
                required
                placeholder="*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
              {/* {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>} */}
            </div>

            {/* Email with @gmail.com suffix */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("emailLabel")}
              </label>
              <div className="flex items-center overflow-hidden rounded-[4px] border border-white/45 transition-colors focus-within:border-white">
                <input
                  type="text"
                  required
                  placeholder="*"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  className="h-[62px] flex-1 bg-transparent px-4 text-[1.5rem] text-white outline-none placeholder:text-white"
                />
                <span className="shrink-0 border-l border-white/25 bg-white/10 px-4 py-4 text-[0.95rem] text-white/70">
                  @gmail.com
                </span>
              </div>
              {/* {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>} */}
            </div>

            {/* Where are you based? - Country search select */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("countryLabel")}
              </label>
              <div className="relative country-search-dropdown">
                <input
                  type="text"
                  autoComplete="off"
                  value={
                    countryCode
                      ? countries.find((c) => c.code === countryCode)?.name ||
                        countrySearch
                      : countrySearch
                  }
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setCountryCode("");
                    setShowCountryDropdown(true);
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder="Select Country"
                  className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
                {showCountryDropdown && (
                  <ul className="absolute left-0 right-0 top-full z-20 max-h-60 overflow-auto rounded-md border border-white/20 bg-black py-1 shadow-lg country-search-dropdown">
                    {filteredCountries.length === 0 && (
                      <li className="px-4 py-2 text-white/60">
                        No country found
                      </li>
                    )}
                    {filteredCountries.map((c) => (
                      <li
                        key={c.code}
                        className={`px-4 py-2 cursor-pointer hover:bg-white/10 text-white ${countryCode === c.code ? "bg-white/10 font-bold" : ""}`}
                        onClick={() => {
                          setCountryCode(c.code);
                          setCountrySearch("");
                          setShowCountryDropdown(false);
                        }}
                      >
                        {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* {errors.countryCode && <p className="text-red-400 text-xs mt-1">{errors.countryCode}</p>} */}
            </div>

            {/* Categories (Gallery) */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("categoriesLabel")}
              </label>
              <div className="relative">
                <select
                  required
                  value={galleryId}
                  onChange={(e) => setGalleryId(e.target.value)}
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">
                    —Please choose an option—
                  </option>
                  {galleries.map((g) => (
                    <option key={g.id} value={g.id} className="bg-black">
                      {g.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
              {/* {errors.galleryId && <p className="text-red-400 text-xs mt-1">{errors.galleryId}</p>} */}
            </div>

            {/* Price / Package */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("pricePackageLabel")}
              </label>
              <div className="relative">
                <select
                  required
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">
                    —Select a package—
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id} className="bg-black">
                      {pkg.name} – ${pkg.pricing.amount} {pkg.pricing.currency}
                    </option>
                  ))}
                  <option value="custom" className="bg-black">
                    Custom
                  </option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
              {/* {errors.packageId && <p className="text-red-400 text-xs mt-1">{errors.packageId}</p>} */}
              {/* Nếu chọn custom thì hiện input nhập amount và currency */}
              {packageId === "custom" && (
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="h-[54px] w-2/3 rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.2rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
                    />
                    <div className="relative w-1/3 currency-search-dropdown">
                      <input
                        type="text"
                        autoComplete="off"
                        value={
                          customCurrency
                            ? CURRENCIES.find((c) => c.code === customCurrency)
                                ?.code || currencySearch
                            : currencySearch
                        }
                        onChange={(e) => {
                          setCurrencySearch(e.target.value);
                          setCustomCurrency("");
                          setShowCurrencyDropdown(true);
                        }}
                        onFocus={() => setShowCurrencyDropdown(true)}
                        placeholder="Currency"
                        className="h-[54px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 pr-10 text-[1.2rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                        ▼
                      </span>
                      {showCurrencyDropdown && (
                        <ul className="absolute left-0 right-0 top-full z-20 max-h-60 overflow-auto rounded-md border border-white/20 bg-black py-1 shadow-lg currency-search-dropdown">
                          {filteredCurrencies.length === 0 && (
                            <li className="px-4 py-2 text-white/60">
                              No currency found
                            </li>
                          )}
                          {filteredCurrencies.map((c) => (
                            <li
                              key={c.code}
                              className={`px-4 py-2 cursor-pointer hover:bg-white/10 text-white text-sm ${customCurrency === c.code ? "bg-white/10 font-bold" : ""}`}
                              onClick={() => {
                                setCustomCurrency(c.code);
                                setCurrencySearch("");
                                setShowCurrencyDropdown(false);
                              }}
                            >
                              {c.displayName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* {errors.customAmount && <p className="text-red-400 text-xs mt-1">{errors.customAmount}</p>} */}
                  {/* {errors.customCurrency && <p className="text-red-400 text-xs mt-1">{errors.customCurrency}</p>} */}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="*"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
              {/* {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>} */}
            </div>

            {/* How did you find Us? - Dropdown */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("howFoundLabel")}
              </label>
              <div className="relative">
                <select
                  value={howFound}
                  onChange={(e) => setHowFound(e.target.value)}
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">
                    —Please choose an option—
                  </option>
                  {ORDER_DISCOVERY_SOURCES.map((opt) => (
                    <option key={opt} value={opt} className="bg-black">
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
              {/* {errors.discoverySource && <p className="text-red-400 text-xs mt-1">{errors.discoverySource}</p>} */}
            </div>

            {/* Tell your story */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t("storyLabel")}
              </label>
              <textarea
                rows={5}
                placeholder="*"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="min-h-[160px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 py-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ backgroundColor: "black", y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-md border border-white px-8 py-3 font-sans text-[0.9rem] font-bold tracking-[0.1em] text-white transition-all duration-300 disabled:opacity-50"
              >
                {isPending ? "..." : t("submitLabel")}
              </motion.button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.08,
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pt-4 lg:pt-10"
          >
            <div className="flex flex-col">
              <p className="max-w-[520px] text-[0.95rem] leading-[1.85] text-white">
                {t("contactDesc")}
              </p>

              <div className="mt-14 space-y-10 text-[1.02rem] leading-[2.1] text-white">
                <div>
                  <p className="mb-2">{t("officeLabel")}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white/70 transition-colors"
                  >
                    {officeAddress}
                  </a>
                </div>

                <div>
                  <p className="mb-2">{t("mailLabel")}</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:underline hover:text-white/70 transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div>
                  <p className="mb-2">{t("whatsappLabel")}</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white/70 transition-colors"
                  >
                    {whatsappUrl?.replace('https://wa.me/', '+').replace('https://api.whatsapp.com/send?phone=', '+') || whatsappUrl}
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
