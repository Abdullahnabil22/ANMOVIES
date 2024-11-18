import Link from "next/link";
import { FaTwitter, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

function Footer({ bg }: { bg: string }) {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const socialLinks = {
    twitter: { link: "https://x.com/Nabil_AN22", Icon: FaTwitter },
    linkedin: {
      link: "https://www.linkedin.com/in/abdullah-nabil22/",
      Icon: FaLinkedin,
    },
    email: { link: "mailto:abdullahn.work@gmail.com", Icon: FaEnvelope },
    github: { link: "https://github.com/Abdullahnabil22", Icon: FaGithub },
  };
  return (
    <footer
      className={`${bg} text-white py-4 sm:py-8 px-2 sm:px-4`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="font-['Audiowide'] text-2xl sm:text-3xl font-bold inline-block"
            >
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                AN
              </span>
              <span>Movies</span>
            </Link>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {t("description")}
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              {t("Quick Links")}
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {[t("Movies"), t("Series")].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              {t("Connect With Us")}
            </h4>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {Object.values(socialLinks).map(({ link, Icon }) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  className="text-gray-400 hover:text-red-500 transition-colors mx-2"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-2 sm:pt-4 text-center text-gray-400 text-xs sm:text-sm">
          <p>© 2024 AN Movies. {t("All rights reserved")}.</p>
          <p className="flex items-center justify-center gap-1 mt-2">
            {t("Made by Abdullah Nabil")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
