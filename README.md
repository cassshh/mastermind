# Mastermind

### Masterpiece being built using the native web **#UseThePlatform** <3

---

**Build as a Progresive Web App**

- Add it to your Home Screen
- Use it offline

---

Built using the web to its purest form;
HTML5/CSS3/ES6

Polyfills used for unsupported browsers:

- Web Components
- Resize Observer

---

#### Commands

Install dependencies

```
$ yarn
```

Serve

```
$ yarn start
```

Build

```
$ yarn build
```

Clean

```
$ yarn clean
```

---

#### Continuous integration

The [Build workflow](.github/workflows/build.yml) (GitHub Actions) runs on:

- every pull request
- every push to `master`
- manual runs (`workflow_dispatch`) from the Actions tab

It builds the app on an Ubuntu 24.04 runner with read-only repository
permissions and no secrets, then checks that the expected files exist in
`build/` (`index.html`, `src/app.mjs`, `manifest.json`, `service-worker.js`,
icons/images and `node_modules/@webcomponents/webcomponentsjs`). It does not
deploy; deployment to GitHub Pages is still handled by Travis CI for now.

Runtime versions used by CI:

- Node.js 22 (LTS, latest 22.x)
- Yarn Classic 1.22.22

Reproduce the CI build locally:

```
$ corepack enable && corepack prepare yarn@1.22.22 --activate   # or: npm install -g yarn@1.22.22
$ yarn --version   # 1.22.22
$ yarn install --frozen-lockfile
$ yarn build
```

The build script uses `cp --parents`, which needs GNU coreutils. Run it on
Linux, or on macOS install GNU coreutils (e.g. `brew install coreutils`) and
put its `gnubin` directory first on your `PATH`. Alternatively, use Docker:

```
$ docker run --rm -it -v "$PWD":/app -w /app node:22-bookworm \
    bash -c 'corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install --frozen-lockfile && yarn build'
```
