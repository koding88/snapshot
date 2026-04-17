import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/providers/QueryProvider";
import "../globals.css";

const baseUrl = "https://snapshothanoi.com";
const ogImage = "https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  vi: "vi_VN",
  zh: "zh_CN",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Snapshot Hanoi | Wedding & Elopement Photographer in Vietnam",
      template: "%s | Snapshot Hanoi",
    },
    description:
      "Snapshot Hanoi is a premium cinematic wedding and elopement photography studio based in Vietnam. We capture timeless love stories with a cinematic touch.",
    keywords: [
      "wedding photographer Vietnam",
      "elopement photographer Vietnam",
      "cinematic wedding photography",
      "wedding films Vietnam",
      "couples photography Vietnam",
      "destination wedding photographer",
      "Snapshot Hanoi",
    ],
    authors: [{ name: "Snapshot Hanoi", url: baseUrl }],
    creator: "Snapshot Hanoi",
    publisher: "Snapshot Hanoi",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] ?? "en_US",
      url: `${baseUrl}/${locale}`,
      siteName: "Snapshot Hanoi",
      title: "Snapshot Hanoi | Wedding & Elopement Photographer in Vietnam",
      description:
        "Premium cinematic wedding and elopement photography studio based in Vietnam. Capturing timeless love stories.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Snapshot Hanoi - Wedding & Elopement Photography",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Snapshot Hanoi | Wedding & Elopement Photographer in Vietnam",
      description:
        "Premium cinematic wedding and elopement photography studio based in Vietnam.",
      images: [ogImage],
    },
    icons: { icon: ogImage },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        vi: `${baseUrl}/vi`,
        zh: `${baseUrl}/zh`,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Snapshot Hanoi",
  url: baseUrl,
  logo: ogImage,
  description:
    "Premium cinematic wedding and elopement photography studio based in Vietnam.",
  address: { "@type": "PostalAddress", addressCountry: "VN" },
  serviceType: [
    "Wedding Photography",
    "Elopement Photography",
    "Couples Photography",
    "Wedding Films",
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "vi" | "zh")) {
    notFound();
  }

  // Tell next-intl the locale for this request (populates requestLocale in getRequestConfig)
  setRequestLocale(locale);

  const messages = await getMessages({ locale } as { locale: string });

  const htmlLang = locale === "zh" ? "zh-CN" : locale;

  return (
    <html
      lang={htmlLang}
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body
        className="min-h-full flex flex-col bg-black text-white font-inter"
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
