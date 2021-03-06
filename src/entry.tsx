/// <reference path="../typings/index.d.ts" />
import * as React from "react";
import { render } from "react-dom";
import { RootComponent } from "./routes";
import { store } from "./redux/store";
import { ready } from "./config/actions";
import { detectLanguage } from "./i18n";
import * as i18next from "i18next";

let r = (process.env.REVISION as string) || "REVISION INFO NOT AVAILABLE";
console.log(r);


detectLanguage().then((config) => {
    i18next.init(config, (err, t) => {
        let node = document.createElement("DIV");
        node.id = "root";
        document.body.appendChild(node);

        let reactElem = React.createElement(RootComponent, { store });
        let domElem = document.getElementById("root");

        if (domElem) {
            render(reactElem, domElem);
        } else {
            throw new Error(t("Add a div with id `root` to the page first."));
        };
        store.dispatch(ready());
    });
});
