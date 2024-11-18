import Link from "next/link";
import { FaTwitter, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

function Footer({ bg }: { bg: string }) {
  const locale = useLocale();
  const t = useTranslations("Footer");
  return (
    <footer
      className={`${bg} text-white py-8 px-4`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="font-['Audiowide'] text-3xl font-bold">
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                AN
              </span>
              <span>Movies</span>
            </Link>
            <p className="text-gray-400 mt-2">{t("description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-2">
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

          <div>
            <h4 className="text-xl font-semibold mb-4">
              {t("Connect With Us")}
            </h4>
            <div className="flex space-x-4">
              {[FaTwitter, FaLinkedin, FaEnvelope, FaGithub].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors mx-2"
                  >
                    <Icon size={24} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 text-center text-gray-400 text-sm">
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
