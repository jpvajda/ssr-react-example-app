import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Express from "express";
import React from "react";
import StaticRouter from "react-router";
import { getDataFromTree } from "@apollo/client/react/ssr";
import * as ReactDOMServer from "react-dom/server";
import Html from "../components/html";
import fetch from "cross-fetch";

const app = new Express();
app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "http://localhost:3006",
      credentials: "same-origin",
      fetch,
      headers: {
        cookie: req.header("Cookie"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}></StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(App).then((content) => {
    // Extract the entirety of the Apollo Client cache's current state
    const initialState = client.extract();
    // Add both the page content and the cache state to a top-level component
    const html = <Html content={content} state={initialState} />;

    // Render the component to static markup and return it]
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
    res.end();
  });
});

const basePort = 3006;

app.listen(basePort, () =>
  console.log(`app Server is now running on http://localhost:${basePort}`)
);
