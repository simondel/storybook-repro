# Storybook reproduction

This repository is meant for a reproduction of an issue when running Storybook after upgrading from v6.2.9 to v6.3.8.

## Reproduction

1. Clone the repo, install the dependencies and start Storybook using `npm start`
2. Verify that the _Button_ story renders
3. Close Storybook
4. Switch to the branch `storybook-update` from the [Pull Request](https://github.com/simondel/storybook-repro/pull/1)
5. Install updated npm dependencies
6. Start Storybook
7. Verify that the _Button_ story now causes the following error: `class constructors must be invoked with 'new'`
