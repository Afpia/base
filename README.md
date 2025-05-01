# Monorepo containing development tools 🎭

## Tools 💫
- Eslint
- Prettier
- Vitest
- Stylelint
- Commitlint

___

# BeachBall 🏖️

- go to the desired package, make changes, commit to base
- write `pnpm change`
- then check `pnpm check` / probably doesn't work because of .gitignore, can be skipped
- and publish the desired package while in base `pnpm run publish -- --scope packages/... --no-push`
