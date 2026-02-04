import { readFileSync } from "fs";
import { join } from "path";

export interface AboutSection {
  id: string;
  title: string;
  content: string;
}

export interface AboutContent {
  dialog: AboutSection;
  synthialog: AboutSection;
}

export const loadAboutContent = (): AboutContent => {
  try {
    const filePath = join(
      process.cwd(),
      "src/content/dialog-synthialog-about-pages.md"
    );
    const fileContent = readFileSync(filePath, "utf8");

    // Split the content by the separator
    const sections = fileContent.split("---").map((section) => section.trim());

    // Parse Dialog section
    const dialogSection = sections[0];
    const dialogTitle = dialogSection.match(/## (.+)/)?.[1] || "About Dialog";
    const dialogContent = dialogSection.replace(/## .+\n/, "").trim();

    // Parse Synthialog section
    const synthialogSection = sections[1];
    const synthialogTitle =
      synthialogSection.match(/## (.+)/)?.[1] || "About Synthialog";
    const synthialogContent = synthialogSection.replace(/## .+\n/, "").trim();

    return {
      dialog: {
        id: "dialog",
        title: dialogTitle,
        content: dialogContent,
      },
      synthialog: {
        id: "synthialog",
        title: synthialogTitle,
        content: synthialogContent,
      },
    };
  } catch (error) {
    console.error("Error loading about content:", error);
    // Return default content if file reading fails
    return {
      dialog: {
        id: "dialog",
        title: "About Dialog",
        content: "Content not available.",
      },
      synthialog: {
        id: "synthialog",
        title: "About Synthialog",
        content: "Content not available.",
      },
    };
  }
};
