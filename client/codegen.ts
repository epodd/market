import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/graphql",
  watch: true,
  documents: "src/api/**/*.{gql,graphql}",
  generates: {
    "./src/api/_generated_/schema.ts": {
      config: {
        avoidOptionals: {
          defaultValue: true,
        },
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
