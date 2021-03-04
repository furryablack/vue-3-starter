import {App, createApp} from "vue";
import {createInspector} from "effector-inspector";

import {createSentry} from "@/lib/sentry";

import Entry from "@/entry.vue";

const {SENTRY_IS, IS_DEVELOPMENT} = process.env;

const sentry = createSentry();

const app: App = createApp(Entry);

app.config.performance = !!IS_DEVELOPMENT;
if (SENTRY_IS) app.use(sentry);

app.mount("body");

if (IS_DEVELOPMENT) {
    createInspector();
}
