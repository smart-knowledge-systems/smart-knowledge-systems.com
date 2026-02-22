import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sequoia-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "document-uri"?: string },
        HTMLElement
      >;
      "sequoia-subscribe": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "publication-uri"?: string;
          "callback-url"?: string;
          hide?: string;
        },
        HTMLElement
      >;
    }
  }
}
