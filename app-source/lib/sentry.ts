import {App, Plugin} from "vue";
import * as Sentry from "@sentry/vue";
import {Integrations} from "@sentry/tracing";

const {
    SENTRY_ENV,
    SENTRY_DSN,
    SENTRY_SAMPLE_RATE,
    IS_PRODUCTION,
} = process.env;

const checkIsProduction = (): void => {
    if (!IS_PRODUCTION) {
        throw new Error(`[Sentry] was not init with "${SENTRY_ENV}"`);
    }
}

const sentryInit = (app: App): void => Sentry.init({
    // @ts-ignore-next-line
    Vue: app,
    dsn: SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: Number(SENTRY_SAMPLE_RATE),
    logErrors: true,
    environment: SENTRY_ENV,
})

export function createSentry(): Plugin {
    return {
        install(app: App) {
            checkIsProduction();
            sentryInit(app);
        },
    };
}
