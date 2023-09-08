"""WORK IN PROGRESS 2023 ..."""

from pathlib import Path
import itertools
import datetime as dt

from jinja2 import Environment, FileSystemLoader, select_autoescape
from bs4 import BeautifulSoup

BUILD_DIR = Path.cwd() / Path("built-website")
BUILD_DIR.mkdir(exist_ok=True, parents=True, mode=0o777)

env = Environment(
    loader=FileSystemLoader(["writing", "templates"]),
    autoescape=select_autoescape,
    line_statement_prefix="#"
)


def build_writing_summary(posts, filename, route_prefix):
    """Build writing (posts) summary page"""
    template = env.get_template("writing-base.html")

    with (BUILD_DIR / "writing" / filename).open(mode='w') as f:
        html = template.render(title='Writing', activePage="writing", posts=posts, route_prefix=route_prefix)
        f.write(BeautifulSoup(html, 'html.parser').prettify())
        print(f"Built writing summary: {filename}")


if __name__ == "__main__":
    # create index.html for root of website
    index_template = env.get_template("about.html")
    with (BUILD_DIR / "index.html").open(mode='w') as f:
        html = index_template.render(title='About', activePage="about", route_prefix="./")
        f.write(BeautifulSoup(html, 'html.parser').prettify())
    print("Built index.html")

    # load posts
    posts = {}
    writing_dir = Path("writing")
    writing_publish_dir = BUILD_DIR / "writing"
    writing_publish_dir.mkdir(exist_ok=True, parents=True)
    for f in writing_dir.iterdir():
        if f.is_file() and not f.name.startswith("--ignore--"):
            template = env.get_template(f.name)
            html = template.render(activePage="", route_prefix="../")
            html = BeautifulSoup(html, 'html.parser')

            clean_name = f.name.replace("_", "-").replace(" ", "-")
            if posts.get(clean_name):
                raise Exception(f"Route must be unique: {clean_name}")

            # write the file
            with (BUILD_DIR / "writing" / clean_name).open(mode="w") as f_:
                f_.write(html.prettify())

            posts[clean_name] = {"title": html.h1.text.strip(), "date": html.time.text, "path": f"./{clean_name}"}

    print("Built posts")
    all_posts = list(sorted(posts.values(), key=lambda p: (p["date"], p["title"])))
    build_writing_summary(posts=all_posts, filename="index.html", route_prefix="../")

    for year, group in itertools.groupby(all_posts, key=lambda p: dt.datetime.fromisoformat(p["date"]).year):
        build_writing_summary(posts=list(group), filename=f"by-year-{year}.html", route_prefix="../")

    # copy css
    for file_ in Path("styles").iterdir():
        if file_.is_file():

            css = file_.read_text()
            (BUILD_DIR / file_.name).write_text(css)

    print("Built css")
    print("Done building static site")