const projectDescription = "Your Private Life est un jeu web permettant de faire de la prévention sur les dangers du web et de l'Internet.";
const projectUrl = "https://your-private-life.vercel.app";
const projectName = "Your Private Life";

/** @type {import("next-seo").DefaultSeoProps} */
const SeoProps = {
  titleTemplate: `%s - ${projectName}`,
  defaultTitle: projectName,

  description: projectDescription,

  openGraph: {
    type: "website",
    locale: "fr_FR",

    url: projectUrl,
    title: projectName,
    description: projectDescription
  },

  twitter: {
    cardType: "summary_large_image"
  },

  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#000000"
    }
  ],

  additionalLinkTags: [
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180"
    },
    {
      rel: "manifest",
      href: "/manifest.json"
    },
    {
      rel: "icon",
      href: "/favicon.ico"
    }
  ]
};

export default SeoProps;