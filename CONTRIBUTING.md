# Contributing

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This leads to more readable messages that are easy to follow when looking at the project history.

## Commit Message Format

Each commit message consists of a **header**, a **body**, and a **footer**.

`<type>(<scope>): <subject>`
`<BLANK LINE>`
`<body>`
`<BLANK LINE>`
`<footer>`

The **type** must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

-----

## How to Commit

To make it easier to create commits that follow the convention, we've included an interactive tool. Instead of `git commit`, please use the following command:

```bash
npm run commit
```

This will launch a prompt that guides you through creating a perfectly formatted commit message.