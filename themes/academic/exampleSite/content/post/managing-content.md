+++
date = "2016-04-20T11:00:00"
draft = false
tags = ["academic", "hugo"]
title = "Managing content"
math = false
+++

This is a brief guide to managing content with the Academic theme. Content can include homepage sections, publications, projects, and news/blog articles. After you have read this guide about creating and managing content, you may also be interested to learn about [writing content with Markdown, LaTeX, and Shortcodes]({{< ref "post/writing-markdown-latex.md" >}}).

To enable LaTeX math rendering for a page, you should include `math = true` in the page's `+++` preamble, as demonstrated in the included example site. Otherwise, to enable math on the homepage or for all pages, you must globally set `math = true` in `config.toml`.

To display an image in publication, post, or project page headers, you can include the `image = "my-image.jpg"` option in the page `+++` preamble. It is automatically assumed that the image is located in your `static/img/` folder. In the context of posts and projects, the image is intended to behave as a full width banner across the top of the article.

## Homepage sections

Homepage sections for publications, projects and posts will automatically hide when there is no content of the respective type. Therefore, if you do not require a particular feature, you can simply delete any associated content in the `content/` folder.

### Introduce yourself with a biography

Place a cropped portrait photo named `portrait.jpg` into the `static/img/` folder, overwriting any defaults.

Edit your biography in the example `content/home/about.md` file that you copied across from the `themes/academic/exampleSite/` folder. The research interests and qualifications are stored separately as `interests` and `education` variables under `[params.about]` in `config.toml`, as can be seen in the example config. It's possible to completely hide the interests and education lists by deleting their respective variables.

### Add a section to the homepage

To add a new section to the homepage:

    hugo new home/my-section-name.md

Then edit the newly created file `content/home/my-section-name.md` with your section title and content. In the `+++` preamble, you should also increment the `section_id` to ensure it's unique amongst the other sections in `content/home` and you can adjust `weight` variable to change the order within the custom section of the home page.

You may also wish to add a navigation link pointing to the new section. This can be achieved by adding something similar to the following lines to your `config.toml`, where the URL will consist of the first title word in lowercase:

    [[menu.main]]
        name = "Research"
        url = "#research"
        weight = 10

## Create a publication

To create a new publication:

    hugo new publication/my-paper-name.md

Then edit the default variables at the top of `content/publication/my-paper-name.md` to include the details of your publication. The `url_` variables are used to generate links associated with your publication, such as for viewing PDFs of papers. Here is an example:

```
+++
abstract = "An abstract..."
authors = ["First author's name", "Second author's name"]
date = "2013-07-01"
image = ""
image_preview = ""
math = false
publication = "The publishing part of the citation goes here. You may use *Markdown* for italics etc."
title = "A publication title, such as title of a paper"
url_code = ""
url_dataset = ""
url_pdf = "pdf/my-paper-name.pdf"
url_project = ""
url_slides = ""
url_video = ""
+++

Further details on your publication can be written here using *Markdown* for formatting. This text will be displayed on the Publication Detail page.
```

The `url_` links can either point to local or web content. Associated local publication content, such as PDFs, may be copied to a `static/pdf/` folder and referenced like `url_pdf = "pdf/my-paper-name.pdf"`.

You can also associate custom link buttons with the publication by adding the following block(s) within the variable preamble above, which is denoted by `+++`:

```
[[url_custom]]
    name = "Custom Link"
    url = "http://www.example.org"
```

If you enabled `detailed_list` for publications in `config.toml`, then there are a few more optional variables that you can include in the publication page preamble. You may use `abstract_short = "friendly summary of abstract"` and `publication_short = "abbreviated publication details"` to display a friendly summary of the abstract and abbreviate the publication details, respectively. Furthermore, there is the option to display a different image on the homepage to the publication detail page by setting `image_preview = "my-image.jpg"`. This can be useful if you wish to scale down the image for the homepage or simply if you just wish to show a different image for the preview.

## Post an article

To create a blog/news article:

    hugo new post/my-article-name.md

Then edit the newly created file `content/post/my-article-name.md` with your full title and content.

## Create a project

To create a project:

    hugo new project/my-project-name.md

Then edit the newly created file `content/project/my-project-name.md`. Either you can link the project to an external project website by setting the `external_link = "http://external-project.com"` variable at the top of the file, or you can add content (below the final `+++`) in order to render a project page on your website.


## Removing content

Generally, to remove content, simply delete the relevant file from your `content/post`, `content/publication`, `content/project`, or `content/home` folder.

## View your updated site

After you have made changes to your site, you can view it by running the `hugo server --watch` command and then opening [localhost:1313](http://localhost:1313) in your web browser.

## Deploy your site

Finally, you can build the static website to a `public/` folder ready for deployment using the `hugo` command.

You may then deploy your site by copying the `public/` directory (by FTP, SFTP, WebDAV, Rsync, git push, etc.) to your production web server.

Note that running `hugo` does not remove any previously generated files before building. Therefore, it's best practice to delete your `public/` directory prior to running `hugo` to ensure no old or interim files are deployed to your server.
