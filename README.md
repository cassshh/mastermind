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
icons/images and `node_modules/@webcomponents/webcomponentsjs`). The workflow
also contains a GitHub Pages deploy job that is **off by default**; see
[Deployment (GitHub Pages)](#deployment-github-pages). Until a maintainer
completes that cutover, the live site is still published by Travis CI.

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

---

#### Deployment (GitHub Pages)

> **Status:** Actions publishing is implemented but **disabled**. No production
> cutover has been performed: Travis CI ([`.travis.yml`](.travis.yml)) and the
> `gh-pages` branch are unchanged, and none of the repository settings, checks
> or steps below have been carried out yet. They are the maintainer's
> responsibility.

##### What the workflow does (implemented)

- The `deploy` job in [`build.yml`](.github/workflows/build.yml) publishes
  **only** `build/` as a GitHub Pages artifact (`actions/upload-pages-artifact`)
  and deploys it with `actions/deploy-pages` to the `github-pages` environment.
  Dotfiles inside `build/` (e.g. `.eslintrc.json`, `.travis.yml` that ship with
  `@webcomponents/webcomponentsjs`) are left out of the artifact; none are
  needed at runtime.
- The artifact upload and the deploy job run only when **all** of these hold:
  - the `build` job succeeded;
  - `github.ref` is `refs/heads/master`;
  - the event is `push` or `workflow_dispatch`;
  - the repository variable `PAGES_DEPLOY_ENABLED` is exactly `true`.

  Pull requests, manual runs on other branches, and every run while the
  variable is unset (the default) build only; the deploy job is skipped.
- `build` keeps read-only permissions (`contents: read`). Only `deploy` gets
  `pages: write` and `id-token: write`.
- `deploy` uses the concurrency group `pages-production` with
  `cancel-in-progress: false`, so Actions never runs two Pages deployments at
  once and never cancels one in progress. The workflow-level concurrency only
  cancels superseded pull-request builds.
- Artifact deployment replaces the `gh-pages` branch flow: it does **not**
  create commits on `gh-pages`, and it does not run Jekyll.

##### Before enabling publishing (record first)

Write the following down (e.g. in the cutover issue/PR) before changing
anything; the rollback depends on it:

1. **Current Pages source.** *Settings → Pages* (or
   `gh api repos/cassshh/mastermind/pages`). Last seen (2026-11-13): build
   type `legacy`, "Deploy from a branch", branch `gh-pages`, folder `/`,
   HTTPS enforced, no custom domain, URL https://cassshh.github.io/mastermind/.
2. **`github-pages` environment rules.** *Settings → Environments →
   github-pages*: deployment branch policy, required reviewers, wait timers.
   Last seen: custom branch policy allowing only `gh-pages`, so a deployment
   from `master` is rejected until `master` is allowed.
3. **Travis CI state.** Whether the repository is active on Travis CI, whether
   builds run for pushes to `master`, and whether the `GITHUB_TOKEN`
   environment variable used by the `pages` deploy provider is set.
4. **Deployment-history consumers.** Travis deploys with `keep-history: true`,
   so `gh-pages` has one commit per deploy. Check whether anything uses that
   history (scripts, mirrors, forks, audits, links to `gh-pages` commits,
   rollback by reverting `gh-pages`). **This is an open question.** If
   anything depends on `gh-pages` history, **stop** and raise it before
   cutting over: artifact deployment stops adding commits there. The
   compatible alternative is a workflow that publishes `build/` to the
   `gh-pages` branch instead of a Pages artifact.
5. **Baseline of the live site** (for comparison later). Note that
   https://cassshh.github.io/mastermind/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js
   currently returns 404: the branch build runs Jekyll, which excludes
   `node_modules/`. Artifact deployment serves `build/` as is, so this file is
   expected to return 200 after cutover.

##### Pre-cutover check: serve the build at `/mastermind/`

The site is served from the subpath `/mastermind/`, so test it there rather
than at `/`. Use the output of `yarn build` (see above) or the `github-pages`
artifact of a run (a tarball, `artifact.tar`, containing the contents of
`build/`):

```
$ mkdir -p /tmp/pages && rm -rf /tmp/pages/mastermind
$ cp -r build /tmp/pages/mastermind
# or, from a downloaded artifact: mkdir -p /tmp/pages/mastermind && tar -xf artifact.tar -C /tmp/pages/mastermind
$ npx http-server /tmp/pages -p 8080 -c-1
```

In a **fresh browser profile** (e.g. a new Chrome profile or a guest window),
open http://localhost:8080/mastermind/ and check with DevTools:

- the game renders (no "Loading..." stuck on screen, no console errors);
- `src/app.mjs` and
  `node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js` (plus
  any `bundles/webcomponents-*.js` it requests) return **200** in the Network
  tab;
- *Application → Service Workers* shows `service-worker.js` registered and
  activated with scope `/mastermind/`.

Use a fresh profile because the service worker is cache-first with a fixed
cache version (`mastermind-offline-v1`): a browser that already visited the
site may serve old files from its cache and hide deployment problems. Changing
that cache policy is out of scope for this cutover.

##### Cutover (in this order)

There must never be two production publishers enabled at the same time:
Travis publishing is paused **before** Actions publishing is turned on.

1. **Demonstrate the build.** The *Build* workflow is green on the latest
   `master` commit, and the pre-cutover check above passes.
2. **Pause Travis publishing.** On Travis CI, deactivate the repository or
   turn off "Build pushed branches", or remove the `GITHUB_TOKEN` environment
   variable so the `pages` deploy cannot push. Do not delete `.travis.yml`
   yet; it is the rollback path.
3. **Switch the Pages source and allow `master`.** *Settings → Pages →
   Build and deployment → Source: GitHub Actions*. Then in *Settings →
   Environments → github-pages*, add `master` to the deployment branch policy
   (keep or add any reviewers/wait timers you want for production).
4. **Enable and run the deploy.** *Settings → Secrets and variables →
   Actions → Variables*: create `PAGES_DEPLOY_ENABLED` with value `true`. Then
   run *Actions → Build → Run workflow* on `master`, and check that the
   `deploy (GitHub Pages)` job succeeded and links to
   https://cassshh.github.io/mastermind/.

##### Post-deploy check

In a **fresh browser profile**, open https://cassshh.github.io/mastermind/ and
repeat the checks from the pre-cutover section: the app loads,
`src/app.mjs` and
`node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js` return
200, and `service-worker.js` is registered with scope `/mastermind/`. A quick
check without a browser:

```
$ for p in "" src/app.mjs service-worker.js manifest.json \
    node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js; do
    curl -s -o /dev/null -w "%{http_code} /mastermind/$p\n" "https://cassshh.github.io/mastermind/$p"
  done
```

##### Rollback

1. **Stop Actions publishing first.** Delete the `PAGES_DEPLOY_ENABLED`
   variable or set it to `false`. Wait for (or cancel) any running
   `deploy (GitHub Pages)` job.
2. **Restore the recorded Pages source.** *Settings → Pages → Source: Deploy
   from a branch*, branch `gh-pages`, folder `/` (or whatever was recorded),
   and restore the recorded `github-pages` environment rules.
3. **Re-enable the previous publisher.** Undo the Travis change from cutover
   step 2. The `gh-pages` branch still holds the last Travis deploy, so the
   site is served from it again right away; the next Travis build on
   `master` refreshes it. (The Jekyll `node_modules/` 404 noted above returns
   with the branch source.)
4. Re-run the post-deploy check in a fresh browser profile.
