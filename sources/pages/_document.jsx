import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />

          {/** On ajoute le wrapper des dialogues. */}
          <div id="dialog-root"></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;