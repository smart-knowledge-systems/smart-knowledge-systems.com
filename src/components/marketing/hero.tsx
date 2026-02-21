"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import Image from "next/image";
import Link from "next/link";
import { navigation, heroContent } from "@/content/marketing-content";
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

export default function Hero() {
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
    <div className="bg-white">
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

      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
              {heroContent.headline}
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                {heroContent.description}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href={heroContent.ctaPrimary.href}
                  target="_blank"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {heroContent.ctaPrimary.text}
                </Link>
                <Link
                  href={heroContent.ctaSecondary.href}
                  target="_blank"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {"← "}
                  {heroContent.ctaSecondary.text}
                </Link>
              </div>
            </div>
            <Image
              alt={heroContent.heroImage.alt}
              src={heroContent.heroImage.src}
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              width={heroContent.heroImage.width}
              height={heroContent.heroImage.height}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

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
    </div>
  );
}
