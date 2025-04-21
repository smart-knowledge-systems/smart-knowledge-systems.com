import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { mainContent } from "@/content/marketing-content";

export default function Main() {
  return (
    <div id="resources" className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">
          {mainContent.intro.tagline}
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {mainContent.intro.title}
        </h1>
        <p className="mt-6 text-xl/8">{mainContent.intro.subtitle}</p>
        <div className="mt-10 max-w-2xl">
          <p>{mainContent.mainContent.paragraph1}</p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            {mainContent.mainContent.featuresList.map((feature, index) => (
              <li key={index} className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-indigo-600"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    {feature.title}.
                  </strong>{" "}
                  {feature.description}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8">{mainContent.mainContent.paragraph2}</p>
          <h2
            id="about"
            className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-900"
          >
            {mainContent.secondSection.title}
          </h2>
          <p className="mt-6">{mainContent.secondSection.paragraph}</p>
          <figure
            id="approach"
            className="mt-10 border-l border-indigo-600 pl-9"
          >
            <blockquote className="font-semibold text-gray-900">
              <p>{mainContent.secondSection.testimonial.quote}</p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <Image
                alt={mainContent.secondSection.testimonial.author.image.alt}
                src={mainContent.secondSection.testimonial.author.image.src}
                className="size-6 flex-none rounded-full bg-gray-50"
                width={mainContent.secondSection.testimonial.author.image.width}
                height={
                  mainContent.secondSection.testimonial.author.image.height
                }
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">
                  {mainContent.secondSection.testimonial.author.name}
                </strong>{" "}
                – {mainContent.secondSection.testimonial.author.title}
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">{mainContent.secondSection.paragraph2}</p>
        </div>
        <figure className="mt-16">
          <Image
            alt={mainContent.imageSection.image.alt}
            src={mainContent.imageSection.image.src}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
            width={mainContent.imageSection.image.width}
            height={mainContent.imageSection.image.height}
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon
              aria-hidden="true"
              className="mt-0.5 size-5 flex-none text-gray-300"
            />
            {mainContent.imageSection.caption}
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
            {mainContent.finalSection.title}
          </h2>
          <p className="mt-6">{mainContent.finalSection.paragraph1}</p>
          <p className="mt-8">{mainContent.finalSection.paragraph2}</p>
        </div>
      </div>
    </div>
  );
}
