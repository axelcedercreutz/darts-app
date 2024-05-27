const Footer = () => {
    return (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made with ❤️ by the people at {" "}
          <a
            href="https://twice.market/?utm_source=darts-app&utm_medium=template&utm_term=darts-app"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            TWICE
          </a>
        </p>
      </footer>
    )
}

export default Footer;