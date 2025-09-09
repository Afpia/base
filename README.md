# Monorepo containing development tools 🎭

## Tools 💫
- Eslint
- Prettier
- Vitest
- Stylelint
- Commitlint

# EditorConfig

```.editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = false
indent_style = tab
indent_size = 2
tab_width = 2
trim_trailing_whitespace = true
```


# BeachBall 🏖️

- go to the desired package, make changes, commit to base
- write `pnpm change`
- then check `pnpm check` / probably doesn't work because of .gitignore, can be skipped
- and publish the desired package while in base `pnpm run publish -- --scope packages/... --no-push` or just `pnpm run publish -- --no-push`.
