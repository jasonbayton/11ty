---
title: PACKAGE SEARCH contribute translations
parent: PACKAGE SEARCH support
published: '2054-05-06'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
categories: 
    - Package Search Setup
layout: base.njk
eleventyNavigation: 
    order: 0
    title: Contribute translations
---

If you'd like to help make PACKAGE SEARCH available in your language, the language files are publicly available on the [PACKAGE SEARCH tracker](https://github.com/baytonorg/package_search_tracker).

Translations are maintained under the following directory:

- [PACKAGE SEARCH Translations](https://github.com/baytonorg/package_search_tracker/tree/main/app/src/main/res)

If you’d like to contribute a new language or update an existing translation, please:

1. Fork the repository.
2. Navigate to (or create) the appropriate language folder.
3. Update the XML file (using the template below as a reference).
4. Submit a Pull Request (PR) to the repository for review.

## Translation Template Example
Here’s a template you can follow when contributing. Be mindful of the comments, as there are restrictions on _some_ strings:

[Default `strings.xml`](https://github.com/baytonorg/package_search_tracker/blob/main/app/src/main/res/values/strings.xml) (aligns to en-GB)

Android follows the **BCP 47** standard for naming language and region codes when defining different string resources in an app. Each language or locale gets its own folder under the `res` directory, and the folder name is structured based on the language and sometimes the region or script. 

The general format for Android resource folders is:

```
res/values-<language>-<region>
```

### Example folder names:

- **English (default)**: `res/values/strings.xml`
- **French**: `res/values-fr/strings.xml`
- **Spanish (Spain)**: `res/values-es/strings.xml`
- **Spanish (Mexico)**: `res/values-es-rMX/strings.xml`
- **Chinese (Simplified)**: `res/values-zh/strings.xml`
- **Chinese (Traditional, Taiwan)**: `res/values-zh-rTW/strings.xml`

### Folder naming structure:

1. **Language code** (`<language>`): 
   - Two lowercase letters, e.g., `en` for English, `fr` for French.
   
2. **Region code** (`<region>`): 
   - Two uppercase letters following `r`, e.g., `rUS` for the United States, `rGB` for Great Britain, `rMX` for Mexico.
   
3. **Script code** (optional): 
   - For certain scripts, you may use a script code like `Latn` (Latin) or `Cyrl` (Cyrillic), e.g., `values-bn-Latn`.

### Resource Folder Examples:

| Language           | Folder Name       | Description                              |
|--------------------|-------------------|------------------------------------------|
| Default (English)   | `values/`         | Default strings                          |
| English (US)        | `values-en-rUS/`  | English strings for the US               |
| French              | `values-fr/`      | French strings                           |
| German (Austria)    | `values-de-rAT/`  | German strings for Austria               |
| Chinese (Simplified)| `values-zh/`      | Chinese Simplified                       |
| Chinese (Taiwan)    | `values-zh-rTW/`  | Chinese Traditional for Taiwan           |
| Arabic              | `values-ar/`      | Arabic strings                           |

### Resource on what to name the folders:

The [official Android documentation](https://developer.android.com/guide/topics/resources/localization) provides a complete guide for localization and the proper naming conventions for these folders. It explains how to structure `res/values` directories to target specific languages, regions, and even scripts.

Additionally, you can refer to the [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) to explore all the possible language, script, and region subtags available. 

## Pull Requests (PRs)
When submitting a PR for **code changes**, ensure you:

- Define the language the translation is for.
- Include clear commit messages.
- Ensure you’ve updated the correct language file.
- Ensure strings remain consistent with other translations (only the text changes, not the structure).

**Please include a name you wish to be credited against, as names of contributors are listed in the application.**

## When Will Translations Appear in the App?

Translations submitted via PR will be reviewed and merged into the codebase. Once merged, they will appear in the next release of PACKAGE SEARCH, which is updated periodically based on changes, bug fixes, and new features.