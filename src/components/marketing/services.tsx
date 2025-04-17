import { servicesData } from "@/content/marketing-content";

export default function Services() {
  return (
    <div
      id="services"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <h2 className="col-span-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {servicesData.heading}
          </h2>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {servicesData.services.map((service) => (
              <div key={service.name}>
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <service.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-1 text-base/7 text-gray-600">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
