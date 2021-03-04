declare module "*.vue" {
    import type {DefineComponent} from "vue";
    // eslint-disable-next-line
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
    export default component;
}
