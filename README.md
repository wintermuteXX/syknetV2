## skynetV2

The first "start again from scratch" attempt.
ETA 2035

### Compile and Upload

Use the NPM scripts as aliases for Rollup commands to simplify the build and upload process.

1. Configure your Screeps server destinations.
   - Rename `screeps.sample.json` to `screeps.json`.
   - Update `screeps.json` with your Screeps credentials.
2. Use the NPM scripts in `package.json` as aliases for Rollup commands.
   - `npm run build` will compile but not upload.
   - `npm run push-main` will compile and upload to the "main" destination in `screeps.json`.

## Kudos

Special thanks to @admon84
Screeps Autonomous Framework is a starter kit for developing your own Screeps bot with TypeScript.
