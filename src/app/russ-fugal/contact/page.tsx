"use client";

import { useEffect } from "react";
import { getVCard } from "./actions";

async function triggerDownload() {
  const vcard = await getVCard();
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "russ-fugal.vcf";
  link.click();

  URL.revokeObjectURL(url);
}

export default function ContactPage() {
  useEffect(() => {
    triggerDownload();
  }, []);

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">Contact</p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Thanks for connecting!
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your contact file should be downloading now.{" "}
          <button
            onClick={triggerDownload}
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Click here
          </button>{" "}
          if it didn&apos;t start automatically.
        </p>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            A bit about me
          </h2>

          <p className="mt-6 leading-7">
            I&apos;m building AI-powered tools that tackle two stubborn
            problems: how organizations lose knowledge to silos, and how
            millions of children struggle unnecessarily with reading.
          </p>

          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Knowledge Systems Consulting
              </h3>
              <p className="mt-3 leading-7">
                Information silos cost organizations time, money, and
                innovation. I help teams break down those barriers—designing
                collaboration systems that actually get used, integrating AI as
                a bridge between domains rather than a replacement for human
                expertise, and building environments where knowledge flows to
                the people who need it. My background includes managing $100M+
                physical builds and studying the intersection of information
                science, epistemology, and organizational transformation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Read by EAR
              </h3>
              <p className="mt-3 leading-7">
                One in three fourth graders read below basic proficiency. My
                research-backed method—Engaged Aided Reading—helped my own
                children reach the 90th percentile despite early struggles. Now
                I&apos;m scaling it. Read by EAR is an AI-powered reading app
                that provides just-in-time support, letting kids build sight
                vocabulary through stories they love without breaking their
                reading flow. My award-winning children&apos;s book{" "}
                <em>Sara and the Pooka</em> embeds these techniques directly
                into the narrative.
              </p>
            </div>
          </div>

          <p className="mt-8 leading-7">
            I&apos;m a self-taught developer, University of Utah Writing Studies
            grad, and a dad who turned his kids&apos; reading struggles into a
            mission. I believe AI should augment human intelligence—not replace
            the conversations and friction that create real knowledge.
          </p>

          <p className="mt-6 font-semibold text-gray-900">
            Let&apos;s talk about how AI can transform your team&apos;s
            collaboration, or how we can get more kids reading.
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h3 className="text-lg font-semibold text-gray-900">
            Find me online
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="https://www.smart-knowledge-systems.com"
                className="text-indigo-600 hover:text-indigo-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                smart-knowledge-systems.com
              </a>
              <span className="text-gray-600">
                {" "}
                — Knowledge management consulting
              </span>
            </li>
            <li>
              <a
                href="https://www.read-by-ear.com"
                className="text-indigo-600 hover:text-indigo-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                read-by-ear.com
              </a>
              <span className="text-gray-600">
                {" "}
                — AI-powered reading for kids
              </span>
            </li>
            <li>
              <a
                href="https://bsky.app/profile/russ-fugal.smart-knowledge-systems.com"
                className="text-indigo-600 hover:text-indigo-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                @russ-fugal.smart-knowledge-systems.com
              </a>
              <span className="text-gray-600"> — Bluesky</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
