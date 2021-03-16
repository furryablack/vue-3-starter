import {App, createApp} from "vue";
import {createInspector} from "effector-inspector";

import Entry from "@/entry.vue";

const {IS_DEVELOPMENT} = process.env;

const app: App = createApp(Entry);

app.config.performance = !!IS_DEVELOPMENT;

app.mount("body");

if (IS_DEVELOPMENT) {
    createInspector();
}
