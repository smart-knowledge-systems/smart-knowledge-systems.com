"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import { heroContent, navigation } from "@/content/marketing-content";
import { Dialog, DialogPanel } from "@headlessui/react";
import { logClientEvent } from "@/lib/axiom/client";

const logoFull = (
  <Image
    alt={heroContent.logo.alt}
    src={heroContent.logo.src}
    className="h-10 w-auto"
    width={heroContent.logo.width}
    height={heroContent.logo.height}
  />
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-indigo-950 to-indigo-700 transition-all duration-300${scrolled ? " shadow-lg shadow-black/30" : ""}`}
      >
        <nav
          aria-label="Global"
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300${scrolled ? " py-3" : " py-6"}`}
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{heroContent.logo.alt}</span>
              <Image
                alt={heroContent.logo.alt}
                src={heroContent.logo.src}
                className={`w-auto transition-all duration-300${scrolled ? " h-7" : " h-10"}`}
                width={heroContent.logo.width}
                height={heroContent.logo.height}
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-white transition-colors hover:text-indigo-200"
                onClick={() =>
                  item.href.includes("#") &&
                  logClientEvent("nav.anchor.click", {
                    label: item.name,
                    href: item.href,
                  })
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="#"
              className="text-sm/6 font-semibold text-white transition-colors hover:text-indigo-200"
            >
              {heroContent.loginText} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="bg-indigo-800 px-6 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">{heroContent.logo.alt}</span>
                  {logoFull}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() =>
                        item.href.includes("#") &&
                        logClientEvent("nav.anchor.click", {
                          label: item.name,
                          href: item.href,
                        })
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {heroContent.loginText}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Return to top"
        className={`fixed bottom-8 right-8 z-40 rounded-full bg-indigo-700 p-3 text-white shadow-lg transition-all duration-300 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600${
          showTopBtn
            ? " opacity-100 translate-y-0"
            : " opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUpIcon aria-hidden="true" className="size-5" />
      </button>
    </>
  );
}
