# Generates /blog/tags/<tag>/ index pages from post tags.
# Runs in the GitHub Actions build (custom plugins are fine outside the
# classic github-pages gem).
module Jekyll
  class TagPageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      site.tags.each_key do |tag|
        page = PageWithoutAFile.new(site, site.source, File.join('blog', 'tags', tag), 'index.html')
        page.data['layout'] = 'tag'
        page.data['tag'] = tag
        page.data['title'] = "Posts tagged “#{tag}”"
        page.data['description'] = "Blog posts tagged #{tag}."
        site.pages << page
      end
    end
  end
end
