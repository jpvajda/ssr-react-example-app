# ssr-react-example-app

An example of Server-Side Rendering for a React App based on these references:

- [How to blog](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)
- [React hydrateRoot Docs](https://beta.reactjs.org/apis/react-dom/client/hydrateRoot)
- [A blog on hydration](https://blog.saeloun.com/2021/12/16/hydration.html)

Some troubleshooting help as this blog was a little outdated 😉

- [Fixes problem in .bablerc.json file](https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined) causing `Uncaught ReferenceError: React is not defined error`
- Installation of the webpack CLI `npm install -D webpack-cli` was needed as well as the [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals) package.
