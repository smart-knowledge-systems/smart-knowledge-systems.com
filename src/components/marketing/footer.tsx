'use client';

import Image from 'next/image'
import { footerData } from '@/content/marketing-content'

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Image
              alt={footerData.logo.alt}
              src={footerData.logo.src}
              className="h-9"
              width={footerData.logo.width}
              height={footerData.logo.height}
            />
            <p className="text-balance text-sm/6 text-gray-300">
              {footerData.tagline}
            </p>
            <div className="flex gap-x-6">
              {footerData.navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">{footerData.categories.solutions}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerData.navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">{footerData.categories.support}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerData.navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">{footerData.categories.company}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerData.navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">{footerData.categories.legal}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerData.navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm/6 text-gray-400">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}