module.exports = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts'],
  overwrite: true,
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher',
      ],
      config: {
        skipTypename: false,
        withHOC: false,
        withComponent: false,
        avoidOptionals: true,
      },
    },
  },
};
