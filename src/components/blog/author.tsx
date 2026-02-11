import Image from "next/image";

interface AuthorProps {
  author: {
    name: string;
    href: string;
    imageUrl: string;
    role: string;
  };
}

export default function Author({ author }: AuthorProps) {
  return (
    <div className="relative mt-8 flex items-center gap-x-4">
      <Image
        alt=""
        src={author.imageUrl}
        className="size-10 rounded-full bg-gray-50"
        width={40}
        height={40}
      />
      <div className="text-sm/6">
        <p className="font-semibold text-gray-900">
          <a href={author.href}>
            <span className="absolute inset-0" />
            {author.name}
          </a>
        </p>
        <p className="text-gray-600">{author.role}</p>
      </div>
    </div>
  );
}
