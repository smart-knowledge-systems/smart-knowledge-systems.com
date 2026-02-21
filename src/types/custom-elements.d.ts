import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sequoia-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "document-uri"?: string },
        HTMLElement
      >;
    }
  }
}
