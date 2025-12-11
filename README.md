# Personal Site (Jekyll + GitHub Pages)

My personal site and blog built with Jekyll (GitHub Pages compatible). Includes dark/light mode with a header toggle and automatic system preference detection.

## Prerequisites (Windows)

- Install Ruby + Devkit: download the latest 64-bit Ruby+Devkit from [the Ruby site](https://rubyinstaller.org/downloads/) and run the installer (leave MSYS2 devkit checked).
- Install Bundler: open a new PowerShell window and run `gem install bundler`.
- Verify: `ruby -v` and `bundler -v`.

## Setup

```powershell
bundle install
```

## Run locally

```powershell
bundle exec jekyll serve --livereload
# open http://127.0.0.1:4000
```

Notes:

- Default build skips future-dated posts; to include them add `--future`.
- To mirror GitHub Pages exactly you can also use: `bundle exec github-pages serve`.
- Dark mode is the default; the header toggle persists your choice in localStorage.
- `Gemfile.lock` is intentionally not committed for GitHub Pages. If you need it locally (e.g., for CI), generate with the Pages-compatible Bundler and include Linux:  
  `gem install bundler -v 2.5.12` then `bundle _2.5.12_ lock --add-platform x86_64-linux`.
