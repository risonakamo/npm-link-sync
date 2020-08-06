# npm-link-sync
determine what npm packages in the current local npm project can be linked in, as they are already globally installed. The output result can be linked in with `npm link`

## installation
```bash
npm run build
npm link
```
now installed as global command.

## usage
in any folder containing a package.json, `npm-link-sync`

use output with `npm link`