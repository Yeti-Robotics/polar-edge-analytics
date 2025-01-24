import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
    ...config,
    {
        // ignore all files in the src/components directory, these are shadcn/ui components
        ignores: [
            'src/components/*.tsx'
        ]
    }
];
