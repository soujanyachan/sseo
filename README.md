This project is an optimizer for blog posts which takes a URL as input, embeds it in an iframe and checks and displays many SEO related metrics like readability, SERP preview, keywords, suggested optimisations, and also some AI-generated similar blog posts.

![sample of ui 2](https://github.com/soujanyachan/sseo/blob/master/ui2.png?raw=true)

Implemented features:
  - Keyword analysis - Implement an AI mechanism to suggest relevant keywords based on the blog post's content
  - On-page optimization - Provide recommendations to optimize on-page elements such as meta tags, headings, URL structure, image tags, and internal linking. 
  - Content analysis - Analyze the readability, word count, keyword density, and overall quality of the blog post's content - https://readabilityformulas.com/gunning-fog-readability-formula.php
      1. The Flesch Reading Ease formula
      2. Automated Readability Index
  - SEO score and suggestions - Generate an SEO score or rating for the blog post, indicating its overall optimization level, and provide actionable suggestions for improvement.
  - SERP preview - Show a preview of how the blog post would appear on search engine results pages, including the meta title and description.

Running instructions:
- Run `npm i` and `npm start` in both the `ui` folder and the `src/backend` folder. The `ui` folder runs the react UI server and the `src/backend` runs the backend which powers the related APIs.
